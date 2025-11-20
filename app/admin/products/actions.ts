"use server";

import { db } from "@/lib/db";
import { products, productImages, productSizes, productVariants } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
    title: z.string().min(1, "Title is required"),
    price: z.coerce.number().min(0, "Price must be positive"),
    // image: z.string().min(1, "Image is required"), // Main image is now handled via relations or logic
    category: z.string().min(1, "Category is required"),
    description: z.string().min(1, "Description is required"),
    images: z.array(z.object({ url: z.string(), isMain: z.boolean() })).optional(),
    sizes: z.array(z.object({ size: z.string(), price: z.coerce.number() })).optional(),
    variants: z.array(z.object({ name: z.string() })).optional(),
});

export async function createProduct(formData: FormData) {
    const images = JSON.parse(formData.get("images") as string || "[]");
    const sizes = JSON.parse(formData.get("sizes") as string || "[]");
    const variants = JSON.parse(formData.get("variants") as string || "[]");

    // Determine main image and base price
    const mainImage = images.find((img: any) => img.isMain)?.url || images[0]?.url || "";
    const basePrice = sizes.length > 0 ? sizes[0].price : Number(formData.get("price"));

    const rawData = {
        title: formData.get("title"),
        price: basePrice,
        image: mainImage, // Legacy field support
        category: formData.get("category"),
        description: formData.get("description"),
    };

    const validatedData = productSchema.omit({ images: true, sizes: true, variants: true }).safeParse(rawData);

    if (!validatedData.success) {
        return { error: validatedData.error.flatten().fieldErrors };
    }

    await db.transaction(async (tx) => {
        const [newProduct] = await tx.insert(products).values({
            ...validatedData.data,
            image: mainImage,
        }).returning();

        if (images.length > 0) {
            await tx.insert(productImages).values(
                images.map((img: any) => ({
                    productId: newProduct.id,
                    url: img.url,
                    isMain: img.isMain,
                }))
            );
        }

        if (sizes.length > 0) {
            await tx.insert(productSizes).values(
                sizes.map((s: any) => ({
                    productId: newProduct.id,
                    size: s.size,
                    price: s.price,
                }))
            );
        }

        if (variants.length > 0) {
            await tx.insert(productVariants).values(
                variants.map((v: any) => ({
                    productId: newProduct.id,
                    name: v.name,
                }))
            );
        }
    });

    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function updateProduct(id: number, formData: FormData) {
    const images = JSON.parse(formData.get("images") as string || "[]");
    const sizes = JSON.parse(formData.get("sizes") as string || "[]");
    const variants = JSON.parse(formData.get("variants") as string || "[]");

    const mainImage = images.find((img: any) => img.isMain)?.url || images[0]?.url || "";
    const basePrice = sizes.length > 0 ? sizes[0].price : Number(formData.get("price"));

    const rawData = {
        title: formData.get("title"),
        price: basePrice,
        image: mainImage,
        category: formData.get("category"),
        description: formData.get("description"),
    };

    const validatedData = productSchema.omit({ images: true, sizes: true, variants: true }).safeParse(rawData);

    if (!validatedData.success) {
        return { error: validatedData.error.flatten().fieldErrors };
    }

    await db.transaction(async (tx) => {
        await tx
            .update(products)
            .set({
                ...validatedData.data,
                image: mainImage,
            })
            .where(eq(products.id, id));

        // Replace relations
        await tx.delete(productImages).where(eq(productImages.productId, id));
        if (images.length > 0) {
            await tx.insert(productImages).values(
                images.map((img: any) => ({
                    productId: id,
                    url: img.url,
                    isMain: img.isMain,
                }))
            );
        }

        await tx.delete(productSizes).where(eq(productSizes.productId, id));
        if (sizes.length > 0) {
            await tx.insert(productSizes).values(
                sizes.map((s: any) => ({
                    productId: id,
                    size: s.size,
                    price: s.price,
                }))
            );
        }

        await tx.delete(productVariants).where(eq(productVariants.productId, id));
        if (variants.length > 0) {
            await tx.insert(productVariants).values(
                variants.map((v: any) => ({
                    productId: id,
                    name: v.name,
                }))
            );
        }
    });

    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function deleteProduct(id: number) {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/admin/products");
}

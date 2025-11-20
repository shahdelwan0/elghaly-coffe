"use client";

import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { createProduct, updateProduct } from "../actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    images?: { url: string; isMain: boolean }[];
    sizes?: { size: string; price: number }[];
    variants?: { name: string }[];
}

interface ProductFormProps {
    product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // State for new fields
    const [images, setImages] = useState<{ url: string; isMain: boolean }[]>(
        product?.images?.map(img => ({ url: img.url, isMain: img.isMain })) ||
        (product?.image ? [{ url: product.image, isMain: true }] : [])
    );
    const [sizes, setSizes] = useState<{ size: string; price: number }[]>(
        product?.sizes?.map(s => ({ size: s.size, price: s.price })) || []
    );
    const [variants, setVariants] = useState<{ name: string }[]>(
        product?.variants?.map(v => ({ name: v.name })) || []
    );

    // Helper to add/remove items
    const addSize = () => setSizes([...sizes, { size: "", price: 0 }]);
    const removeSize = (index: number) => setSizes(sizes.filter((_, i) => i !== index));
    const updateSize = (index: number, field: "size" | "price", value: string | number) => {
        const newSizes = [...sizes];
        newSizes[index] = { ...newSizes[index], [field]: value };
        setSizes(newSizes);
    };

    const addVariant = () => setVariants([...variants, { name: "" }]);
    const removeVariant = (index: number) => setVariants(variants.filter((_, i) => i !== index));
    const updateVariant = (index: number, value: string) => {
        const newVariants = [...variants];
        newVariants[index] = { name: value };
        setVariants(newVariants);
    };

    const setMainImage = (index: number) => {
        const newImages = images.map((img, i) => ({ ...img, isMain: i === index }));
        setImages(newImages);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setError(null);

        if (images.length === 0) {
            setError("Please upload at least one image.");
            setIsLoading(false);
            return;
        }

        // Ensure one image is main
        if (!images.some(img => img.isMain)) {
            images[0].isMain = true;
        }

        formData.append("images", JSON.stringify(images));
        formData.append("sizes", JSON.stringify(sizes));
        formData.append("variants", JSON.stringify(variants));

        try {
            if (product) {
                await updateProduct(product.id, formData);
            } else {
                await createProduct(formData);
            }
            router.refresh();
        } catch (e) {
            console.error(e);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-8 max-w-4xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
                        <input type="text" name="title" id="title" required defaultValue={product?.title} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <input type="text" name="category" id="category" required defaultValue={product?.category} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" id="description" required rows={4} defaultValue={product?.description} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none" />
                    </div>
                    {sizes.length === 0 && (
                        <div className="space-y-2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Base Price ($)</label>
                            <input type="number" name="price" id="price" step="0.01" min="0" defaultValue={product?.price} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                            <p className="text-xs text-gray-500">Used if no sizes are defined.</p>
                        </div>
                    )}
                </div>

                {/* Images */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Images</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {images.map((img, idx) => (
                            <div key={idx} className={`relative aspect-square rounded-lg border-2 overflow-hidden group ${img.isMain ? 'border-primary' : 'border-gray-200'}`}>
                                <img src={img.url} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button type="button" onClick={() => setMainImage(idx)} className="text-xs bg-white text-black px-2 py-1 rounded hover:bg-gray-100">Set Main</button>
                                    <button type="button" onClick={() => removeImage(idx)} className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
                                </div>
                                {img.isMain && <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">Main</div>}
                            </div>
                        ))}
                        <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50">
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    if (res) {
                                        const newImages = res.map(r => ({ url: r.url, isMain: images.length === 0 }));
                                        setImages([...images, ...newImages]);
                                    }
                                }}
                                onUploadError={(error: Error) => setError(`Upload failed: ${error.message}`)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t">
                {/* Sizes */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Sizes & Prices</h3>
                        <button type="button" onClick={addSize} className="text-sm text-primary hover:underline">+ Add Size</button>
                    </div>
                    {sizes.map((size, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                            <input type="text" placeholder="Size (e.g. 1kg)" value={size.size} onChange={(e) => updateSize(idx, "size", e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                            <input type="number" placeholder="Price" value={size.price} onChange={(e) => updateSize(idx, "price", Number(e.target.value))} className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                            <button type="button" onClick={() => removeSize(idx)} className="text-red-500 hover:text-red-700 p-2">×</button>
                        </div>
                    ))}
                    {sizes.length === 0 && <p className="text-sm text-gray-500 italic">No sizes defined. Base price will be used.</p>}
                </div>

                {/* Variants */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Variants</h3>
                        <button type="button" onClick={addVariant} className="text-sm text-primary hover:underline">+ Add Variant</button>
                    </div>
                    {variants.map((variant, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                            <input type="text" placeholder="Variant (e.g. Whole Beans)" value={variant.name} onChange={(e) => updateVariant(idx, e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                            <button type="button" onClick={() => removeVariant(idx)} className="text-red-500 hover:text-red-700 p-2">×</button>
                        </div>
                    ))}
                    {variants.length === 0 && <p className="text-sm text-gray-500 italic">No variants defined.</p>}
                </div>
            </div>

            <div className="pt-6 border-t">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading && <Loader2 className="animate-spin" size={20} />}
                    {product ? "Update Product" : "Create Product"}
                </button>
            </div>
        </form>
    );
}

"use server";

import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/schema";
import { CheckoutFormData } from "@/lib/checkoutValidation";
import { egyptianGovernorates } from "@/lib/egyptianLocations";

interface CartItem {
  id: number;
  quantity: number;
  price: number;
}

export async function createOrder(formData: CheckoutFormData, items: CartItem[], totalAmount: number) {
  try {
    // Resolve governorate name
    const governorateObj = egyptianGovernorates.find(g => g.id === Number(formData.governorate));
    const governorateName = governorateObj ? governorateObj.nameEn : String(formData.governorate);

    const [insertedOrder] = await db.insert(orders).values({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phoneNumber,
      address: formData.detailedAddress,
      city: formData.city,
      governorate: governorateName,
      totalAmount: totalAmount,
      status: "pending"
    }).returning({ insertedId: orders.id });

    const orderId = insertedOrder.insertedId;

    const orderItemsData = items.map(item => ({
      orderId: orderId,
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    if (orderItemsData.length > 0) {
        await db.insert(orderItems).values(orderItemsData);
    }

    return { success: true, orderId };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

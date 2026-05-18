import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/schema";
import { count, sql } from "drizzle-orm";

export default async function AdminDashboard() {
    const [productCountResult, orderCountResult, revenueResult] = await Promise.all([
        db.select({ value: sql<number>`count(distinct ${orderItems.productId})` }).from(orderItems),
        db.select({ value: count(orders.id) }).from(orders),
        db.select({
            value: sql<number>`coalesce(sum(${orders.totalAmount}), 0)`,
        }).from(orders),
    ]);

    const totalProducts = Number(productCountResult[0]?.value ?? 0);
    const totalOrders = Number(orderCountResult[0]?.value ?? 0);
    const totalRevenue = Number(revenueResult[0]?.value ?? 0);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                        ${totalRevenue.toFixed(2)}
                    </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                    <p className="mt-2 text-2xl font-bold text-gray-900">{totalOrders}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
                    <p className="mt-2 text-2xl font-bold text-gray-900">{totalProducts}</p>
                </div>
            </div>
        </div>
    );
}

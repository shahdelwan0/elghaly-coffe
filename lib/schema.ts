import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql, relations } from "drizzle-orm";

export const products = sqliteTable("products", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	price: real("price").notNull(), // Base price or default size price
	image: text("image").notNull(), // Main image for listing
	category: text("category").notNull(),
	description: text("description").notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
	images: many(productImages),
	sizes: many(productSizes),
	variants: many(productVariants),
}));

export const productImages = sqliteTable("product_images", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	productId: integer("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
	url: text("url").notNull(),
	isMain: integer("is_main", { mode: "boolean" }).default(false).notNull(),
});

export const productImagesRelations = relations(productImages, ({ one }) => ({
	product: one(products, {
		fields: [productImages.productId],
		references: [products.id],
	}),
}));

export const productSizes = sqliteTable("product_sizes", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	productId: integer("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
	size: text("size").notNull(), // e.g., "1 kg", "250 g"
	price: real("price").notNull(),
});

export const productSizesRelations = relations(productSizes, ({ one }) => ({
	product: one(products, {
		fields: [productSizes.productId],
		references: [products.id],
	}),
}));

export const productVariants = sqliteTable("product_variants", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	productId: integer("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
	name: text("name").notNull(), // e.g., "Whole Beans", "Turkish Coffee"
});

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
	product: one(products, {
		fields: [productVariants.productId],
		references: [products.id],
	}),
}));

export type Product = typeof products.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;
export type ProductSize = typeof productSizes.$inferSelect;
export type ProductVariant = typeof productVariants.$inferSelect;

export const orders = sqliteTable("orders", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	phone: text("phone").notNull(),
	address: text("address").notNull(),
	city: text("city").notNull(),
	governorate: text("governorate").notNull(),
	totalAmount: real("total_amount").notNull(),
	status: text("status").default("pending").notNull(),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const orderItems = sqliteTable("order_items", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	orderId: integer("order_id").references(() => orders.id).notNull(),
	productId: integer("product_id").references(() => products.id).notNull(),
	quantity: integer("quantity").notNull(),
	price: real("price").notNull(),
});

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
	image: text("image"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
	role: text("role"),
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	token: text("token").notNull().unique(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id),
});

export const account = sqliteTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
	refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
	scope: text("scope"),
	password: text("password"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }),
	updatedAt: integer("updated_at", { mode: "timestamp" }),
});


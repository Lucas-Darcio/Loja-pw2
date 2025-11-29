import { Product } from "@prisma/client";

export type CreateProductDTO = Pick<Product, "name" | "price" | "stock" | "description">;
export type UpdateProductDTO = Pick<Product, "name" | "price" | "stock" | "description">;


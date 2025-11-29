import { PrismaClient, Product } from "@prisma/client";
import { CreateProductDTO, UpdateProductDTO} from "./product.types";

const prisma = new PrismaClient();

export function getAllProducts(): Promise<Product[]> {
    return prisma.product.findMany();
}

export function createProducts(
    createProduct: CreateProductDTO
    ): Promise<Product> {
    return prisma.product.create({ data: createProduct })
}

export function getProduct(id: string): Promise<Product | null>{
    return prisma.product.findUnique({ where: { id: id } })
}

export function productAlreadyExists(name: string): Promise<Product | null> {
    return prisma.product.findFirst({ where: { name : name } })
}

export function updateProduct(id: string, updatedProduct: UpdateProductDTO): Promise<Product> {
    return prisma.product.update({
        where: { id:id },
        data: updatedProduct,

        })
}

export function removeProduct(id: string): Promise <Product> {
    return prisma.product.delete({
      where: {id : id}
    })
}

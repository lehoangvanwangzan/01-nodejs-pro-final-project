import { prisma } from "config/client";

const createProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload: string
) => {
    await prisma.product.create({
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
            ...(imageUpload && { image: imageUpload })
        }
    });
}
const getProductList = async () => {
    return await prisma.product.findMany();
}
const getProductById = async (id: number) => {
    return await prisma.product.findUnique({ where: { id } });

}
const handleDeleteProduct = async (id: number) => {
    const result = await prisma.product.delete({
        where: { id }
    })
    return result;
}
const updateProductById = async (
    id: number,
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload: string
) => {

    const updatedUser = await prisma.product.update({
        where: { id },
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
            ...(imageUpload && { image: imageUpload })
        }
    })

    return updatedUser;
}
export {
    createProduct, getProductList, getProductById, updateProductById, handleDeleteProduct
}
import { create } from "domain";
import { Request, Response } from "express";
import { createProduct, getProductById, handleDeleteProduct, updateProductById } from "services/admin/product.service";
import { deleteProductInCart } from "services/client/item.service";
import { TProductSchema, ProductSchema } from "src/validation/product.schema";
const getAdminCreateProductPage = async (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        image: "",
        factory: "",
        target: ""
    };
    return res.render("admin/product/create.ejs", { errors, oldData });
}
const postAdminCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.message}(${item.path[0]})`);
        const oldData = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        };
        return res.render("admin/product/create.ejs", { errors, oldData });
    }
    //success crate a new product
    const image = req?.file?.filename ?? null;
    await createProduct(name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
    return res.redirect("/admin/product");
}

const getViewProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    //get product by id
    const product = await getProductById(+id);
    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

    return res.render("admin/product/detail.ejs", {
        product,
        factoryOptions,
        targetOptions
    })
}
const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const a = await handleDeleteProduct(+id);
    return res.redirect("/admin/product");
}
const postUpdateProduct = async (req: Request, res: Response) => {
    const {
        id,
        name, price, detailDesc, shortDesc,
        quantity, factory, target
    } = req.body as TProductSchema;
    const image = req?.file?.filename ?? null;
    await updateProductById(+id, name, +price, detailDesc, shortDesc,
        +quantity, factory, target, image);
    return res.redirect("/admin/product");
}
const postDeleteProductInCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (user) {
        await deleteProductInCart(+id, user.id, user.sumCart);
    } else {
        return res.redirect("/login");
    }

    return res.redirect("/cart");
}

export {
    getAdminCreateProductPage, getViewProduct, postDeleteProductInCart,
    postAdminCreateProduct, postDeleteProduct, postUpdateProduct
}
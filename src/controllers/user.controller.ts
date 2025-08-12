import { Request, Response } from "express";
import { getProducts } from "services/client/item.service";
import { getAllRoles, getUserById, handleCreateUser, handleDeleteUser, updateUserById } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    //get users
    const products = await getProducts();
    const user = req.user;
    console.log("user", user);
    return res.render("client/home/show.ejs", { products })
};

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();

    return res.render("admin/user/create.ejs", {
        roles
    });
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null;
    // //handle create user

    await handleCreateUser(fullName, username, address, phone, avatar, role);

    return res.redirect("/admin/user");
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const a = await handleDeleteUser(id);
    return res.redirect("/admin/user");
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    //get user by id
    const user = await getUserById(id);
    const roles = await getAllRoles();
    return res.render("admin/user/detail.ejs", {
        id: id,
        user: user,
        roles
    })
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null;
    await updateUserById(id, fullName, phone, role, address, avatar);
    return res.redirect("/admin/user");
}


export {
    getHomePage, getCreateUserPage, postCreateUser, postDeleteUser,
    getViewUser, postUpdateUser
};
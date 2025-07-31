import { hashPassword } from "services/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
    const userCount = await prisma.user.count();
    const countRole = await prisma.role.count();


    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Quản trị viên",

                },
                {
                    name: "CLIENT",
                    description: "Khách hàng",

                },
                {
                    name: "STAFF",
                    description: "Nhân viên",

                }
            ]
        })
    }
    if (userCount === 0) {
        console.log("Seeding database...");
        const defaultPassword = await hashPassword("123456");
        const adminRoles = await prisma.role.findFirst({
            where: { name: "ADMIN" }
        })
        if (adminRoles) {
            await prisma.user.createMany({
                data: [
                    {
                        fullName: "admin",
                        password: defaultPassword,
                        username: "Admin",
                        address: "Hà Nội",
                        phone: "0123456789",
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRoles.id
                    },
                    {
                        fullName: "Lê Hoàng Văn",
                        password: defaultPassword,
                        username: "lehoangvan@gmail.com",
                        address: "Cần Thơ",
                        phone: "0123456789",
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRoles.id
                    },
                    {
                        fullName: "Lê Hoàn Vũ",
                        password: defaultPassword,
                        username: "lehoanvu@gmail.com",
                        address: "Hà Nội",
                        phone: "0123456789",
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRoles.id
                    },
                    {
                        fullName: "Lê Hoàn Vũu",
                        password: defaultPassword,
                        username: "lehoanvuu@gmail.com",
                        address: "Hà Nộii",
                        phone: "01234567899",
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRoles.id
                    }

                ]
            })
        }
    } if (countRole !== 0 && userCount !== 0) {
        console.log("Database already seeded");
    }
}
export default initDatabase;
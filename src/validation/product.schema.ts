import { z } from "zod";
export const ProductSchema = z.object({
    name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
    detailDesc: z.string().min(1, "Mô tả chi tiết là bắt buộc"),
    shortDesc: z.string().min(1, "Mô tả ngắn là bắt buộc"),
    price: z.string().transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, { message: "Số tiền tối thiểu là 1", }),

    quantity: z.string().transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, { message: " Số lượng tối thiểu là 1", }),
    image: z.string().url("Hình ảnh phải là một URL hợp lệ").optional(),
    factory: z.string().min(1, "Nhà máy là bắt buộc"),
    target: z.string().min(1, "Đối tượng là bắt buộc"),
});

export type TProductSchema = z.infer<typeof ProductSchema>;
import { isEmailExists } from "services/client/auth.service";
import { z } from "zod";
const passwordSchema = z.string().min(3, "Mật khẩu phải có ít nhất 3 ký tự")
    .max(20, "Mật khẩu không được vượt quá 20 ký tự")
// .refine((val) => /[A-Z]/.test(val), {
//     message: "Mật khẩu phải chứa ít nhất một chữ cái viết hoa",
// })
// .refine((val) => /[a-z]/.test(val), {
//     message: "Mật khẩu phải chứa ít nhất một chữ cái viết thường",
// })
// .refine((val) => /\d/.test(val), {
//     message: "Mật khẩu phải chứa ít nhất một chữ số",
// })
// .refine((val) => /[@$!%*?&]/.test(val), {
//     message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@, $, !, %, *, ?, &)",
// });
const emailSchema = z.string().email("Email không đúng định dạng").refine(async (email) => {
    const existingUser = await isEmailExists(email);
    return !existingUser;
}, {
    message: "Email đã được sử dụng",
    path: ["email"],
})
export const RegisterSchema = z.object({
    fullName: z.string().trim().min(1, { message: "Tên đầy đủ là bắt buộc" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),

})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu và xác nhận mật khẩu không khớp",
        path: ["confirmPassword"],
    });
export type TRegisterSchema = z.infer<typeof RegisterSchema>;
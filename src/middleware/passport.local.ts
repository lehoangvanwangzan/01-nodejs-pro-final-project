import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "services/user.service";
const configPassportLocal = () => {
    passport.use(new LocalStrategy(async function verify(username, password, callback) {
        console.log("Local strategy called with username:", username, password);
        const user = await prisma.user.findUnique({
            where: { username }
        })
        if (!user) {
            // throw new Error(`Username:${username} not found`);
            return callback(null, false, { message: `Username:${username} not found` });
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            // throw new Error("Incorrect password");
            return callback(null, false, { message: "Incorrect password" });
        }
        return callback(null, user);
    }));
}
export default configPassportLocal;
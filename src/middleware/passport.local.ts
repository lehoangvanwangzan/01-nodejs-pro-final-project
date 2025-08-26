import { prisma } from "config/client";
import { get } from "http";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserWithRoleById } from "services/client/auth.service";
import { comparePassword } from "services/user.service";
const configPassportLocal = () => {
    passport.use(new LocalStrategy({ passReqToCallback: true }, async function verify(req, username, password, callback) {
        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = [];
        }

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
    passport.serializeUser(function (user: any, callback) {

        callback(null, { id: user.id, username: user.username });

    });

    passport.deserializeUser(async function (user: any, callback) {
        const { id, username } = user;
        //query to database to get user by id
        const userInDB = await getUserWithRoleById(id);
        return callback(null, { ...userInDB });

    });
}
export default configPassportLocal;
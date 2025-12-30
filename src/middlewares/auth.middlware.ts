import { NextFunction, Request, Response } from 'express';
import { auth as betterAuth } from '../lib/auth';
import { TUserRole } from '../modules/user/user.type';

function auth(...roles: TUserRole[]) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const session = await betterAuth.api.getSession({
                headers: req?.headers,
            });
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized',
                });
            }
            if (!session?.user?.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: 'Please verify your email!',
                });
            }

            if (roles.length && !roles.includes(session?.user?.role as TUserRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden! don't have a permission",
                });
            }

            req.user = session?.user;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
                error,
            });
        }
    };
}

export default auth;

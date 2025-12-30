import { User } from '../../../generated/prisma/client';

export {};
declare global {
    namespace Express {
        interface Request {
            user?: Partial<User>;
        }
    }
}

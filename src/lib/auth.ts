import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import config from '../config';
import { sendEmail } from './nodemailer';
import { prisma } from './prisma';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    trustedOrigins: [config.APP_URL],
    user: {
        additionalFields: {
            role: {
                type: 'string',
                defaultValue: 'USER',
                required: false,
            },
            phone: {
                type: 'string',
                required: false,
            },
            status: {
                type: 'string',
                defaultValue: 'ACTIVE',
                required: false,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            const verificationUrl = `${config.APP_URL}/verify?token=${token}`; // Format
            await sendEmail(verificationUrl, user);
        },
    },
    socialProviders: {
        google: {
            prompt: 'select_account consent',
            accessType: 'offline',
            clientId: config.GOOGLE_CLIENT_ID as string,
            clientSecret: config.GOOGLE_CLIENT_SECRET as string,
        },
    },
});

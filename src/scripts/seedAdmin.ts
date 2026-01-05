import axios from 'axios';
import config from '../config';
import { prisma } from '../lib/prisma';
import UserConstants from '../modules/user/user.constant';

async function seedAdmin() {
    try {
        const adminData = {
            name: 'admin',
            email: 'admin@admin.com',
            role: UserConstants.Roles.ADMIN,
            password: 'admin1234',
        };

        const checkUserExists = await prisma.user.findUnique({
            where: {
                email: adminData.email,
            },
        });

        if (checkUserExists) {
            throw new Error('User already exists!');
        }

        const signUpAdmin = await axios.post(
            `${config.BETTER_AUTH_URL}/api/auth/sign-up/email`,
            adminData
        );

        if (signUpAdmin.status === 200 && signUpAdmin.statusText === 'OK') {
            await prisma.user.update({
                where: {
                    id: signUpAdmin?.data?.user?.id,
                },
                data: {
                    emailVerified: true,
                },
            });
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// seedAdmin();

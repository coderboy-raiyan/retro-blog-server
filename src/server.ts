import http from 'http';
import app from './app';
import config from './config';
import { prisma } from './lib/prisma';

const PORT = config.PORT;

const server = http.createServer(app);

async function bootstrap() {
    try {
        await prisma.$connect();
        console.log('DB connected Successfully');
        server.listen(PORT, () => {
            console.log(`Server is listening on PORt : ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

bootstrap();

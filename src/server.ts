import http from 'http';
import app from './app';
import config from './config';

const PORT = config.PORT || 5000;

const server = http.createServer(app);

async function bootstrap() {
    try {
        server.listen(PORT, () => {
            console.log(`Server is listening on PORt : ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

bootstrap();

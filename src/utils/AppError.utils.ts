class AppError extends Error {
    constructor(
        public statusCode: number | string,
        public message: string,
        public stack = null
    ) {
        super(message);
        this.statusCode = statusCode;

        if (stack) {
            this.stack = stack;
        } else {
            this.stack = Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default AppError;

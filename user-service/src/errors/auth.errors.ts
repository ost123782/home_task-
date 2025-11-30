export class NotFoundError extends Error {
    statusCode = 404;

    constructor(message = "Resource not found") {
        super(message);
        this.name = "NotFoundError";
    }
}

export class AuthError extends Error {
    statusCode = 401;

    constructor(message = "Unauthorized") {
        super(message);
        this.name = "AuthError";
    }
}

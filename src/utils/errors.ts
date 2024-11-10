class BaseError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);

        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this);
    }
}

export class BadRequestError extends BaseError {
    constructor(message: string) {
        super(400, message);
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message: string) {
        super(401, message);
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(404, message);
    }
}

export class ConflictError extends BaseError {
    constructor(message: string) {
        super(409, message);
    }
}

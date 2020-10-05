import {AxiosError} from "axios";

export class ApiError extends Error {
    readonly code: string;

    constructor(code: string, message = `Client error: ${code}`) {
        super(message)
        this.code = code;
    }
}

export class UnknownError extends ApiError {
    readonly cause: Error;

    constructor(cause: Error) {
        super('UNKNOWN', cause.message)
        this.cause = cause;
    }

}

function handleAxiosError(error: AxiosError) {
    if (error.response) {
        const {code = 'UNKNOWN', message} = error.response.data
        return new ApiError(code, message)
    } else {
        return new UnknownError(error)
    }
}

export function handleError<T>(error: any): Promise<T> {
    if (error.isAxiosError) {
        return Promise.reject(handleAxiosError(error));
    } else {
        return Promise.reject(new UnknownError(error))
    }
}

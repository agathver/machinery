import {useCallback, useState} from "react";

export type AsyncFunction<T, A = void> = (_: A) => Promise<T>

export enum Status {
    Idle = 'idle',
    Pending = 'pending',
    Success = 'success',
    Error = 'error'
}

type AsyncAction<T, A, E> = {
    execute: (_: A) => Promise<void>
    status: Status
    value: T | null,
    error: E | null,
}

export default function useAsync<T, A = void, E = string>(asyncFunction: AsyncFunction<T, A>): AsyncAction<T, A, E> {

    const [status, setStatus] = useState<Status>(Status.Idle);
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);

    const execute = useCallback((args: A) => {
        setStatus(Status.Pending);
        setValue(null);
        setError(null);

        return asyncFunction(args)
            .then((response: T) => {
                setValue(response);
                setStatus(Status.Success);
            })
            .catch((error: E) => {
                setError(error);
                setStatus(Status.Error);
            });

    }, [asyncFunction]);

    return {execute, status, value, error};
}

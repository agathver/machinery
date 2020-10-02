import {useCallback, useState} from "react";

export type AsyncFunction<T> = () => Promise<T>

export enum Status {
    Idle = 'idle',
    Pending = 'pending',
    Success = 'success',
    Error = 'error'
}

type AsyncAction<T, E> = {
    execute: () => Promise<void>
    status: Status
    value: T | null,
    error: E | null,
}

export default function useAsync<T, E = string>(asyncFunction: AsyncFunction<T>): AsyncAction<T, E> {

    const [status, setStatus] = useState<Status>(Status.Idle);
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);

    const execute = useCallback(() => {
        setStatus(Status.Pending);
        setValue(null);
        setError(null);

        return asyncFunction()

            .then((response: any) => {
                setValue(response);
                setStatus(Status.Success);
            })
            .catch((error: any) => {
                setError(error);
                setStatus(Status.Error);
            });

    }, [asyncFunction]);

    return {execute, status, value, error};
}

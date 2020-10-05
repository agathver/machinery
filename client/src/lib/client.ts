import axios from "axios";
import {handleError} from "./errors";

type Choice = {
    readonly value: string,
    readonly name: string,
    readonly description: string
}

export type ParameterValues = {
    [id: string]: string | boolean | number
}

export type Parameter = {
    readonly choices: Choice[],
    readonly description: string,
    readonly errorMessage: string,
    readonly id: string,
    readonly name: string,
    readonly pattern: string,
    readonly required: true,
    readonly type: string
    readonly default: any;
}

export type Task = {
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly parameters?: Parameter[]
}

export type ListTaskResponse = {
    readonly tasks: Task[]
}

export type Result = {
    readonly statusCode: number
    readonly output: string
    readonly error: string
}

export async function listTasks(): Promise<ListTaskResponse> {
    try {
        const r = await axios.get('/v1/tasks');
        return r.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function getTask(id: string): Promise<Task> {
    try {
        let response = await axios.get(`/v1/tasks/${id}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function executeTask({id, params}: { id: string, params?: ParameterValues }): Promise<Result> {
    try {
        let response = await axios.post(`/v1/tasks/${id}/execute`, params);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

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

function get(url: string) {
    return fetch(url).then(r => r.json());
}

function post(url: string, params: ParameterValues | undefined) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: params ? JSON.stringify(params) : undefined
    }).then(r => r.json());
}

export async function listTasks(): Promise<ListTaskResponse> {
    return get('/v1/tasks')
}

export async function getTask(id: string): Promise<Task> {
    return get(`/v1/tasks/${id}`)
}

export async function executeTask({id, params}: { id: string, params?: ParameterValues }): Promise<Result> {
    return post(`/v1/tasks/${id}/execute`, params)
}

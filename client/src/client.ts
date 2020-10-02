type Choice = {
    readonly value: string,
    readonly name: string,
    readonly description: string
}

export type Parameters = {
    readonly choices: Choice[],
    readonly description: string,
    readonly errorMessage: string,
    readonly id: string,
    readonly name: string,
    readonly pattern: string,
    readonly required: true,
    readonly type: string
}

export type Task = {
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly parameters?: Parameters[]
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

function post(url: string) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(r => r.json());
}

export async function listTasks(): Promise<ListTaskResponse> {
    return get('/v1/tasks')
}

export async function getTask(id: string): Promise<Task> {
    return get(`/v1/tasks/${id}`)
}

export async function executeTask(id: string): Promise<Result> {
    return post(`/v1/tasks/${id}/execute`)
}

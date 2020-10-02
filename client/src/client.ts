type Choice = {
    value: string,
    name: string,
    description: string
}

type Parameters = {
    "choices": Choice[],
    "description": string,
    "errorMessage": string,
    "id": string,
    "name": string,
    "pattern": string,
    "required": true,
    "type": string
}

export type Task = {
    id: string,
    name: string,
    description: string,
    parameters?: Parameters[]
}

export type ListTaskResponse = {
    tasks: Task[]
}

function get(url: string) {
    return fetch(url).then(r => r.json());
}

export async function listTasks(): Promise<ListTaskResponse> {
    return get('/v1/tasks')
}

export async function getTask(id: string): Promise<Task> {
    return get(`/v1/tasks/${id}`)
}

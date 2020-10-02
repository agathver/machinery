export type Task = {
    name: string,
    value: string,
    description: string
}

export type ListTaskResponse = {
    tasks: Task[]
}

export async function listTasks(): Promise<ListTaskResponse> {
    return fetch('/v1/tasks').then(r => r.json())
}

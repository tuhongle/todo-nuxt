export interface singleTask {
    id?: string
    title: string
    description: string
    list: string
    tags: string[]
    subtasks: string[]
    due_date: {
        seconds: number
        nanoseconds: number
    }
}
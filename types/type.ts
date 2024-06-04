export interface singleTask {
    id?: string
    title: string
    description: string
    list: {
        list: string
        color: string
    }
    tags: string[]
    subtasks: string[]
    due_date: {
        seconds: number
        nanoseconds: number
    }
}
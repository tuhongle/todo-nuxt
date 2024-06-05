export interface singleTask {
    id?: string
    title: string
    description: string
    list: {
        list: string
        color: string
    }
    tags: {
        title: string
        color: string
    }[]
    subtasks: string[]
    due_date: {
        seconds: number
        nanoseconds: number
    }
    user: string
}
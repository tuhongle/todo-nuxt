export interface singleTask {
    id?: string
    title: string
    description: string
    list: {
        list: string
        color: string
        count: number
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
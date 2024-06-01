import {ref} from 'vue'

export const useTodoStore = defineStore('todo',() => {
    const isOffcanvasShowed = ref<boolean>(false);
    const isTasksShowed = ref(false);

    return {
        isOffcanvasShowed, isTasksShowed
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
}
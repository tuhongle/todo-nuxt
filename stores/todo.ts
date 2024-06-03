import {ref} from 'vue'
import { useFirestore, useCollection, useDocument } from 'vuefire'
import { collection, Timestamp } from 'firebase/firestore'
import { singleTask } from '../types/type'

export const useTodoStore = defineStore('todo',() => {
    const isOffcanvasShowed = ref<boolean>(false);
    const isTasksShowed = ref(false);

    const db = useFirestore();

    const tasks = useCollection(collection(db, 'tasks'));

    const currentTask = ref<singleTask>();

    return {
        isOffcanvasShowed, isTasksShowed,
        db, tasks, currentTask
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
}
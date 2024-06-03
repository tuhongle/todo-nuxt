import {ref} from 'vue'
import { useFirestore, useCollection, useDocument } from 'vuefire'
import { collection, doc } from 'firebase/firestore'
import { singleTask } from '../types/type'

export const useTodoStore = defineStore('todo',() => {
    const isOffcanvasShowed = ref<boolean>(false);
    const isTasksShowed = ref(false);

    const db = useFirestore();

    const tasks = useCollection(collection(db, 'tasks'));

    const lists = useCollection(collection(db, 'lists'));

    const currentTask = ref<singleTask>();

    return {
        isOffcanvasShowed, isTasksShowed,
        db, tasks, currentTask, lists
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
}
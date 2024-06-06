import { ref, computed, watchEffect } from 'vue'
import { useFirestore, useCollection, useDocument, useCurrentUser } from 'vuefire'
import { collection, where } from 'firebase/firestore'
import { singleTask } from '../types/type'
import { query } from 'firebase/database'
import { getISOWeek } from 'date-fns'

export const useTodoStore = defineStore('todo',() => {
    const isOffcanvasShowed = ref<boolean>(false);
    const isTasksShowed = ref(false);

    const db = useFirestore();

    const user = useCurrentUser();

    const allTasks = useCollection(collection(db, 'tasks'));

    const taskQuery = computed(() => query(collection(db, 'tasks'), where('user', '==', user.value?.uid)))

    const tasks = useCollection<singleTask>(taskQuery);

    const todayTasks = ref<singleTask[]>();
    const tomorrowTasks = ref<singleTask[]>();
    const weekTasks = ref<singleTask[]>();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    watchEffect(
        () => {
            todayTasks.value = tasks.value.filter(el => new Date(el.due_date.seconds * 1000).toDateString() == new Date().toDateString());
            tomorrowTasks.value = tasks.value.filter(el => new Date(el.due_date.seconds * 1000).toDateString() == tomorrow.toDateString());
            weekTasks.value = tasks.value.filter(el => getISOWeek(new Date(el.due_date.seconds * 1000)) == getISOWeek(new Date()));
        },
    )

    const lists = useCollection(collection(db, 'lists'));

    const tags = useCollection(collection(db, 'tags'));

    const currentTask = ref<singleTask>();

    return {
        isOffcanvasShowed, isTasksShowed,
        db, tasks, currentTask, lists,
        allTasks, todayTasks, tomorrowTasks, weekTasks,
        tags
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
}
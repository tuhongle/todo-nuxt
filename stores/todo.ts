import { ref, computed, watchEffect } from 'vue'
import { useFirestore, useCollection, useDocument, useCurrentUser, _RefFirestore } from 'vuefire'
import { collection, where } from 'firebase/firestore'
import { singleTask, singleList, singleTag } from '../types/type'
import { query } from 'firebase/database'
import { getISOWeek } from 'date-fns'

export const useTodoStore = defineStore('todo',() => {
    const isOffcanvasShowed = ref<boolean>(false);
    const isTasksShowed = ref(false);

    const db = useFirestore();

    const user = useCurrentUser();

    const allTasks = useCollection(collection(db, 'tasks')); // query all tasks in all users

    const taskQuery = computed(() => query(collection(db, 'tasks'), where('user', '==', user.value?.uid)))

    const tasks = useCollection<singleTask>(taskQuery); // query tasks by user

    const lists = useCollection(collection(db, 'lists')); // query lists in offcanvaas

    const tags = useCollection(collection(db, 'tags')); // query tags in offcanvas

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
            (lists.value as singleList[]).forEach(list => {
                list.count = tasks.value.filter(task => task.list.list === list.list).length;
            })
        },
    )

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
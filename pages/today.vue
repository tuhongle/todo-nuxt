<template>
    <div class="flex items-center mb-10">
        <h1 class="font-bold text-5xl mr-10">Today</h1>
        <UBadge :label="tasks.length" color="gray" class="aspect-square text-4xl px-4" />
    </div>
    <UInput color="iron" placeholder="Add New Task" icon="i-heroicons-plus" size="xl" class="mb-8" id="todayAddTask" v-model="today" />
    <TransitionGroup name="lists" class="tasks" tag="ul">
        <li class="border-b border-b-gray-200 pb-4 mb-3 shadow-xs pl-4" v-for="task in tasks" :key="task.id">
            <SingleTask size="lg" :showSubtasks="true" :task />
        </li>
    </TransitionGroup>
</template>

<script setup lang="ts">
import { usePendingPromises } from 'vuefire'
import { getFirestore, Timestamp, collection, addDoc } from 'firebase/firestore'

const todoStore = useTodoStore();
const { tasks } = storeToRefs(todoStore);

const db = getFirestore();

onServerPrefetch(() => usePendingPromises());

const auth = useFirebaseAuth();

const today = ref<string>();

onMounted(() => {
    const addTask = document.getElementById('todayAddTask');
    addTask.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            await addDoc(collection(db, 'tasks'), {
                title: today.value,
                due_date: Timestamp.fromDate(new Date()),
                subtasks: [],
                tags: [],
                description: '',
                list: {
                    list: '',
                    color: '',
                }
            });
            today.value = '';
        };
    })
})

// console.log(tasks.value)

</script>

<style lang="scss">
.lists-move,
.lists-enter-active,
.lists-leave-active {
    transition: all 0.3s linear;
}

.lists-enter-from,
.lists-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>

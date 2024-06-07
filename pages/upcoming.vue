<template>
    <div class="flex items-center mb-10">
        <h1 class="font-bold text-5xl mr-10">Upcoming</h1>
        <UBadge :label="tasks.length" color="gray" class="aspect-square text-4xl px-4" />
    </div>
    <div class="rounded-lg p-4 border border-gray-100">
        <h3 class="font-bold text-xl mb-6">Today</h3>
        <UInput color="iron" placeholder="Add New Task" icon="i-heroicons-plus" size="md" class="mb-4" @keydown.enter="addTodayTask" v-model="today" />
        <ul class="tasks">
            <li class="border-b border-b-gray-100 pb-3 mb-2 pl-4 shadow-sm" v-for="task in todayTasks" :key="task.id">
                <SingleTask size="md" :showSubtasks="true" :task />
            </li>
        </ul>
    </div>
    <div class="grid grid-cols-2 gap-2 lg:gap-4">
        <div class="rounded-lg p-4 border border-gray-100">
            <h3 class="font-bold text-xl mb-6">Tomorrow</h3>
            <UInput color="iron" placeholder="Add New Task" icon="i-heroicons-plus" size="xs" class="mb-4" @keydown.enter="addTomorrowTask" v-model="tomorrow" />
            <ul class="tasks">
                <li class="border-b border-b-gray-100 pl-4" v-for="task in tomorrowTasks" :key="task.id">
                    <SingleTask size="2xs" :showSubtasks="false" :task />
                </li>
            </ul>
        </div>
        <div class="rounded-lg p-4 border border-gray-100">
            <h3 class="font-bold text-xl mb-6">This Week</h3>
            <UInput color="iron" placeholder="Add New Task" icon="i-heroicons-plus" size="xs" class="mb-4" />
            <ul class="tasks">
                <li class="border-b border-b-gray-100 pb-3 mb-2 pl-4 shadow-sm" v-for="task in weekTasks" :key="task.id">
                    <SingleTask size="2xs" :showSubtasks="false" :task />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePendingPromises, useCurrentUser, useFirestore } from 'vuefire'
import { onServerPrefetch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../stores/todo';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const todoStore = useTodoStore();
const { todayTasks, tomorrowTasks, weekTasks, tasks } = storeToRefs(todoStore);

const db = useFirestore();

// Usage VueFire outside of components (pinia)
onServerPrefetch(() => usePendingPromises());

const user = useCurrentUser();
const today = ref<string>();
const tomorrow = ref<string>();

const addTodayTask = async () => {
    await addDoc(collection(db, 'tasks'), {
        title: today.value,
        due_date: Timestamp.fromDate(new Date()),
        subtasks: [],
        tags: [],
        description: '',
        list: {
            list: '',
            color: '',
        },
        user: user.value!.uid,
        completed: false,
    });
    today.value = '';
};

const tomorrowDay = new Date();
tomorrowDay.setDate(tomorrowDay.getDate() + 1);

const addTomorrowTask = async () => {
    await addDoc(collection(db, 'tasks'), {
        title: tomorrow.value,
        due_date: Timestamp.fromDate(tomorrowDay),
        subtasks: [],
        tags: [],
        description: '',
        list: {
            list: '',
            color: '',
        },
        user: user.value!.uid,
        completed: false,
    });
    tomorrow.value = '';
};

</script>

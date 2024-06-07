<template>
    <div class="flex items-center mb-10">
        <h1 class="font-bold text-5xl mr-10 capitalize">{{ title }}</h1>
        <UBadge :label="list?.count" color="gray" class="aspect-square text-4xl px-4" />
    </div>
    <UInput color="iron" :placeholder="'Add New Task On '+title+'...'" icon="i-heroicons-plus" size="xl" class="mb-8" v-model="listTask" @keydown.enter="addTask" />
    <TransitionGroup name="lists" class="tasks" tag="ul">
        <li class="border-b border-b-gray-200 pb-4 mb-3 shadow-xs pl-4" v-for="task in listTasks" :key="task.id">
            <SingleTask size="lg" :showSubtasks="true" :task />
        </li>
    </TransitionGroup>
</template>

<script setup lang="ts">
import { usePendingPromises, useCurrentUser } from 'vuefire'
import { getFirestore, Timestamp, collection, addDoc } from 'firebase/firestore'
import { singleList, singleTask } from '../../types/type';

const route = useRoute();

console.log(route)

const title = route.params.slug;

const todoStore = useTodoStore();
const { tasks, lists } = storeToRefs(todoStore);

const db = getFirestore();

// Usage VueFire outside of components (pinia)
onServerPrefetch(() => usePendingPromises());

const user = useCurrentUser();

const listTasks = computed(() =>(tasks.value as singleTask[]).filter(task => task.list.list === title));

const list = (lists.value as singleList[]).find(list => list.list === title);

const listTask = ref<string>();

const addTask = async() => {
    await addDoc(collection(db, 'tasks'), {
        title: listTask.value,
        due_date: Timestamp.fromDate(new Date()),
        subtasks: [],
        tags: [],
        description: '',
        list: {
            list: title,
            color: list?.color,
        },
        user: user.value!.uid,
        completed: false
    });
    listTask.value = '';
};

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

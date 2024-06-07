<template>
    <div class="flex justify-between items-center mb-2">
        <UCheckbox class="items-center" v-model="task.completed" @change="updateTask" >
            <template #label>
                <span class="font-bold text-gray-500" :class="[{'line-through opacity-50': task.completed} , 'text-'+size]">{{ task.title }}</span>
            </template>
        </UCheckbox>
        <UButton color="gray" variant="none" icon="i-heroicons-chevron-right" class="hover:text-primary transition-all" @click="openEditTask" />
    </div>
    <div v-if="showSubtasks" class="flex justify-start items-center pl-6" :class="{'opacity-25': task.completed}">
        <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton class="mr-3" color="gray" size="2xs" icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" :disabled="task.completed" />

            <template #panel="{ close }">
                <DatePicker v-model="date" is-required @close="close" />
            </template>
        </UPopover>
        <div v-if="task.subtasks" class="text-xs font-bold text-gray-500 subtasks flex items-center border-l border-gray-200 pl-4 mr-4">
            <UBadge :label="task.subtasks.length" class="mr-3" size="xs" color="gray" />
            Subtasks
        </div>
        <div v-if="task.list" class="text-xs font-bold text-gray-500 task-list flex items-center border-l border-gray-200 pl-4">
            <UInput type="color" :padded="false" color="gray" variant="none" class="mr-3" v-model="task.list.color" disabled />
            <span class="capitalize">{{ task.list.list }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { doc, getFirestore, Timestamp, updateDoc } from 'firebase/firestore';
import type { SingleTask } from '~/types/type.ts'

const todoStore = useTodoStore();
const { isTasksShowed, currentTask } = storeToRefs(todoStore);

const props = defineProps<{
    size: string,
    showSubtasks: boolean,
    task: SingleTask
}>();

const date = ref(new Date(props.task.due_date.seconds * 1000));

watch(
    () => props.task.due_date,
    () => {
        date.value = new Date(props.task.due_date.seconds * 1000);
    }
);

watch(date, () => updateTask());

const openEditTask = () => {
    isTasksShowed.value = false;
    setTimeout(() => {
        isTasksShowed.value = true;
        currentTask.value = props.task;
    }, 250);
}

const db = getFirestore();

const updateTask = async () => {
    await updateDoc(doc(db, 'tasks', props.task.id), {
        "completed": props.task.completed,
        "due_date": Timestamp.fromDate(date.value)
    })
}

</script>

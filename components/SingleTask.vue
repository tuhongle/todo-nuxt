<template>
    <div class="flex justify-between items-center mb-2">
        <UCheckbox class="items-center">
            <template #label>
                <span class="font-bold text-gray-500" :class="'text-'+size">{{ task.title }}</span>
            </template>
        </UCheckbox>
        <UButton color="gray" variant="none" icon="i-heroicons-chevron-right" class="hover:text-primary transition-all" @click="isTasksShowed = true; currentTask = task" />
    </div>
    <div v-if="showSubtasks" class="flex justify-start items-center pl-6">
        <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton class="mr-3" color="gray" size="2xs" icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

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
)

</script>

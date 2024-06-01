<template>
    <div class="flex justify-between items-center mb-2">
        <UCheckbox class="items-center">
            <template #label>
                <span class="font-bold text-lg text-gray-500">Renew driver's license</span>
            </template>
        </UCheckbox>
        <UButton color="gray" variant="none" icon="i-heroicons-chevron-right" @click="isTasksShowed = true" />
    </div>
    <div class="flex justify-start items-center">
        <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton class="mr-3" color="gray" size="2xs" icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

            <template #panel="{ close }">
                <DatePicker v-model="date" is-required @close="close" />
            </template>
        </UPopover>
        <div class="text-xs font-bold text-gray-500 subtasks flex items-center border-l border-gray-200 pl-4 mr-4">
            <UBadge label="3" class="mr-3" size="xs" color="gray" />
            Subtasks
        </div>
        <div class="text-xs font-bold text-gray-500 task-list flex items-center border-l border-gray-200 pl-4">
            <UInput type="color" :padded="false" color="gray" variant="none" class="mr-3" />
            Personal
        </div>
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

const date = ref(new Date());

const todoStore = useTodoStore();
const { isTasksShowed } = storeToRefs(todoStore);
</script>

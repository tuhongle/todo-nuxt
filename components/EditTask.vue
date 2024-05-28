<template>
    <div class="offcanvas-header flex justify-between items-center">
        <h5 class="offcanvas-title font-bold text-2xl">Task:</h5>
        <UButton icon="i-heroicons-x-mark" color="transparent" class="text-black shadow-none" size="xl" />
    </div>
    <div class="offcanvas-body">
        <UInput color="transparent" class="border-1 border-gray-200 mb-3" />
        <UTextarea color="transparent" size="xl" variant="outline" placeholder="Description" class="mb-3" autoresize :maxrows="5" />
        <div class="flex items-center mb-3">
            <span class="mr-5 font-medium">List</span>
            <USelectMenu :options="['Personal', 'Work', 'Mexico']" size="lg" placeholder="Select list..." color="transparent" />
        </div>
        <div class="date flex items-center mb-3">
            <span class="mr-5 fw-medium text-nowrap">Due date</span>
            <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

                <template #panel="{ close }">
                    <DatePicker v-model="date" is-required @close="close" />
                </template>
            </UPopover>
        </div>
        <div class="tags flex items-center mb-5">
            <span class="mr-5 font-medium text-nowrap">Tags</span>
            <ul class="tag-items flex items-center mb-0">
                <li class="tag-item mr-3 bg-green-500 py-1 px-2 rounded-xl font-bold">Tag 1</li>
                <UButton icon="i-heroicons-plus" label="Add Tag" />
            </ul>
        </div>
        <h5 class="font-bold mb-4">Subtasks:</h5>
        <UButtonGroup class="flex items-center px-3 pb-2 mb-3 border-b border-b-gray-300">
            <UButton icon="i-heroicons-plus" color="transparent" variant="none" />
            <UInput color="transparent" variant="none" class="border-0 outline-none shadow-none" placeholder="Add New Subtask" />
        </UButtonGroup>
        <ul class="px-3">
            <li class="mb-2">
                <UCheckbox label="Subtask 1" />
            </li>
            <li class="mb-2">
                <UCheckbox label="Subtask 2" />
            </li>
        </ul>
    </div>
    <div class="offcanvas-footer mt-auto grid grid-cols-2 gap-4">
        <UButton label="Delete Task" color="gray" variant="outline" size="lg" class="font-bold justify-center" />
        <UButton label="Save Changes" color="yellow" variant="solid" size="lg" class="font-bold justify-center" />
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

const date = ref(new Date())
</script>
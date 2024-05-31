<template>
    <div class="flex items-center mb-10">
        <h1 class="font-bold text-5xl mr-10">Today</h1>
        <UBadge label="5" color="gray" class="aspect-square text-4xl px-4" />
    </div>
    <UInput color="iron" placeholder="Add New Task" icon="i-heroicons-plus" size="xl" class="mb-8" />
    <ul class="tasks">
        <li class="border-b border-b-gray-300 pb-2 mb-2">
            <div class="flex justify-between items-center">
                <UCheckbox>
                    <template #label>
                        <span class="font-bold text-gray-500">Research content ideas</span>
                    </template>
                </UCheckbox>
                <UButton color="gray" variant="none" icon="i-heroicons-chevron-right" />
            </div>
        </li>
        <li class="border-b border-b-gray-300 pb-2 mb-2">
            <div class="flex justify-between items-center">
                <UCheckbox>
                    <template #label>
                        <span class="font-bold text-gray-500">Create a database of guest authors</span>
                    </template>
                </UCheckbox>
                <UButton color="gray" variant="none" icon="i-heroicons-chevron-right" />
            </div>
        </li>
        <li class="border-b border-b-gray-300 pb-2 mb-2">
            <div class="flex justify-between items-center mb-1">
                <UCheckbox>
                    <template #label>
                        <span class="font-bold text-gray-500">Renew driver's license</span>
                    </template>
                </UCheckbox>
                <UButton color="gray" variant="none" icon="i-heroicons-chevron-right" />
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
        </li>
    </ul>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

const date = ref(new Date());

const auth = useFirebaseAuth();

const user = useCurrentUser();

// console.log(user.value.email)

</script>

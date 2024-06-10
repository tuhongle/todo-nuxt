<template>
    <div class="grid grid-cols-12 p-4 rounded-lg hover:bg-gray-100 transition-all">
        <div class="col-span-10 md:col-span-11">
            <div class="container grid grid-cols-1 md:grid-cols-2 items-center">
                <h5 class="text-gray-500 hover:cursor-pointer hover:text-sky-500 text-lg md:text-sm lg:text-lg mb-4 md:mb-0">Standy meeting with the team @5pm</h5>
                <div class="flex items-center justify-evenly">
                    <UButton variant="link" label="Low Priority" class="text-gray-500 hover:text-sky-500 transition-all text-xs sm:text-sm md:text-xs lg:text-sm rounded-none py-0 border-r-2 border-r-gray-300">
                        <template #leading>
                            <span class="rounded-full bg-indigo-500 w-[14px] h-[14px]"></span>
                        </template>
                    </UButton>
                    <UButton variant="link" icon="i-heroicons-tag" class="text-gray-500 hover:text-sky-500 transition-all py-0" />
                    <UPopover :popper="{ placement: 'bottom-start' }" class="flex items-center">
                        <UButton color="transparent" class="text-gray-500 hover:text-sky-500 transition-all text-xs sm:text-sm md:text-xs lg:text-sm rounded-none py-0 border-l-2 border-l-gray-300" variant="soft" icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

                        <template #panel="{ close }">
                            <DatePicker v-model="date" is-required @close="close" />
                        </template>
                    </UPopover>
                </div>
            </div>
        </div>
        <div class="flex items-center">
            <UCheckbox color="cyan" variant="outline" />
            <UButton variant="link" icon="i-heroicons-trash" class="text-gray-400 hover:text-cyan-500" />
        </div>
    </div>

    <!-- Modal -->
     <TodoModal :isOpen />
</template>

<script setup lang="ts">
import { format } from 'date-fns'

const date = ref(new Date())

const isOpen = ref(true)

</script>

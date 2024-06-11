<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                <div class="flex place-content-between items-center">
                    <h1 class="text-2xl font-bold text-gray-500">Task Detail 1</h1>
                    <UButton color="gray" size="xl" variant="ghost" icon="i-heroicons-x-mark" @click="isOpen = false"/>
                </div>
            </template>
                <UInput v-model="title" variant="none" class="*:text-gray-400 focus:*:text-gray-700 *:text-lg mb-4 pb-2 border-b-2 border-b-gray-200" />
                <div class="text-right mb-3">
                    <UButton variant="link" color="sky" label="Add description" class="text-lg text-gray-400" />
                </div>
                <UTextarea v-if="false" color="white" autoresize :maxrows="5" placeholder="Write a description text here..." class="*:text-lg *:text-gray-400 mb-3" />
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <UButton variant="outline" label="!!! Priority" size="xl" class="justify-center" />
                    <UButton variant="outline" icon="i-heroicons-tag" label="Tags" size="xl" class="justify-center" />
                </div>
                <div v-if="false" class="shadow-lg rounded-md p-8">
                    <URadioGroup v-model="priority" :options class="ml-4" >
                        <template #label="{ option }">
                            <p class="mb-2 text-lg text-gray-400 flex items-center ml-1">
                                <span class="mr-2" :class="`text-${option.color}`">{{  option.icon }}</span>
                                {{ option.label }}
                            </p>
                        </template>
                        <template #legend>
                            <p class="text-xl text-gray-400 mb-3 -ml-4">Set priority of your task</p>
                        </template>
                    </URadioGroup>
                </div>
                <div v-if="false" class="shadow-lg rounded-md p-8">
                    <UInput placeholder="Enter tag..." size="xl" variant="none" class="rounded shadow-md mb-4" />
                    <UCheckbox class="px-4 justify-between flex-row-reverse items-center">
                        <template #label>
                            <div class="flex items-center text-md text-gray-400">
                                <UButton icon="i-heroicons-tag" variant="ghost" />
                                <span class="text-lg ml-2">Home</span>
                            </div>
                        </template>
                    </UCheckbox>
                </div>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <UButton label="Close" color="orange" />
                    <UButton label="Save changes" color="green" />
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
const isOpen = defineModel('isOpen');
const title = ref('Standing up meeting with the team @5pm');

const options = [
    { value: 'high', label: 'High', icon: '!!!', color: 'red-500' },
    { value: 'medium', label: 'Medium', icon: '!!', color: 'orange-500' },
    { value: 'low', label: 'Low', icon: '!', color: 'yellow-500' },
    { value: 'none', label: 'None (Default)', icon: '!!!', color: 'gray-500' }
]

const priority = ref('none');
</script>
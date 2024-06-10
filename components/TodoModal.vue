<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                <div class="flex place-content-between items-center">
                    <h1 class="text-2xl font-bold">Todo Task 1</h1>
                    <UButton color="gray" size="xl" variant="ghost" icon="i-heroicons-x-mark" @click="isOpen = false"/>
                </div>
            </template>
                Body
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
</script>
<template>
    <div class="flex items-center mb-10">
        <h1 class="font-bold text-5xl mr-10">Today</h1>
        <UBadge label="5" color="gray" class="aspect-square text-4xl px-4" />
    </div>
    <UInput color="iron" placeholder="Add New Task" icon="i-heroicons-plus" size="xl" class="mb-8" />
    <ul class="tasks">
        <li class="border-b border-b-gray-200 pb-4 mb-3 shadow-sm pl-4" v-for="n in 4" :key="n">
            <SingleTask size="lg" :showSubtasks="true" />
        </li>
    </ul>
</template>

<script setup lang="ts">
const auth = useFirebaseAuth();

const user = useCurrentUser();

</script>

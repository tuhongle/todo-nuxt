<template>
    <div class="flex items-center mb-10">
        <h1 class="font-bold text-5xl mr-10">Upcoming</h1>
        <UBadge label="12" color="gray" class="aspect-square text-4xl px-4" />
    </div>
    <div class="rounded-lg p-4 border border-gray-100">
        <h3 class="font-bold text-xl mb-6">Today</h3>
        <UInput color="iron" placeholder="Add New Task" icon="i-heroicons-plus" size="md" class="mb-4" />
        <ul class="tasks">
            <li class="border-b border-b-gray-100 pb-3 mb-2 pl-4 shadow-sm" v-for="n in 4" :key="n">
                <SingleTask size="md" :showSubtasks="true" />
            </li>
        </ul>
    </div>
    <div class="columns-2 gap-2 lg:gap-4">
        <div class="rounded-lg p-4 border border-gray-100">
            <h3 class="font-bold text-xl mb-6">Tomorrow</h3>
            <UInput color="iron" placeholder="Add New Task" icon="i-heroicons-plus" size="xs" class="mb-4" />
            <ul class="tasks">
                <li class="border-b border-b-gray-100 pb-3 mb-2 pl-4 shadow-sm" v-for="n in 4" :key="n">
                    <SingleTask size="2xs" :showSubtasks="false"/>
                </li>
            </ul>
        </div>
        <div class="rounded-lg p-4 border border-gray-100">
            <h3 class="font-bold text-xl mb-6">This Week</h3>
            <UInput color="iron" placeholder="Add New Task" icon="i-heroicons-plus" size="xs" class="mb-4" />
            <ul class="tasks">
                <li class="border-b border-b-gray-100 pb-3 mb-2 pl-4 shadow-sm" v-for="n in 4" :key="n">
                    <SingleTask size="2xs" :showSubtasks="false"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
const auth = useFirebaseAuth();

const user = useCurrentUser();

</script>

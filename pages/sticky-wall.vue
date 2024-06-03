<template>
    <div class="flex items-center mb-10">
        <h1 class="font-bold text-5xl mr-10">Sticky Wall</h1>
    </div>
    <div class="grid grid-cols-3 gap-6">
        <div class="p-6 rounded-lg bg-pink-200 shadow-lg aspect-square">
            <h3 class="font-bold text-xl mb-3">Social Media</h3>
            <ul class="tasks list-inside">
                <li class="mb-2 text-md" v-for="n in 4" :key="n">
                    - Plan social content
                </li>
            </ul>
        </div>
        <div class="p-6 rounded-lg bg-green-200 shadow-lg aspect-square">
            <h3 class="font-bold text-xl mb-3">Content Strategy</h3>
            <ul class="tasks list-inside">
                <li class="mb-2 text-md" v-for="n in 4" :key="n">
                    - Plan social content
                </li>
            </ul>
        </div>
        <div class="p-6 rounded-lg bg-blue-200 shadow-lg aspect-square">
            <h3 class="font-bold text-xl mb-3">Email A/B Tests</h3>
            <ul class="tasks list-inside">
                <li class="mb-2 text-md" v-for="n in 4" :key="n">
                    - Plan social content
                </li>
            </ul>
        </div>
        <div class="p-6 rounded-lg bg-purple-200 shadow-lg aspect-square">
            <h3 class="font-bold text-xl mb-3">Banner Ads</h3>
            <ul class="tasks list-inside">
                <li class="mb-2 text-md" v-for="n in 4" :key="n">
                    - Plan social content
                </li>
            </ul>
        </div>
        <UButton variant="ghost" class="group rounded-lg shadow-lg bg-gray-200 aspect-square flex items-center justify-center">
            <template #leading>
                <UIcon name="i-heroicons-plus" class="text-6xl md:text-8xl text-gray-700 group-hover:text-orange-500" />
            </template>
        </UButton>
    </div>
</template>

<script setup lang="ts">
const auth = useFirebaseAuth();

const user = useCurrentUser();

</script>

<style lang="scss" scoped>
.aspect-square {
    aspect-ratio: 1 /1;
}
</style>

<template>
    <div class="flex items-center mb-10">
        <h1 class="font-bold text-5xl mr-10 capitalize">Search - <span class="text-primary">{{ title }}</span></h1>
        <!-- <UBadge :label="list?.count" color="gray" class="aspect-square text-4xl px-4" /> -->
    </div>
    <TransitionGroup name="lists" class="tasks" tag="ul">
        <li class="border-b border-b-gray-200 pb-4 mb-3 shadow-xs pl-4" v-for="task in searchTasks" :key="task.id">
            <SingleTask size="lg" :showSubtasks="true" :task />
        </li>
    </TransitionGroup>
</template>

<script setup lang="ts">
import { usePendingPromises, useCurrentUser } from 'vuefire'
import { singleTask } from '../../types/type';

const route = useRoute();

const title = route.params.slug;

const todoStore = useTodoStore();
const { tasks } = storeToRefs(todoStore);

// Usage VueFire outside of components (pinia)
onServerPrefetch(() => usePendingPromises());

const user = useCurrentUser();

const searchTasks = computed(() =>(tasks.value as singleTask[]).filter(task => task.title.toLowerCase().includes(title)));

</script>

<style lang="scss">
.lists-move,
.lists-enter-active,
.lists-leave-active {
    transition: all 0.3s linear;
}

.lists-enter-from,
.lists-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>

<template>
    <main>
        <section class="project h-screen p-6">
            <div class="grid grid-cols-12 auto-cols-auto gap-8 h-full">
                <div :class="[isOffcanvasShowed ? 'col-span-3' : 'col-span-1']">
                    <Offcanvas />
                </div>
                <div :class="n">
                    <slot />
                </div>
                <div v-show="isTasksShowed" class="col-span-4">
                    <EditTask />
                </div>
            </div>
        </section>
    </main>
    <footer>
        <!-- <Footer /> -->
    </footer>
</template>

<script setup lang="ts">
const todoStore = useTodoStore();
const { isOffcanvasShowed, isTasksShowed } = storeToRefs(todoStore);

const n = ref<string>()

watch(
    [isOffcanvasShowed, isTasksShowed],
    () => {
        if (isOffcanvasShowed.value && isTasksShowed.value) {
            n.value = 'col-span-5';
        } else if (!isOffcanvasShowed.value && isTasksShowed.value) {
            n.value = 'col-span-7';
        } else if (isOffcanvasShowed.value && !isTasksShowed.value) {
            n.value = 'col-span-9';
        } else {
            n.value = 'col-span-11';
        }
        console.log(n.value)
    },
    { immediate: true},
    { deep: true }
)

</script>

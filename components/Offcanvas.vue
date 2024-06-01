<template>
    <div v-show="isOffcanvasShowed" class="h-full p-4 rounded-xl flex flex-col -ml-48" id="offCanvas">
        <div class="offcanvas-header flex items-center justify-between mb-6">
            <h3 class="offcanvas-title text-3xl font-extrabold">Menu</h3>
            <UButton class="text-black shadow-none" size="xl" color="transparent" icon="i-heroicons-bars-3" id="closeBars" />
        </div>
        <div class="offcanvas-body">
            <div class="py-2">
                <UInput color="iron" placeholder="Search..." icon="i-heroicons-magnifying-glass" />
            </div>
            <div class="py-2 border-b border-b-gray-300">
                <h6 class="font-semibold text-lg">TASKS</h6>
                <UVerticalNavigation
                :links="links"
                :ui="{
                    label: 'text-sm font-semibold ml-1',
                    active: 'text-primary',
                    icon: {
                        active: 'text-primary'
                    }
                }"
                />
            </div>
            <div class="py-2 border-b border-b-gray-300">
                <h6 class="font-semibold text-lg">LISTS</h6>
                <ul class="lists mb-3">
                    <a class="text-reset text-decoration-none" href="">
                        <li class="flex py-2 items-center">
                            <UInput type="color" :padded="false" color="gray" variant="none" class="mr-3" />
                            <span class="text-sm font-semibold text-gray-700">Personal</span>
                            <UBadge color="gray" variant="solid" class="ml-auto">12</UBadge>
                        </li>
                    </a>
                    <a class="text-reset text-decoration-none" href="">
                        <li class="flex py-2 items-center">
                            <UInput type="color" :padded="false" color="gray" variant="none" class="mr-3" />
                            <span class="text-sm font-semibold text-gray-700">Work</span>
                            <UBadge color="gray" variant="solid" class="ml-auto">12</UBadge>
                        </li>
                    </a>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-plus" label="Add New List" class="font-semibold" />
                </ul>
                <div class="add-list p-3 border border-gray-200 rounded-md">
                    <div class="mb-2 flex items-center">
                        <UInput type="color" :padded="false" color="gray" variant="none" />
                        <UInput color="gray" variant="none" placeholder="List Name..." />
                    </div>
                    <div class="color-sample">
                        <div class="list-box bg-green-500"></div>
                    </div>
                </div>
            </div>
            <div class="py-2">
                <h6 class="font-semibold text-lg mb-3">TAGS</h6>
                <ul class="tags flex mb-2">
                    <a class="" href="">
                        <li class="flex items-center py-1 px-2 mr-1 text-nowrap rounded-md font-semibold text-sm bg-cyan-200">Tag 1</li>
                    </a>
                    <a class="" href="">
                        <li class="flex items-center py-1 px-2 mr-1 text-nowrap rounded-md font-semibold text-sm bg-red-200">Tag 2</li>
                    </a>
                </ul>
                <UButton square size="xs" color="gray" variant="ghost" icon="i-heroicons-plus" label="Add Tag" class="text-sm font-semibold"/>
            </div>
        </div>
        <div class="offcanvas-footer mt-auto">
            <!-- <p class="text-sm mb-2">Hello, <span class="underline text-blue-500">{{ user.email }}</span></p> -->
            <UPopover popper="{ placement: 'top' }">
                <UButton class="text-gray-700 font-semibold cursor-pointer" icon="i-heroicons-arrow-right-start-on-rectangle" color="transparent" label="Sign out" />
                <template #panel="{ close }">
                    <div class="p-4 rounded-md bg-gray-100">
                        <UButton color="red" class="mr-3" label="Confirm" @click="signout" />
                        <UButton color="gray" label="No" @click="close" />
                    </div>
                </template>
            </UPopover>
        </div>
    </div>
    <UButton v-show="!isOffcanvasShowed" icon="i-heroicons-bars-3" color="gray" variant="ghost" size="4xl" :ui="{ size: { '4xl': 'text-4xl'}}" class="p-2" id="openBars"/>
</template>

<script setup lang="ts">
const links = [
    {
        label: 'Upcoming',
        icon: 'i-heroicons-chevron-double-right',
        badge: '12',
        to: '/upcoming'
    },
    {
        label: 'Today',
        icon: 'i-heroicons-list-bullet',
        badge: '12',
        to: '/today'
    },
    {
        label: 'Sticky Wall',
        icon: 'i-heroicons-shield-check',
        badge: '12',
        to: '/sticky-wall'
    },
]

import { signOut } from 'firebase/auth'
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { getCurrentUser } from 'vuefire'

const auth = useFirebaseAuth();
const user = await getCurrentUser();

const signout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.log(err)
    }
}

const todoStore = useTodoStore();
const {isOffcanvasShowed } = storeToRefs(todoStore);

onMounted(() => {
    const openBars = document.getElementById('openBars');
    const closeBars = document.getElementById('closeBars');
    const offCanvas = document.getElementById('offCanvas');

    openBars?.addEventListener('click', () => {
        isOffcanvasShowed.value = true;
        setTimeout(() => {
            offCanvas?.classList.remove('-ml-48');
            offCanvas?.classList.add('bg-gray-100');
        }, 20)
    })

    closeBars?.addEventListener('click', () => {
        offCanvas?.classList.add('-ml-48');
        offCanvas?.classList.remove('bg-gray-100');
        setTimeout(() => {
            isOffcanvasShowed.value = false;
        }, 300)
    })
})

</script>

<style lang="scss">
#offCanvas {
    transition: all 0.3s ease-in-out;
}
</style>
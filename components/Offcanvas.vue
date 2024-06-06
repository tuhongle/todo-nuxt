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
                <TransitionGroup name="lists" class="lists mb-3" tag="ul">
                    <a class="text-reset text-decoration-none" href="" v-for="list in lists" :key="list.id">
                        <li class="flex py-2 px-3 items-center">
                            <UInput type="color" :padded="false" color="gray" variant="none" class="mr-3" v-model="list.color" @change="updateColor(list.id, list.color)" />
                            <span class="text-sm font-medium text-gray-700 capitalize">{{ list.list }}</span>
                            <UBadge color="gray" variant="solid" class="ml-auto">{{ list.count }}</UBadge>
                        </li>
                    </a>
                </TransitionGroup>
                <UPopover>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-plus" label="Add New List" class="font-semibold" />

                    <template #panel>
                        <div class="py-2 px-3 border border-gray-200 bg-gray-50 rounded-md">
                            <div class="mb-2 flex items-center">
                                <UInput type="color" :padded="false" color="gray" variant="none" v-model="newList.color" />
                                <UInput color="gray" variant="none" placeholder="List Name..." v-model="newList.list" @keyup.enter="addNewList"/>
                            </div>
                        </div>
                    </template>
                </UPopover>
            </div>
            <div class="py-2">
                <h6 class="font-semibold text-lg mb-3">TAGS</h6>
                <ul class="tags flex flex-wrap mb-2 mr-1">
                    <li class="py-1 px-2 mr-1 mb-1 text-nowrap rounded-md font-semibold text-sm" v-for="tag in tags" :key="tag.color" :style="{ background: tag.color }">
                        <a href="" class="group flex items-center">
                            <span class="mr-1">{{ tag.title }}</span>
                            <UButton :padded="false" icon="i-heroicons-x-mark" variant="none" size="2xs" class="hidden group-hover:block hover:scale-125 transition-all" @click="deleteTag(tag.id)" />
                        </a>
                    </li>
                </ul>
                <!-- <UButton square size="xs" color="gray" variant="ghost" icon="i-heroicons-plus" label="Add Tag" class="text-sm font-semibold"/> -->
            </div>
        </div>
        <div class="offcanvas-footer mt-auto">
            <p v-if="user" class="text-sm mb-4">Hello, <span class="underline text-blue-500">{{ user.email }} </span></p>
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
import { signOut } from 'firebase/auth'
import { storeToRefs } from 'pinia';
import { onMounted, ref, watchEffect } from 'vue';

import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useCollection, useDocument, useFirestore } from 'vuefire'

const auth = useFirebaseAuth();
const user = useCurrentUser();

const signout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.log(err)
    }
}

const todoStore = useTodoStore();
const { isOffcanvasShowed, lists, todayTasks, allTasks, tags } = storeToRefs(todoStore);

const links = ref<{}[]>();

watchEffect(
    () => {
        links.value = [
            {
                label: 'Upcoming',
                icon: 'i-heroicons-chevron-double-right',
                badge: allTasks.value.length.toString(),
                to: '/upcoming'
            },
            {
                label: 'Today',
                icon: 'i-heroicons-list-bullet',
                badge: todayTasks.value.length.toString(),
                to: '/today'
            },
            {
                label: 'Sticky Wall',
                icon: 'i-heroicons-shield-check',
                badge: '12',
                to: '/sticky-wall'
            },
        ];
        lists.value.forEach(el => {
            
        })
    }
)

// add new list
const newList = ref({
    list: '',
    color: '#000000',
})

const newListInput = ref(null)

const db = useFirestore();

const addNewList = async () => {
    await addDoc(collection(db, 'lists'), newList.value);
    newList.value = {
        list: '',
        color: '#000000'
    }
}

// update list color
const updateColor = async (id, color) => {
    await updateDoc(doc(db, 'lists', id), {
        "color": color
    })
}

// delete tag
const deleteTag = async (id) => {
    await deleteDoc(doc(db, 'tags', id));
    isOffcanvasShowed.value = true;
}

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

<style lang="scss" scoped>
#offCanvas {
    transition: all 0.3s ease-in-out;
}

.lists-move,
.lists-enter-active,
.lists-leave-active {
    transition: all 0.3s ease;
}

.lists-enter-from,
.lists-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>
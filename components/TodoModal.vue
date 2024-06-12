<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                <div class="flex place-content-between items-center">
                    <h1 class="text-2xl font-bold text-gray-500">Task Detail</h1>
                    <UButton color="gray" size="xl" variant="ghost" icon="i-heroicons-x-mark" @click="isOpen = false"/>
                </div>
            </template>
                <UInput v-model="todo.title" variant="none" class="*:text-gray-400 focus:*:text-gray-700 *:text-lg mb-4 pb-2 border-b-2 border-b-gray-200" />
                <div v-if="!showDesc && !todo.desc" class="text-right mb-3">
                    <UButton variant="link" color="sky" label="Add description" class="text-lg text-gray-400" @click="showDesc=true" />
                </div>
                <UTextarea v-if="showDesc || todo.desc" color="white" autoresize :maxrows="5" placeholder="Write a description text here..." class="*:text-lg *:text-gray-400 mb-3 *:px-4" v-model="todo.desc" />
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <UButton variant="outline" label="!!! Priority" size="xl" class="justify-center" @click="showPriority = !showPriority; showTags = false" />
                    <UButton variant="outline" icon="i-heroicons-tag" label="Tags" size="xl" class="justify-center" @click="showTags = !showTags; showPriority = false" />
                </div>
                <div v-if="showPriority" class="shadow-lg rounded-md p-8 transition-all">
                    <URadioGroup v-model="todo.priority" :options class="ml-4" >
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
                <div v-if="showTags" class="shadow-lg rounded-md p-8 transition-all">
                    <UInput placeholder="Enter tag..." size="xl" variant="none" class="rounded shadow-md mb-4" v-model="newTag" @keydown.enter="addNewTag" />
                    <TransitionGroup name="tags" tag="ul">
                        <li v-for="tag in tags">
                            <UCheckbox class="px-4 justify-between flex-row-reverse items-center" :value='tag.title' v-model="todo.tags">
                                <template #label>
                                    <div class="flex items-center text-md text-gray-400">
                                        <UButton icon="i-heroicons-trash" variant="ghost" @click="deleteTag(tag.id)" />
                                        <UInput type="color" :padded="false" v-model="tag.color" />
                                        <span class="text-lg ml-2" :style="{ 'color' : tag.color }">{{ tag.title.charAt(0).toUpperCase() + tag.title.slice(1) }}</span>
                                    </div>
                                </template>
                            </UCheckbox>
                        </li>
                    </TransitionGroup>
                </div>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <UButton label="Close" color="orange" @click="closeUnsave" />
                    <UButton label="Save changes" color="green" @click="saveChanges" />
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { TenantManager } from 'firebase-admin/auth';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import type { todoType } from '~/types/todoType';

const isOpen = defineModel('isOpen');
const showDesc = ref(false);
const showPriority = ref(false);
const showTags = ref(false);
const newTag = ref<string>();

const props = defineProps<{
    todo: todoType
}>();

const todoStore = useTodoStore();
const { tags, priority } = storeToRefs(todoStore);

const initialTodo = ref({...props.todo});

const db = useFirestore();

const options = [
    { value: 'high', label: 'High', icon: '!!!', color: 'red-500' },
    { value: 'medium', label: 'Medium', icon: '!!', color: 'orange-500' },
    { value: 'low', label: 'Low', icon: '!', color: 'yellow-500' },
    { value: 'none', label: 'None (Default)', icon: '!!!', color: 'gray-500' }
]

const createRandomColor = () => {
    let r = Math.floor(Math.random() * 255).toString(16);
    let g = Math.floor(Math.random() * 255).toString(16);
    let b = Math.floor(Math.random() * 255).toString(16);

    (r.length === 1) ? r = '0'+r : r;
    (g.length === 1) ? g = '0'+g : g;
    (b.length === 1) ? b = '0'+b : b;

    return '#'+r+g+b;
}

const closeUnsave = () => {
    props.todo.title = initialTodo.value.title;
    props.todo.desc = initialTodo.value.desc;
    props.todo.priority = initialTodo.value.priority;
    props.todo.tags = initialTodo.value.tags;
    isOpen.value = false;
    showDesc.value = false;
    showPriority.value = false;
    showTags.value = false;
}

const saveChanges = async () => {
    await updateDoc(doc(db, 'todo', props.todo.id), {
        title: props.todo.title,
        desc: props.todo.desc,
        priority: props.todo.priority,
        tags: props.todo.tags
    })
    initialTodo.value = {...props.todo};
    isOpen.value = false;
    showDesc.value = false;
    showPriority.value = false;
    showTags.value = false;
}

const addNewTag = async () => {
    await addDoc(collection(db, 'tags'), {
        title: newTag.value,
        color: createRandomColor(),
    });
    newTag.value = '';
}

const deleteTag = async (id : string) => {
    await deleteDoc(doc(db, 'tags', id ))
}

</script>

<style scoped>
.tags-move,
.tags-enter-active,
.tags-leave-active {
    transition: all 0.3s linear;
}

.tags-enter-from,
.tags-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}

</style>
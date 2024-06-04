<template>
    <div class="h-full p-4 bg-gray-100 rounded-xl flex flex-col">
        <div class="offcanvas-header flex justify-between items-center mb-6">
            <h5 class="offcanvas-title font-bold text-2xl">Task:</h5>
            <UButton icon="i-heroicons-x-mark" color="transparent" class="text-black shadow-none" size="xl" @click="isTasksShowed = false" />
        </div>
        <div class="offcanvas-body">
            <UInput color="iron" variant="outline" class="mb-4" size="md" v-model="currentTask.title" />
            <UTextarea color="iron" size="xl" variant="outline" placeholder="Description" class="mb-4" autoresize :maxrows="5" v-model="currentTask.description" />
            <div class="flex items-center mb-4">
                <span class="mr-5 font-medium">List:</span>
                <USelect size="sm" :options="title" v-model="currentTask.list.list" color="iron" class="min-w-32" />
            </div>
            <div class="date flex items-center mb-4">
                <span class="mr-5 font-medium text-nowrap">Due date:</span>
                <UPopover v-if="currentTask.due_date" :popper="{ placement: 'bottom-start' }">
                    <UButton color="iron" icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />
                    <template #panel="{ close }">
                        <DatePicker v-model="date" is-required @close="close" />
                    </template>
                </UPopover>
            </div>
            <div class="tags flex items-center mb-5 flex-wrap gap-2">
                <span class="mr-5 font-medium text-nowrap">Tags:</span>
                <ul class="tag-items flex items-center mb-0" v-for="tag in currentTask.tags">
                    <li class="tag-item text-sm bg-green-300 py-1 px-2 rounded-md font-semibold text-nowrap">{{ tag }}</li>
                </ul>
                <UButtonGroup class="flex items-center shadow">
                    <UButton icon="i-heroicons-plus" color="gray" variant="ghost" @click="addTags"/>
                    <UInput color="gray" variant="none" placeholder="Add Tag" v-model="newTag" id="addTags" style="max-width:75px !important;"/>
                </UButtonGroup>
            </div>
            <h5 class="font-bold mb-4">Subtasks:</h5>
            <UButtonGroup class="flex items-center px-3 pb-2 mb-3 border-b border-b-gray-300">
                <UButton icon="i-heroicons-plus" color="transparent" variant="none" @click="updateSubtask" />
                <UInput color="transparent" variant="none" class="border-0 outline-none shadow-none" placeholder="Add New Subtask" v-model="newSubtask" id="addSubtask"/>
            </UButtonGroup>
            <TransitionGroup name="subtasks" tag="ul" v-if="currentTask.subtasks" class="pl-5">
                <li class="mb-2 flex justify-between" v-for="subtask in currentTask.subtasks">
                    <UCheckbox :label="subtask" />
                    <UButton icon="i-heroicons-trash" variant="ghost" color="gray" size="xs" @click="deleteSubtask(subtask)" />
                </li>
            </TransitionGroup>
        </div>
        <div class="offcanvas-footer mt-auto grid grid-cols-2 gap-4">
            <UButton label="Delete Task" color="gray" variant="outline" size="lg" class="font-bold justify-center" @click="deleteTask" />
            <UButton label="Save Changes" color="yellow" variant="solid" size="lg" class="font-bold justify-center" @click="updateTask" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { singleTask } from '@/types/type.ts'
import { getFirestore, doc, deleteDoc, updateDoc, Timestamp, arrayUnion, arrayRemove } from 'firebase/firestore'

const props = defineProps<{
    currentTask: singleTask
}>()

const date = ref(new Date(props.currentTask.due_date.seconds * 1000))

watch(date, () => {
    props.currentTask.due_date = Timestamp.fromDate(new Date(date.value));
})

const todoStore = useTodoStore();
const { isTasksShowed, lists } = storeToRefs(todoStore);

const db = getFirestore();
const taskRef = doc(db, 'tasks', props.currentTask.id);

// function to delete task
const deleteTask = async () => {
    await deleteDoc(taskRef);
    isTasksShowed.value = false;
}


// function to update changes
const updateTask = async () => {
    await updateDoc(taskRef, props.currentTask);
    isTasksShowed.value = false;
}

// Update new subtask
const newSubtask = ref<string>('')

const updateSubtask = () => {
    // await updateDoc(taskRef, {
    //     subtasks: arrayUnion(newSubtask.value)
    // });
    props.currentTask.subtasks.unshift(newSubtask.value);
    newSubtask.value = '';
}

// Delete subtask
const deleteSubtask = (subtask) => {
    props.currentTask.subtasks = props.currentTask.subtasks.filter((sub) => sub !== subtask)
}

// add tags
const newTag = ref<string>('');

const addTags = () => {
    props.currentTask.tags.push(newTag.value);
    newTag.value = '';
}

// retrieve titles of lists
const title = lists.value.map(e => e.list)

watch(
    () => props.currentTask.list.list,
    () => lists.value.forEach(element => {
        if (element.list == props.currentTask.list.list) {
            props.currentTask.list.color = element.color;
        }
    }),
    { immediate: true}
)

onMounted(() => {
    const addSubTask = document.getElementById('addSubtask');

    addSubTask.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            props.currentTask.subtasks.unshift(newSubtask.value)
            newSubtask.value = '';
        }
    })
})

</script>

<style lang="scss">
.subtasks-move,
.subtasks-enter-active,
.subtasks-leave-active {
    transition: all 0.3s linear;
}

.subtasks-leave-to,
.subtasks-enter-from {
    opacity: 0;
    transform: translateY(-20px)
}

option {
    text-transform: capitalize;
}
</style>
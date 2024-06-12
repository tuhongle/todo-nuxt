<template>
    <div class="grid grid-cols-12 items-center p-4 rounded-lg hover:bg-gray-100 transition-all" :class="{ 'line-through opacity-25': todo.isDone }">
        <div class="col-span-10 md:col-span-11">
            <div class="container grid grid-cols-1 md:grid-cols-2 items-center">
                <UTooltip>
                    <UButton variant="none" class="text-gray-500 hover:cursor-pointer hover:text-sky-500 text-lg md:text-lg lg:text-xl mb-4 md:mb-0 w-fit" :disabled="todo.isDone" @click="isOpen = !isOpen">
                        {{ todo.title }}
                    </UButton>

                    <template #text>
                        <span class="text-md text-gray-500">{{ todo.desc }}</span>
                    </template>
                </UTooltip>
                <div class="flex items-center justify-evenly">
                    <UPopover class="flex items-center">
                        <UButton variant="link" :label="`${todo.priority.charAt(0).toUpperCase()+todo.priority.slice(1)} Priority`" class="text-gray-500 hover:text-sky-500 transition-all text-xs sm:text-sm md:text-xs lg:text-sm rounded-none py-0 border-r-2 border-r-gray-300" :disabled="todo.isDone">
                            <template #leading>
                                <span class="rounded-full w-[14px] h-[14px]" :class="[ (todo.priority === 'high') ? 'bg-red-500': '', (todo.priority === 'medium') ? 'bg-orange-500': '', (todo.priority === 'low') ? 'bg-yellow-500': '', (todo.priority === 'none') ? 'bg-gray-500': '' ]"></span>
                            </template>
                        </UButton>

                        <template #panel>
                            <div class="p-4">
                                <URadioGroup v-model="todo.priority" :options="priorityOptions" class="*:space-y-4" @change="updatePriority"/>
                            </div>
                        </template>
                    </UPopover>
                    <UPopover class="flex items-center" :popper="{ placement: 'bottom-start'}">
                        <UTooltip text="Click to see tags">
                            <UButton variant="link" icon="i-heroicons-tag" class="text-gray-500 hover:text-sky-500 transition-all py-0" :disabled="todo.isDone" />
                        </UTooltip>

                        <template #panel>
                            <ul class="p-4 space-y-2">
                                <li v-for="(tag, index) in todo.tags" :key="index">
                                    <UButton :to="`/todo/${tag}`" variant="ghost" :style="{ 'color': tags[tags.findIndex(el => el.title === tag)].color }" class="capitalize">{{ tag }}</UButton>
                                </li>
                            </ul>
                        </template>
                    </UPopover>
                    <UPopover :popper="{ placement: 'bottom-start' }" class="flex items-center">
                        <UButton color="transparent" class="text-gray-500 hover:text-sky-500 transition-all text-xs sm:text-sm md:text-xs lg:text-sm rounded-none py-0 border-l-2 border-l-gray-300" variant="soft" icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" :disabled="todo.isDone" />

                        <template #panel="{ close }">
                            <DatePicker v-model="date" is-required @close="close" />
                        </template>
                    </UPopover>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-end">
            <UCheckbox color="cyan" variant="outline" class="mr-2" v-model="todo.isDone" @change="updateDone"/>
            <UPopover class="flex items-center" :popper="{ placement: 'bottom-end' }">
                <UButton :padded=false variant="link" icon="i-heroicons-trash" size="xl" class="text-gray-400 hover:text-cyan-500" />

                <template #panel>
                    <div class="flex flex-col py-4 px-2 gap-2 max-w-36">
                        <UButton color="red" label="Delete Todo" class="justify-center" @click="deleteTodo" />
                        <span class="text-wrap text-center text-gray-500">or Click outside to not delete</span>
                    </div>
                </template>
            </UPopover>
        </div>
    </div>

    <!-- Modal -->
     <TodoModal v-model:isOpen="isOpen" :todo />
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { collection, deleteDoc, doc, orderBy, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import type { priorityType, todoType } from '~/types/todoType';

const showTagTodos = defineModel('showTagTodos')

const props = defineProps<{
    todo: todoType
}>()

const db = useFirestore()
const user = useCurrentUser()

const todoStore = useTodoStore()
let { tags, priority } = storeToRefs(todoStore)

const date = ref(new Date(props.todo.due_date.seconds * 1000))

watch(date, async () => {
    props.todo.due_date = Timestamp.fromDate(new Date(date.value));
    await updateDoc(doc(db, 'todo', props.todo.id), {
        due_date: Timestamp.fromDate(new Date(date.value))
    })
})
    
const isOpen = ref(false)

const priorityOptions = ref<{
   value: string,
   label: string 
}[]>([])

for ( const el of (priority.value as priorityType).rank) {
    priorityOptions.value.push({
        value: el,
        label: `${el.charAt(0).toUpperCase()+el.slice(1)} Priority`
    })
}

const updatePriority = async () => {
    await updateDoc(doc(db, 'todo', props.todo.id), {
        priority: props.todo.priority,
    })
}

const updateDone = async () => {
    await updateDoc(doc(db, 'todo', props.todo.id), {
        isDone: props.todo.isDone,
    })
}

const deleteTodo = async () => {
    await deleteDoc(doc(db, 'todo', props.todo.id))
}

const emit = defineEmits<{
    updateTag: [tag: string]
}>()

</script>

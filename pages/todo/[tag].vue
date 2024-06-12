<template>
    <section class="p-8 md:p-16 lg:p-32 flex place-content-center bg-green-300 h-screen w-screen">
      <div class="container bg-white p-8 lg:p-16 rounded-2xl shadow-xl">
        <div class="flex items-center justify-between mb-8 md:mb-12">
          <div class="flex items-center gap-2">
                <UButton icon="i-heroicons-arrow-left" color="cyan" variant="outline" to="/todo" />
                <h1 class="text-3xl lg:text-5xl font-extrabold text-nowrap">{{ title.toUpperCase() }}</h1>
          </div>
          <img src="@/assets/img/todo.png" alt="" class="shrink rounded-full w-[36px] md:w-[64px]">
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4 md:mb-8">
          <UButton color="primary" size="lg" class="flex-col md:flex-row place-content-center">
            <span class="text-xs font-bold max-md:mb-2">TOTAL:</span>
            <UBadge color="gray" :label="tagTodos.length" :ui="{ rounded: 'rounded-full'}" />
          </UButton>
          <UButton color="green" size="lg" class="flex-col md:flex-row place-content-center">
            <span class="text-xs font-bold max-md:mb-2">SUCCESS:</span>
            <UBadge color="gray" :label="successTagTodos.length" :ui="{ rounded: 'rounded-full'}" />
          </UButton>
          <UButton color="orange" size="lg" class="flex-col md:flex-row place-content-center">
            <span class="text-xs font-bold max-md:mb-2">PENDING:</span>
            <UBadge color="gray" :label="tagTodos.length - successTagTodos.length" :ui="{ rounded: 'rounded-full' }" />
          </UButton>
        </div>
        <UButtonGroup orientation="horizontal" class="w-full flex justify-between pb-2 shadow-none border-b-2 border-b-cyan-200 mb-4 md:mb-6">
          <UInput placeholder="Enter New To-Do" size="md" variant="none" class="w-full *:text-md *:md:text-lg *:lg:text-xl" v-model="newTodo" @keydown.enter="createTodo" />
          <UButton color="gray" variant="ghost" icon="i-heroicons-arrow-right" class="hover:cursor-pointer" @click="createTodo" />
        </UButtonGroup>
        <TransitionGroup name="todo" tag="ul" class="space-y-4 mb-4">
          <li v-for="todo in tagTodos" :key="todo.id">
            <SingleTodo :todo />
          </li>
        </TransitionGroup>
        <UButton label="Clear All" size="xl" color="sky" variant="ghost" class="font-semibold" @click="clearTagTodos">
          <template #trailing>
            <UIcon name="i-heroicons-trash" />
          </template>
        </UButton>
      </div>
    </section>
</template>
  
<script setup lang="ts">
import { addDoc, collection, Timestamp, where, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import type { _RefFirestore } from 'vuefire';

const route = useRoute();

const title = route.params.tag;

const user = useCurrentUser();

const db = useFirestore()
const newTodo = ref<string>('')

// get tag Todos list

const tagTodoQuery = computed(() => query(collection(db, 'todo'), where('user','==',user.value.uid), where('tags', 'array-contains', title), orderBy('due_date')))

const tagTodos = useCollection(tagTodoQuery)

const tagIdArray = computed(() => tagTodos.value.map(el => el.id))

// get success tag Todos list

const successTagTodoQuery = computed(() => query(collection(db, 'todo'), where('user','==',user.value.uid), where('tags', 'array-contains', title), where('isDone', '==', true)))

const successTagTodos = useCollection(successTagTodoQuery)

const createTodo = async () => {
    try {
        if (newTodo.value) {
            const tagArray = []
            tagArray.push(title)
            await addDoc(collection(db, 'todo'), {
                title: newTodo.value,
                desc: '',
                user: user.value!.uid,
                due_date: Timestamp.fromDate(new Date()),
                priority: 'none',
                tags: tagArray,
                isDone: false,
            });
            newTodo.value = '';
        }
    } catch (err) {
        console.log(err)
    }
}

const clearTagTodos = async () => {
    for (const id of tagIdArray.value) {
        await deleteDoc(doc(db, 'todo', id))
    }
}

</script>
  
  <style>
  .todo-move,
  .todo-enter-active,
  .todo-leave-active {
    transition: all 0.3s linear;
  }
  
  .todo-enter-from,
  .todo-leave-to {
    opacity: 0;
    transform: translateY(-100px)
  }
  </style>
<template>
  <section class="p-8 md:p-16 lg:p-32 flex place-content-center bg-green-300 min-h-screen w-screen">
    <div class="container bg-white p-8 lg:p-16 rounded-2xl shadow-xl">
      <div class="flex items-center justify-between mb-8 md:mb-12">
        <div class="flex flex-col">
          <h1 class="text-3xl lg:text-5xl font-extrabold text-nowrap mb-2">Todo App</h1>
          <p class="text-gray-500 pl-2">
            Hello,
            <span v-if="user?.displayName" class="underline">{{ user?.displayName }}</span>
            <span v-else class="underline text-blue-400">{{ user?.email }}</span>
          </p>
        </div>
        <img src="@/assets/img/todo.png" alt="" class="shrink rounded-full w-[36px] md:w-[64px]">
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4 md:mb-8">
        <UButton color="primary" size="lg" class="flex-col md:flex-row place-content-center">
          <span class="text-xs font-bold max-md:mb-2">TOTAL:</span>
          <UBadge color="gray" :label="todos.length" :ui="{ rounded: 'rounded-full'}" />
        </UButton>
        <UButton color="green" size="lg" class="flex-col md:flex-row place-content-center">
          <span class="text-xs font-bold max-md:mb-2">SUCCESS:</span>
          <UBadge color="gray" :label="successTodos.length" :ui="{ rounded: 'rounded-full'}" />
        </UButton>
        <UButton color="orange" size="lg" class="flex-col md:flex-row place-content-center">
          <span class="text-xs font-bold max-md:mb-2">PENDING:</span>
          <UBadge color="gray" :label="todos.length - successTodos.length" :ui="{ rounded: 'rounded-full' }" />
        </UButton>
      </div>
      <UButtonGroup orientation="horizontal" class="w-full flex justify-between pb-2 shadow-none border-b-2 border-b-cyan-200 mb-4 md:mb-6">
        <UInput placeholder="Enter New To-Do" size="md" variant="none" class="w-full *:text-md *:md:text-lg *:lg:text-xl" v-model="newTodo" @keydown.enter="createTodo" />
        <UButton color="gray" variant="ghost" icon="i-heroicons-arrow-right" class="hover:cursor-pointer" @click="createTodo" />
      </UButtonGroup>
      <TransitionGroup name="todo" tag="ul" class="space-y-4 mb-4">
        <li v-for="todo in todos" :key="todo.id">
          <SingleTodo :todo />
        </li>
      </TransitionGroup>
      <div class="flex justify-between">
        <UPopover :popper="{ placement: 'bottom-start'}">
          <UButton label="Sign Out" size="xl" color="gray" variant="link" class="font-semibold">
            <template #trailing>
              <UIcon name="i-heroicons-arrow-right-start-on-rectangle" />
            </template>
          </UButton>

          <template #panel>
            <div class="p-2 rounded-lg">
              <UButton label="Confirm" color="red" @click="signOutUser" />
              Or click outside to cancel
            </div>
          </template>

        </UPopover>
        <UButton label="Clear All" size="xl" color="sky" variant="ghost" class="font-semibold" @click="todoStore.clearAllTodos">
          <template #trailing>
            <UIcon name="i-heroicons-trash" />
          </template>
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { signOut } from 'firebase/auth';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import type { _RefFirestore } from 'vuefire';

const user = useCurrentUser();
const auth = useFirebaseAuth();

const todoStore = useTodoStore();
const { todos, successTodos, currentUser } = storeToRefs(todoStore);

if (currentUser.value !== user.value!.uid) {
  reloadNuxtApp()
}

const db = useFirestore()
const newTodo = ref<string>('')

const createTodo = async () => {
  try {
    if (newTodo.value) {
      await addDoc(collection(db, 'todo'), {
        title: newTodo.value,
        desc: '',
        user: user.value!.uid,
        due_date: Timestamp.fromDate(new Date()),
        priority: 'none',
        tags: [],
        isDone: false,
      });
      newTodo.value = '';
    }
  } catch (err) {
    console.log(err)
  }
}

// Sign out user
const signOutUser = async () => {
  await signOut(auth!)
  currentUser.value = user.value?.uid
  navigateTo('/login')
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
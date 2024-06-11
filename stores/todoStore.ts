import { useFirestore, useCollection, useCurrentUser } from 'vuefire'
import type { todoType } from '../types/todoType'
import { query, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy, collection, where } from 'firebase/firestore'

export const useTodoStore = defineStore('todo', () => {

  const db = useFirestore();

  const priority = useCollection(collection(db, 'priorty')) // get priority list

  const tags = useCollection(collection(db, 'tags')) // get tags list

  // get todo lists by user
  const user = useCurrentUser();

  const todoQuery = computed(() => query(collection(db, 'todo'), where('user', '==', user.value?.uid), orderBy('due_date')))

  const todos = useCollection(todoQuery)

  return {
      priority, tags,
      todos,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
  }
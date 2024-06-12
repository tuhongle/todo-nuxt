import { useFirestore, useCollection, useCurrentUser } from 'vuefire'
import type { priorityType, todoType } from '../types/todoType'
import { query, doc, orderBy, collection, where } from 'firebase/firestore'

export const useTodoStore = defineStore('todo', () => {

  const db = useFirestore();

  const priority = useDocument(doc(db, 'priority', 'Nc7fXRzLEA2rz0Dg0IYZ')) // get priority list

  const tags = useCollection(collection(db, 'tags')) // get tags list

  // get todo lists by user
  const user = useCurrentUser();

  const todoQuery = computed(() => query(collection(db, 'todo'), where('user', '==', user.value?.uid), orderBy('due_date')))

  const successTodoQuery = computed(() => query(collection(db, 'todo'), where('user', '==', user.value?.uid), where('isDone', '==', true)))

  const todos = useCollection(todoQuery)

  const successTodos = useCollection(successTodoQuery)

  return {
      priority, tags,
      todos, successTodos
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
  }
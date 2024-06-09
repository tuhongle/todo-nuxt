import { useFirestore, useCollection, useDocument } from 'vuefire'
import type { todoType } from '../types/todoType'
import { query, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy, collection } from 'firebase/firestore'
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { useRouter } from 'vue-router'

export const useTodoStore = defineStore('todo', () => {

  const db = useFirestore();


  return {
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
  }
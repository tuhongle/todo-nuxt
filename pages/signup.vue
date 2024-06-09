<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useFirebaseAuth } from 'vuefire'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const schema = z.object({
    username: z.string(),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters'),
    repassword: z.string()
})

type Schema = z.output<typeof schema>

const state = ref({
    username: '',
    email: '',
    password: '',
    repassword: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  if (state.value.password !== state.value.repassword) errors.push({ path: 'repassword', message: 'Password does not match'})
  return errors
}

const auth = useFirebaseAuth();

const signup = async () => {
    if (state.value.password === state.value.repassword) {
        await createUserWithEmailAndPassword(auth, state.value.email, state.value.password);
        await updateProfile(auth.currentUser, {
            displayName: state.value.username || state.value.email,
        });
        state.value = {
            username: '',
            email: '',
            password: '',
            repassword: ''
        }
    }
}

</script>

<template>
    <div class="container-xl grid grid-cols-1 md:grid-cols-2">
        <ULink to="/">
            <img src="/assets/img/hero.jpg" alt="hero image" class="h-screen object-cover w-full">
        </ULink>
        <div class="flex items-center justify-center bg-green-200 p-4 md:p-8 lg:p-12 xl:p-16">
            <div class="shadow-2xl rounded-lg container bg-white p-2 md:p-4 lg:p-8">
                <div class="flex items-center gap-4 mb-8">
                    <ULink class="shrink">
                        <img src="/assets/img/todo.png" alt="" class="shrink-1" width="100">
                    </ULink>
                    <div class="greetings">
                        <p class="font-black text-2xl mb-2 capitalize">New here?</p>
                        <p class="mb-0 text-lg">Signing up is easy. It only takes a few steps</p>
                    </div>
                </div>
                <div class="form-wrapper">
                    <UForm :validate :schema :state class="space-y-6" @submit="signup">
                        <UFormGroup label="Username" name="username">
                            <UInput v-model="state.username" size="lg"/>
                        </UFormGroup>

                        <UFormGroup label="Email" name="email">
                            <UInput v-model="state.email" size="lg"/>
                        </UFormGroup>

                        <UFormGroup label="Password" name="password">
                            <UInput v-model="state.password" type="password" size="lg"/>
                        </UFormGroup>

                        <UFormGroup label="Confirm Password" name="repassword">
                            <UInput v-model="state.repassword" type="password" size="lg"/>
                        </UFormGroup>

                        <UCheckbox label="I agree to all Terms & Conditions" class="text-sm" />

                        <UButton type="submit" size="xl" class="uppercase">Sign Up</UButton>

                        <p class="text-center">
                            Already have an account?
                            <ULink class="underline text-primary" to="/login">Login</ULink>
                        </p>
                    </UForm>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useFirebaseAuth } from 'vuefire'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const schema = z.object({
    username: z.string().min(3, 'Username should be atleast 3 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters'),
    repassword: z.string().min(8, 'Must be at least 8 characters')
}).refine(data => data.password === data.repassword, {
    path: ['repassword'],
    message: 'Password does not match'
})

type Schema = z.output<typeof schema>

const state = ref({
    username: '',
    email: '',
    password: '',
    repassword: ''
})

const form = ref(null);
const termAgree = ref(false);

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
        termAgree.value = false;
    }
}

const user = useCurrentUser();

console.log(user.value.displayName)
</script>

<template>
    <div class="container-xl grid grid-cols-1 md:grid-cols-2">
        <ULink class="hidden md:block" to="/">
            <img src="/assets/img/hero.jpg" alt="hero image" class="h-screen object-cover w-full">
        </ULink>
        <div class="flex items-center justify-center p-8 lg:p-12 xl:p-16 max-md:bg-hero-img bg-cover h-screen md:bg-green-200">
            <div class="shadow-2xl rounded-lg container bg-white p-8 md:p-4 lg:p-8">
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
                    <UForm ref="form" :schema :state class="space-y-6" @submit="signup">
                        <UFormGroup label="Username" name="username">
                            <UInput v-model="state.username" size="lg"/>
                        </UFormGroup>

                        <UFormGroup label="Email" name="email" required>
                            <UInput v-model="state.email" size="lg"/>
                        </UFormGroup>

                        <UFormGroup label="Password" name="password" required>
                            <UInput v-model="state.password" type="password" size="lg"/>
                        </UFormGroup>

                        <UFormGroup label="Confirm Password" name="repassword" required>
                            <UInput v-model="state.repassword" type="password" size="lg"/>
                        </UFormGroup>

                        <UCheckbox v-model="termAgree" label="I agree to all Terms & Conditions" class="text-sm" />

                        <UButton :disabled="!termAgree || !state.email || !state.password" type="submit" size="xl" class="uppercase w-1/3 justify-center">Sign Up</UButton>

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
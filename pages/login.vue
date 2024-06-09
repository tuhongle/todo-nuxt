<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = ref({
    email: '',
    password: ''
})

// const todoStore = useTodoStore();

</script>

<template>
    <div class="container-xl grid grid-cols-1 md:grid-cols-2">
        <ULink to="/">
            <img src="/assets/img/hero.jpg" alt="hero image" class="h-screen object-cover w-full">
        </ULink>
        <div class="flex items-center justify-center bg-green-200 p-4 md:p-8 lg:p-12 xl:p-16">
            <div class="shadow-2xl rounded-lg container bg-white p-2 md:p-4 lg:p-8">
                <div class="flex items-center justify-between
                 gap-4 mb-8">
                    <ULink class="shrink">
                        <img src="/assets/img/todo.png" alt="" class="shrink-1" width="100">
                    </ULink>
                    <div class="greetings">
                        <p class="font-extrabold text-2xl mb-2 capitalize">Hello! let's get started</p>
                        <p class="mb-0 text-lg">Sign in to continue.</p>
                    </div>
                </div>
                <div class="form-wrapper">
                    <UForm :schema :state class="space-y-6">
                        <UFormGroup label="Email" name="email">
                            <UInput v-model="state.email" size="lg"/>
                        </UFormGroup>

                        <UFormGroup label="Password" name="password">
                            <UInput v-model="state.password" type="password" size="lg"/>
                        </UFormGroup>

                        <UButton type="submit" size="xl" class="uppercase">Sign In</UButton>

                        <div class="flex items-center justify-between">
                            <UCheckbox>
                                <template #label>
                                    <span class="text-sm text-gray-500">Keep me signed in</span>
                                </template>
                            </UCheckbox>
                            <ULink class="text-sm underline text-green-400" to="/forgot-password">Forgot Password?</ULink>
                        </div>
                        <p class="text-center">
                            Don't have an account?
                            <ULink class="underline text-primary" to="/signup">Create</ULink>
                        </p>
                    </UForm>
                </div>
            </div>
        </div>
    </div>
</template>
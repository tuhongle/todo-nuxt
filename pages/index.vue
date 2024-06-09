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
        <ULink class="hidden md:block" to="/">
            <img src="/assets/img/hero01.jpg" alt="hero image" class="h-screen object-cover w-full">
        </ULink>
        <!-- <ULink to="/" class="bg-home-img bg-cover shrink h-screen w-full"></ULink> -->
        <div class="flex items-center justify-center p-8 lg:p-12 xl:p-16 max-md:bg-home-img bg-cover h-screen md:bg-green-200">
            <div class="shadow-2xl rounded-lg container bg-white p-8 md:p-4 lg:p-8 xl:p-16 space-y-4 md:space-y-6 lg:space-y-8">
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold">Productive Mind</h1>
              <p class="text-lg lg:text-xl">With only the features you need, Todo Mind is customized for individuals seeking a stress-free way to stay focused on their goals, projects, and tasks.</p>
              <UButton color="yellow" size="lg" block label="Get Started" class="text-gray-700 font-bold text-lg" to="/signup" />
              <p class="text-center font-semibold">
                Already have an account?
                <ULink to="/login" class="underline text-primary">Log in</ULink>
              </p>
            </div>
        </div>
    </div>
</template>
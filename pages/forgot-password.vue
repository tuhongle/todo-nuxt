<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
    email: z.string().email('Invalid email'),
})

type Schema = z.output<typeof schema>

const state = ref({
    email: '',
})

// const todoStore = useTodoStore();

</script>

<template>
    <div class="container-xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <ULink to="/">
            <img src="/assets/img/hero.jpg" alt="hero image" class="h-screen object-cover w-full">
        </ULink>
        <div class="flex items-center justify-center p-4 md:p-8 lg:p-12 xl:p-16">
            <div class="shadow-2xl rounded-lg container p-2 md:p-4 lg:p-8">
                <div class="flex items-center gap-4 mb-8">
                    <ULink class="shrink">
                        <img src="/assets/img/todo.png" alt="" class="shrink-1" width="100">
                    </ULink>
                    <div class="greetings">
                        <p class="font-black text-2xl mb-2 capitalize">Find your email</p>
                        <p class="mb-0 text-lg">Please enter your recovery email</p>
                    </div>
                </div>
                <div class="form-wrapper">
                    <UForm :schema :state class="space-y-6">
                        <UFormGroup label="Email" name="email">
                            <UInput v-model="state.email" size="lg"/>
                        </UFormGroup>

                        <div class="text-right">
                            <UButton type="submit" size="xl" class="uppercase">Next</UButton>
                        </div>
                    </UForm>
                    <p class="text-gray-500">Thank you! Please check you email to reset your password.</p>
                </div>
            </div>
        </div>
    </div>
</template>
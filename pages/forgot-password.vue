<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

const schema = z.object({
    email: z.string().email('Invalid email'),
})

type Schema = z.output<typeof schema>

const state = ref({
    email: '',
})

const completed = ref(false);
const errorMessage = ref<string>('')

const auth = useFirebaseAuth();

const sendMail = async () => {
    try {
        const result = await $fetch('/api/todo', {
            method: 'post',
            body: {
                email: state.value.email,
                },
                headers: {
                    "Content-Type": "application/json",   
                }
            })
        if (result) {
            await sendPasswordResetEmail(auth, state.value.email);
            completed.value = true;
        }
    } catch (error) {
        console.log(error.message)
        errorMessage.value = "This email isn't existed!"
        setTimeout(() => {
            errorMessage.value = ''
        }, 2000);
    }
}

</script>

<template>
    <div class="container-xl grid grid-cols-1 md:grid-cols-2">
        <ULink to="/">
            <img src="/assets/img/hero.jpg" alt="hero image" class="h-screen object-cover w-full">
        </ULink>
        <div class="flex items-center justify-center bg-green-200 p-4 md:p-8 lg:p-12 xl:p-16">
            <div class="shadow-2xl rounded-lg container p-2 md:p-4 lg:p-8 bg-white">
                <div class="flex items-center justify-between gap-4 mb-8">
                    <ULink class="shrink">
                        <img src="/assets/img/todo.png" alt="" class="shrink-1" width="100">
                    </ULink>
                    <div class="greetings">
                        <p class="font-black text-xl sm:text-2xl md:text-xl lg:text-2xl mb-2 capitalize">Find your email</p>
                        <p class="mb-0 text-lg">Please enter your recovery email</p>
                    </div>
                </div>
                <div class="form-wrapper">
                    <UForm :schema :state class="space-y-6" @submit="sendMail">
                        <UFormGroup v-if="!completed" label="Email" :error="errorMessage" name="email">
                            <UInput v-model="state.email" size="lg"/>
                        </UFormGroup>
                        <p v-else class="text-green-500 text-2xl">Thank you! Please check you email to reset your password.</p>

                        <div class="text-right">
                            <UButton v-if="!completed" :disabled="!state.email" type="submit" size="xl" class="uppercase">Next</UButton>
                            <UButton v-else to="/login" size="xl" class="uppercase">Log In</UButton>
                        </div>
                    </UForm>
                </div>
            </div>
        </div>
    </div>
</template>
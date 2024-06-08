<script setup lang="ts">
// const todoStore = useTodoStore();
</script>

<template>
    <div class="container-xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <ULink to="/">
            <img src="/assets/img/hero.jpg" alt="hero image" class="h-screen object-cover w-full">
        </ULink>
        <div class="flex items-center justify-center p-4 md:p-8 lg:p-12 xl:p-16">
            <div class="shadow-lg rounded-lg container p-2 md:p-4 lg:p-8">
                <div class="flex items-center gap-4">
                    <ULink class="shrink">
                        <img src="/assets/img/todo.png" alt="" class="shrink-1" width="100">
                    </ULink>
                    <div class="greetings">
                        <p class="font-black text-2xl mb-2 capitalize">Hello! let's get started</p>
                        <p class="mb-0 text-lg">Sign in to continue.</p>
                    </div>
                </div>
                <div class="form-wrapper">
                    <form @submit.prevent="">
                        <div class="">
                            <input class="" type="text" placeholder="Email" required>
                        </div>
                        <div class="">
                            <input class="" type="password" placeholder="Password" required>
                        </div>
                        <p class="text-danger mb-3">{{ }}</p>
                        <button class="" type="submit">SIGN IN</button>
                        <div class="">
                            <div class="me-2">
                                <label class="form-check-label">
                                    <input type="checkbox" class="form-check-input">
                                    <span class="ms-2 text-muted">Keep me signed in</span>
                                </label>
                            </div>
                            <RouterLink class="text-dark">Forgot password?</RouterLink>
                        </div>
                        <p class="text-center lead">
                            Don't have an account?
                            <NuxtLink :to="{ name: 'signup' }">Create</NuxtLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
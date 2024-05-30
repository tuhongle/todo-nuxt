<template>
    <div class="content-text text-start">
        <h1 class="font-bold text-3xl lg:text-6xl 2xl:text-8xl mb-8">Todo Mind</h1>
        <p class="font-medium text-md lg:text-lg xl:text-xl 2xl:text-2xl mb-5">
            With only the features you need, Todo Mind is customized for individuals seeking a stress-free way to stay focused on their goals, projects and tasks.
        </p>
        <UButton block to="/signup" label="Get Started" color="yellow" size="xl" class="text-gray-700 font-semibold mb-5 lg:text-md xl:text-lg 2xl:text-xl" />
        <p class="font-semibold text-sm lg:text-md xl:text-lg 2xl:text-xl text-center">
            Already have an account?
            <UButton to="/login" :padded="false" label="Sign in" class="text-sm lg:text-md xl:text-lg 2xl:text-xl text-primary font-bold" color="gray" variant="none" />
        </p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'startup'
})
</script>
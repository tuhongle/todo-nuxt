<template>
    <div class="content-text text-start">
        <h1 class="font-bold text-4xl lg:text-6xl mb-8">Todo Mind</h1>
        <p class="font-medium text-md lg:text-lg mb-5">
            With only the features you need, Todo Mind is customized for individuals seeking a stress-free way to stay focused on their goals, projects and tasks.
        </p>
        <UButton block to="/signup" label="Get Started" color="yellow" size="md" class="text-gray-700 font-semibold mb-5" />
        <p class="font-semibold text-sm text-center">
            Already have an account?
            <UButton to="/login" :padded="false" label="Sign in" class="text-sm text-primary font-bold" color="gray" variant="none" />
        </p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'startup'
})
</script>
<template>
    <div class="content-text text-start w-full">
        <h1 class="font-bold text-4xl lg:text-6xl mb-8">Log in</h1>
        <div class="form mb-5">
            <UInput placeholder="Your Email..." color="iron" size="lg" class="mb-3" />
            <UInput type="password" placeholder="Password" color="iron" variant="outline" size="lg" class="mb-3">
                <template #trailing>
                    <UButton icon="i-heroicons-eye" size="sm" variant="none" class="text-gray-500" />
                </template>
            </UInput>
        </div>
        <UButton block label="Log in" color="yellow" size="xl" class="text-gray-700 font-semibold mb-5" />
        <UButton label="Forgot Password" color="iron" variant="ghost" class="text-semibold text-gray-500 mb-3" />
        <UDivider label="or" class="text-gray-700 font-bold mb-5" />
        <div class="columns-2 mb-5">
            <UButton label="Google" color="iron" variant="solid" size="lg" block />
            <UButton label="Facebook" color="iron" variant="solid" size="lg" block />
        </div>
        <p class="font-semibold text-sm text-center">
            Don't have an account?
            <UButton to="/signup" :padded="false" label="Sign up" class="text-sm text-primary font-bold" color="gray" variant="none" />
        </p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'startup'
})
</script>
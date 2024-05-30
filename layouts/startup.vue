<template>
    <main>
        <div class="grid grid-cols-2">
            <div class="image-wrapper">
                <NuxtLink to="/"><img src="@/assets/images/hero.jpg" alt="hero image" class="w-full h-screen object-cover" /></NuxtLink>
            </div>
            <div class="content-wrapper flex justify-center items-center p-6 lg:p-8 xl:p-16 2xl:p-32">
                <slot />
            </div>
        </div>
    </main>
</template>
<template>
    <div class="offcanvas-header flex items-center justify-between">
        <h3 class="offcanvas-title text-3xl font-extrabold">Menu</h3>
        <UButton class="text-black shadow-none" size="xl" color="transparent" icon="i-heroicons-bars-3" />
    </div>
    <div class="offcanvas-body">
        <div class="py-2">
            <UInput color="gray" placeholder="Search..." icon="i-heroicons-magnifying-glass" />
        </div>
        <div class="py-2 border-b border-b-black">
            <h6 class="font-bold text-xl">TASKS</h6>
            <ul class="tasks">
                <a class="" href="">
                    <li class="flex py-2 items-center">
                        <UIcon class="mr-3" name="i-heroicons-chevron-double-right" />
                        <span>Upcoming</span>
                        <UBadge color="gray" variant="solid" class="ml-auto">12</UBadge>
                    </li>
                </a>
                <a class="" href="">
                    <li class="flex py-2 items-center">
                        <UIcon class="mr-3" name="i-heroicons-list-bullet" />
                        <span>Today</span>
                        <UBadge color="gray" variant="solid" class="ml-auto">12</UBadge>
                    </li>
                </a>
                <a class="" href="">
                    <li class="flex py-2 items-center">
                        <UIcon class="mr-3" name="i-heroicons-shield-check" />
                        <span>Sticky Wall</span>
                        <UBadge color="gray" variant="solid" class="ml-auto">12</UBadge>
                    </li>
                </a>
            </ul>
        </div>
        <div class="py-2 border-b border-b-black">
            <h6 class="font-bold text-xl">LISTS</h6>
            <ul class="lists">
                <a class="text-reset text-decoration-none" href="">
                    <li class="flex py-2 items-center">
                        <span class="list-box"></span>
                        <span>Personal</span>
                        <UBadge color="gray" variant="solid" class="ml-auto">12</UBadge>
                    </li>
                </a>
                <a class="text-reset text-decoration-none" href="">
                    <li class="flex py-2 items-center">
                        <span class="list-box"></span>
                        <span>Work</span>
                        <UBadge color="gray" variant="solid" class="ml-auto">12</UBadge>
                    </li>
                </a>
                <UButton icon="i-heroicons-plus" label="Add New List" />
            </ul>
            <div class="add-list p-3">
                <UButtonGroup size="md" orientation="horizontal">
                    <UButton icon="i-heroicons-clipboard-document" color="gray" />
                    <UInput placeholder="List Name" />
                </UButtonGroup>
                <div class="color-sample">
                    <div class="list-box"></div>
                </div>
            </div>
        </div>
        <div class="py-2">
            <h6 class="font-bold text-xl mb-3">TAGS</h6>
            <ul class="tags flex mb-2"> 
                <a class="" href="">
                    <li class="flex items-center py-1 px-2 mr-2 text-nowrap rounded-lg bg-cyan-200">Tag 1</li>
                </a>
                <a class="" href="">
                    <li class="flex items-center py-1 px-2 mr-2 text-nowrap rounded-lg bg-red-200">Tag 2</li>
                </a>
            </ul>
            <UButton color="gray" icon="i-heroicons-plus" label="Add Tag" />
        </div>
    </div>
    <div class="offcanvas-footer mt-auto">
        <UButton class="text-black border-0 outline-none shadow-none" icon="i-heroicons-arrow-right-start-on-rectangle" color="transparent" label="Sign out" />
    </div>
</template>

<script setup lang="ts">

</script>
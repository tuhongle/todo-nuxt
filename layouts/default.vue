<template>
    <main>
        <section class="project h-screen p-6">
            <div class="grid grid-cols-12 auto-cols-auto gap-8 h-full">
                <div class="col-span-3 p-4 bg-gray-100 rounded-xl flex flex-col">
                    <Offcanvas />
                </div>
                <div class="col-span-5">
                    <slot />
                </div>
                <div class="col-span-4 p-4 bg-gray-100 rounded-xl flex flex-col">
                    <EditTask />
                </div>
            </div>
        </section>
    </main>
    <footer>
        <!-- <Footer /> -->
    </footer>
</template>

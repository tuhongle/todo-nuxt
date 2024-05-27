<template>
    <main>
        <section class="project">
            <div class="container-fluid vh-100 p-4">
                <div class="row h-100">
                    <div class="col">
                        <div class="offcanvas offcanvas-start show bg-grey rounded-4 px-4 py-2 m-4" tabindex="-1" id="menu" aria-labelledby="menuLabel">
                            <Offcanvas />
                        </div>
                    </div>
                    <div class="col">
                        <slot />
                    </div>
                    <div class="col">
                        <div class="offcanvas offcanvas-end show bg-grey rounded-4 px-4 py-2 m-4" tabindex="-1" id="edit-task" aria-labelledby="edit-taskLabel">
                            <EditTask />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <footer>
        <!-- <Footer /> -->
    </footer>
</template>

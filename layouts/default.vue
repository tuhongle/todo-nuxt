<template>
    <main>
        <section class="project">
            <div class="container-fluid vh-100 p-4">
                <div class="row h-100">
                    <div class="col-3 bg-grey">
                        <Offcanvas />
                    </div>
                    <div class="col-9">
                        <slot />
                    </div>
                </div>
            </div>
        </section>
    </main>
    <footer>
        <!-- <Footer /> -->
    </footer>
</template>

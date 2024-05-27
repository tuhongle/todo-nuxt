<template>
    <div class="offcanvas-header">
        <h3 class="offcanvas-title fw-bold">Menu</h3>
        <button type="button" class="bg-transparent border-0" data-bs-dismiss="offcanvas">
            <font-awesome-icon class="h4 mb-0" icon="fa-solid fa-bars" />
        </button>
    </div>
    <div class="offcanvas-body">
        <div class="row py-2 px-3">
            <div class="input-group px-0 border border-1 rounded">
                <button class="btn border-0 input-group-text">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </button>
                <input type="text" class="form-control border-0 bg-transparent" placeholder="Search"></input>
            </div>
        </div>
        <div class="row py-2 border-bottom border-1">
            <h6 class="fw-bold">TASKS</h6>
            <ul class="tasks">
                <a class="text-reset text-decoration-none" href="">
                    <li class="d-flex upcoming py-2 align-items-center">
                        <font-awesome-icon class="fw-light me-3" icon="fa-solid fa-angles-right" />
                        <span>Upcoming</span>
                        <span class="badge text-bg-secondary ms-auto">12</span>
                    </li>
                </a>
                <a class="text-reset text-decoration-none" href="">
                    <li class="d-flex upcoming py-2 align-items-center">
                        <font-awesome-icon class="fw-light me-3" icon="fa-solid fa-list-check" />
                        <span>Today</span>
                        <span class="badge text-bg-secondary ms-auto">12</span>
                    </li>
                </a>
                <a class="text-reset text-decoration-none" href="">
                    <li class="d-flex upcoming py-2 align-items-center">
                        <font-awesome-icon class="fw-light me-3" icon="fa-solid fa-note-sticky" />
                        <span>Sticky Wall</span>
                        <span class="badge text-bg-secondary ms-auto">12</span>
                    </li>
                </a>
            </ul>
        </div>
        <div class="row py-2 border-bottom border-1">
            <h6 class="fw-bold">LISTS</h6>
            <ul class="lists">
                <a class="text-reset text-decoration-none" href="">
                    <li class="d-flex upcoming py-2 align-items-center">
                        <span class="list-box"></span>
                        <span>Personal</span>
                        <span class="badge text-bg-secondary ms-auto">12</span>
                    </li>
                </a>
                <a class="text-reset text-decoration-none" href="">
                    <li class="d-flex upcoming py-2 align-items-center">
                        <span class="list-box"></span>
                        <span>Work</span>
                        <span class="badge text-bg-secondary ms-auto">12</span>
                    </li>
                </a>
                <button class="btn btn-outline-none">
                    <font-awesome-icon class="fw-light me-3" icon="fa-solid fa-plus" />
                    <span>Add new list</span>
                </button>
            </ul>
            <div class="add-list p-3">
                <div class="input-group">
                    <!-- <input type="color"> -->
                    <input type="text" class="form-control bg-transparent" placeholder="List Name">
                </div>
                <div class="color-sample">
                    <div class="list-box"></div>
                </div>
            </div>
        </div>
        <div class="row py-2">
            <h6 class="fw-bold">TAGS</h6>
            <ul class="tags d-flex"> 
                <a class="text-reset text-decoration-none" href="">
                    <li class="d-flex upcoming py-2 align-items-center">
                        <span>Tag 1</span>
                    </li>
                </a>
                <a class="text-reset text-decoration-none" href="">
                    <li class="d-flex upcoming py-2 align-items-center">
                        <span>Tag 2</span>
                    </li>
                </a>
                <button class="btn btn-outline-none">
                    <font-awesome-icon class="fw-light me-3" icon="fa-solid fa-plus" />
                    <span>Add Tag</span>
                </button>
            </ul>
        </div>
    </div>
    <div class="offcanvas-footer">
        <button class="logout btn btn-outline-none">
            <font-awesome-icon class="me-3" icon="fa-solid fa-right-from-bracket" />
            <span>Sign Out</span>
        </button>
    </div>
</template>

<script setup lang="ts">

</script>
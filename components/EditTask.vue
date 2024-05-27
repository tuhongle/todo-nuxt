<template>
    <div class="offcanvas-header">
        <h5 class="offcanvas-title fw-bold">Task:</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <input type="text" class="form-control bg-transparent mb-3">
        <textarea class="form-control bg-transparent mb-3" placeholder="Description" rows="5"></textarea>
        <div class="list d-flex align-items-center mb-3">
            <span class="me-5 fw-medium">List</span>
            <select class="form-select bg-transparent">
                <option value=""selected>Personal</option>
                <option value="">Work</option>
            </select>
        </div>
        <div class="date d-flex align-items-center mb-3">
            <span class="me-5 fw-medium text-nowrap">Due date</span>
            <input type="date" class="form-control bg-transparent">
        </div>
        <div class="tags d-flex align-items-center mb-5">
            <span class="me-5 fw-medium text-nowrap">Tags</span>
            <ul class="tag-items list-unstyled d-flex align-items-center mb-0">
                <li class="tag-item me-3 bg-success py-2 px-3 rounded fw-bold">Tag 1</li>
                <button class="btn btn-outline-none">
                    <font-awesome-icon class="fw-light me-2" icon="fa-solid fa-plus" />
                    <span class="fw-bold">Add Tag</span>
                </button>
            </ul>
        </div>
        <h5 class="fw-bold">Subtasks:</h5>
        <div class="addsubtasks d-flex align-items-center px-3 mb-3 border-bottom border-1">
            <font-awesome-icon class="fw-light me-2" icon="fa-solid fa-plus" />
            <input type="text" class="form-control bg-transparent border-0" placeholder="Add New Subtask">
        </div>
        <ul class="subtasks-list list-unstyled px-3">
            <li class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    Default checkbox
                </label>
            </li>
            <li class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                <label class="form-check-label" for="flexCheckChecked">
                    Checked checkbox
                </label>
            </li>
        </ul>
    </div>
    <div class="offcanvas-footer">
        <button type="button" class="btn btn-outline-secondary">Delete Task</button>
        <button type="button" class="btn btn-warning">Save Changes</button>
    </div>
</template>

<script setup lang="ts">

</script>
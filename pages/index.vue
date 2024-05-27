<template>
    <div class="row">
        <div class="col-7">Today</div>
        <div class="col-5">
            <div class="offcanvas offcanvas-end bg-grey show" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <EditTask />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import EditTask from '../components/EditTask.vue';

</script>

<style scoped>

</style>
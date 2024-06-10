<template>
  <section class="p-8 md:p-16 lg:p-32 flex place-content-center bg-green-300 h-screen w-screen">
    <div class="container bg-white p-8 lg:p-16 rounded-2xl shadow-xl">
      <div class="flex items-center justify-between mb-8 md:mb-12">
        <h1 class="text-3xl font-extrabold text-nowrap">Todo App</h1>
        <img src="@/assets/img/todo.png" alt="" class="shrink rounded-full w-[36px] md:w-[64px]">
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4 md:mb-8">
        <UButton color="primary" size="lg" class="flex-col md:flex-row place-content-center">
          <span class="text-xs font-bold max-md:mb-2">TOTAL:</span>
          <UBadge color="gray" label="3" :ui="{ rounded: 'rounded-full'}" />
        </UButton>
        <UButton color="green" size="lg" class="flex-col md:flex-row place-content-center">
          <span class="text-xs font-bold max-md:mb-2">SUCCESS:</span>
          <UBadge color="gray" label="3" :ui="{ rounded: 'rounded-full'}" />
        </UButton>
        <UButton color="orange" size="lg" class="flex-col md:flex-row place-content-center">
          <span class="text-xs font-bold max-md:mb-2">PENDING:</span>
          <UBadge color="gray" label="3" :ui="{ rounded: 'rounded-full' }" />
        </UButton>
      </div>
      <UButtonGroup orientation="horizontal" class="w-full flex justify-between pb-2 shadow-none border-b-2 border-b-cyan-200 mb-4 md:mb-6">
        <UInput placeholder="Enter New To-Do" size="md" variant="none" class="w-full" />
        <UButton color="gray" variant="ghost" icon="i-heroicons-arrow-right" class="hover:cursor-pointer" />
      </UButtonGroup>
      <div class="space-y-4 md:space-y-8">
        <SingleTodo />
      </div>
      <UButton label="Clear All" size="xl" color="sky" variant="ghost" class="font-semibold">
        <template #trailing>
          <UIcon name="i-heroicons-trash" />
        </template>
      </UButton>
    </div>
  </section>
</template>

<template>
  <div class="flex justify-center max-w-2xl mx-auto">
    <div class="sm:p-2">
      <div
        class="items-center p-2 text-sm leading-none text-pink-500 bg-white shadow  rounded-xl sm:inline-flex sm:rounded-full text-teal"
      >
        <span
          class="inline-flex items-center justify-center h-6 px-3 text-white bg-pink-500 rounded-full "
        >
          {{ title }}
        </span>
        <span class="inline-flex px-2 my-3 sm:my-0">
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "text"],
};
</script>
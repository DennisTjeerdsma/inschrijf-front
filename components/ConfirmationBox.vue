<template>
  <div class="fixed bg-smoke-300 w-screen flex items-center justify-center h-screen z-10 overflow-auto inset-0 top-0">
    <div class="flex w-56 justify-center bg-white rounded h-40">
      Test
      <div class="flex">
        <delete-button />
      </div>
    </div>
  </div>
</template>

<script>
import DeleteButton from '~/components/DeleteButton.vue'

export default {
  components: {
    DeleteButton
  }
}
</script>

<style>

</style>

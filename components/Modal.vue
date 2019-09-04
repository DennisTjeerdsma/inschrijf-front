<template>
  <transition name="page">
    <div
      v-if="value"
      class="fixed z-40 inset-0 bg-smoke-300 overflow-auto fade top-0"
      @click.self="close()"
    >
      <div
        class="relative p-8 bg-white w-full max-w-md mx-auto mt-40 flex-col rounded flex shadow fade border-t-8 border-primary-300 top-0"
      >
        <fa
          icon="times"
          class="cursor-pointer absolute top-0 right-0 text-2xl fa-x m-3 text-neutral-500"
          @click="close()"
        />
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.$emit('input', false)
    }
  }
}
</script>

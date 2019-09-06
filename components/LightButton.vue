<template>
  <button
    :type="buttontype"
    class="p-2 bg-primary-400 text-white hover:bg-primary-200 rounded-lg block inline-block"
  >
    <slot>Val</slot>
  </button>
</template>

<script>
export default {
  props: {
    buttontype: {
      type: String,
      default: () => 'submit'
    }
  }
}
</script>

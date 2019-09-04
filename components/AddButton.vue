<template>
  <div
    class="block border inline-block shadow bg-white text-neutral-500 p-2 pl-8 relative cursor-pointer hover:text-primary-400 hover:border hover:border-primary-400 rounded-lg text-lg"
    @click="$emit('addEvent')"
  >
    <fa :icon="icon" class="absolute left-0  m-1" />
    <slot class="absolute pl-4">
      Default
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: () => 'futbol'
    }
  }
}
</script>

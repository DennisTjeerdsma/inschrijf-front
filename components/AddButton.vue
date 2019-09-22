<template>
  <div
    class="border inline-block lg:w-auto shadow bg-white text-neutral-500 p-4 w-full text-center pl-8 relative cursor-pointer hover:text-primary-400 hover:border hover:border-primary-400 rounded-lg text-lg"
    @click="$emit('addEvent')"
  >
    <fa :icon="icon" class=" lg:absolute lg:left-0  lg:m-1" />
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

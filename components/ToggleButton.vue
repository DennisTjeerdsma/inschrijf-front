<template>
  <div class>
    <transition name="fade">
      <div
        :class="{'bg-green-300': !!value}"
        :value="value"
        class="p-2 w-full bg-fade text-center bg-red-300 shadow rounded-lg text-white tacking-wide cursor-pointer"
        @click="toggle"
      >
        <p>{{ !!value ? onText : offText }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    offText: {
      type: String,
      default: () => 'Off'
    },
    onText: {
      type: String,
      default: () => 'On'
    },
    value: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    toggle () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style>
.bg-fade {
  transition: background-color 0.5s;
}
</style>

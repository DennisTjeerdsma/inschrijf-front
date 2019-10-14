<template>
  <div class="relative" :class="{ 'text-red text-sm': !!errors[name] }">
    <div class="h-4 pl-2 mt-3">
      <div v-if="errors[name]" class>
        {{ errors[name][0] }}
      </div>
    </div>
    <button
      class="relative flex items-center block inline-block shadow bg-white w-full shadow text-grey-dark p-2 px-8 relative cursor-pointer hover:text-primary hover:bg-grey-lightest rounded"
      :class="{ 'pl-8': icon, 'border-red border': !!errors[name] }"
      type="button"
      @click="open = !open"
    >
      <fa :icon="icon" class="m-2" />
      <p class="text-grey-darker hover:text-primary">
        {{ value || placeholder }}
      </p>
      <div
        class="pointer-events-none absolute pin-t pin-r flex items-center p-2 text-grey-darker"
      />
    </button>
    <div v-if="open" class="mt-px text-center w-full text-grey-darker leading-normal rounded text-sm shadow absolute bg-white w-full z-10 cursor-pointer">
      <div v-for="item in selectorArray" :key="item.name" class="cursor-pointer">
        <p class="hover:bg-primary-200 hover:text-primary pl-4 mr-2 cursor-pointer w-full py-2" @click="callback(item)">
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectorArray: {
      type: Array,
      default: () => null
    },
    value: {
      type: String,
      default: () => null
    },
    icon: {
      type: String,
      default: () => null
    },
    placeholder: {
      type: String,
      default: () => 'Default'
    },
    name: {
      type: String,
      default: () => 'Default'
    }
  },
  data: () => ({
    open: false
  }),
  methods: {
    callback (item) {
      this.$emit('input', item)
      this.open = false
    }
  }
}
</script>

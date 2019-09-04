<template>
  <div :class="{ 'text-red text-sm ': !!errors[name] }" class>
    <div class="h-5 pl-2 text-red-400">
      <div v-if="errors[name]" class>
        {{ errors[name][0] }}
      </div>
    </div>
    <div class="relative">
      <fa v-if="icon" :icon="icon" class="absolute left-0 m-3 text-grey-400" />
      <input
        class="p-2 appearance-none shadow bg-neutral-100 focus:bg-neutral-300 w-full hover:bg-neutral-300 rounded leading-tight text-black"
        :type="typeComputed"
        :value="value"
        :placeholder="placeholder"
        :class="{ 'pl-8': icon, 'border-red-300 border': !!errors[name] }"
        @input="e => $emit('input', e.target.value)"
      >
      <div
        id="select"
        placeholder="select"
        class="absolute top-0 right-0 hover:text-neutral-400 text-grey-dark cursor-pointer"
        @click="showPassword = !showPassword"
      >
        <fa
          v-if="type === 'password'"
          :icon="showPassword ? 'eye' : 'eye-slash'"
          :class="{ 'text-grey-dark': showPassword }"
          class="m-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: () => ''
    },
    icon: {
      type: String,
      default: () => null
    },
    type: {
      type: String,
      default: () => 'text'
    },
    placeholder: {
      type: String,
      default: () => 'Placeholder'
    },
    name: {
      type: String,
      default: () => null
    }
  },
  data: () => ({
    showPassword: false
  }),
  computed: {
    typeComputed () {
      if (this.type === 'password' && this.showPassword) { return 'text' }
      return this.type
    }
  }
}
</script>

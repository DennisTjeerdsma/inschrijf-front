<template>
  <div
    class="text-neutral-500 font-bold rounded-r hover:bg-primary-400 hover:text-white border-transparent hover:shadow cursor-pointer p-4 relative pl-6 fade text-lg"
    :class="{
      'text-primary-300 border-primary-300 border-l-4 cursor-not-allowed': active
    }"
    @click="navigate"
  >
    <fa :icon="icon" class="absolute top-0 m-1" />
    <p class="absolute pl-6 pl-2 top-0">
      {{ name }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: () => 'Test'
    },
    icon: {
      type: String,
      default: () => 'futbol'
    },
    link: {
      type: String,
      default: () => '/dashboard'
    },
    exact: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    active () {
      if (this.exact) {
        return this.$route.path === this.link
      }
      return this.$route.path.includes(this.link)
    }
  },
  methods: {
    navigate () {
      if (!this.active) {
        this.$router.push(this.link)
      }
    }
  }
}
</script>

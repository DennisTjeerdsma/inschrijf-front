<template>
  <div class="bg-neutral-100 w-screen h-screen flex items-center justify-center">
    <fa
      icon="futbol"
      class="text-4xl text-neutral-500 m-2"
    />
    <p class="text-neutral-500 text-4xl font-bold">
      Vakgericht
    </p>
  </div>
</template>

<script>
export default {
  auth: false,
  mounted () {
    this.$router.push('/dashboard')
  }
}
</script>

<style>

</style>

<template>
  <div />
</template>

<script>
export default {
  mounted () {
    this.$auth.logout({
    })
      .then(response => {
        console.log('succes')
      }
      )
  }
}

</script>

<style>

</style>

<template>
  <div>
    <div v-if="message" class="w-full rounded bg-green-200 border border-2 border-green-500 text-green-500 text-center p-2 mb-4">
      {{ message }}
    </div>
    <div v-if="error" class="w-full rounded bg-red-200 border border-2 border-red-500 text-red-500 text-center p-2 mb-4">
      {{ error }}
    </div>
    <div class="bg-white rounded px-4 py-4 mx-auto shadow w-84 justify-center border-t-4 border-primary-400">
      <form action="POST" method="post" autocomplete="off" @submit.prevent="requestResetPassword">
        <div class="form-group">
          <p class="text-xl text-primary-300 font-bold pt-2 text-center">
            Reset Password
          </p>
          <input-field
            id="email"
            v-model="email"
            icon="envelope"
            name="email"
            type="email"
            placeholder="example@example.com"
            class="text-black"
          />
          <div class="flex justify-center">
            <light-button buttontype="submit" class="mt-6 w-full">
              Send Reset Link
            </light-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InputField from '~/components/InputField.vue'
import LightButton from '~/components/LightButton.vue'
export default {
  components: {
    InputField,
    LightButton
  },
  data () {
    return {
      email: null,
      message: null,
      error: null
    }
  },
  methods: {
    async requestResetPassword () {
      this.error = null
      await this.$axios.post('api/auth/reset-password', {
        email: this.email
      })
        .then(result => {
          this.response = result.data
          this.message = result.data.message
        })
        .catch(e => {
          if (e.response.status !== 422) {
            this.error = e.response.data.message
          }
        })
    }
  }

}
</script>

<style>

</style>

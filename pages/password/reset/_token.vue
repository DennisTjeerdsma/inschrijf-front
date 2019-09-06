<template>
  <div>
    <div v-if="message" class="w-full rounded bg-red-200 border border-2 border-red-500 text-red-500 text-center p-2 mb-4">
      {{ message }}
    </div>
    <form action="submit" method="post" autocomplete="off" @submit.prevent="submitPasswordReset">
      <div class="w-84 py-4 bg-white shadow border-t-4 border-primary-400 px-4">
        <p class="text-2xl font-bold text-primary-300 text-center">
          Reset Password
        </p>
        <input-field
          id="email"
          v-model="email"
          type="email"
          icon="envelope"
          placeholder="example@example.com"
          required
        />
        <input-field
          id="password"
          v-model="password"
          type="password"
          name="password"
          icon="key"
          placeholder="Password"
          required
        />
        <input-field
          id="password_confirmation"
          v-model="password_confirmation"
          type="password"
          name="password"
          icon="key"
          placeholder="Confirm Password"
          required
        />
        <light-button class="mt-6 w-full">
          Reset Password
        </light-button>
      </div>
    </form>
  </div>
</template>

<script>
import LightButton from '~/components/LightButton.vue'
import InputField from '~/components/InputField.vue'

export default {
  components: {
    LightButton,
    InputField
  },
  data () {
    return {
      token: null,
      email: null,
      password: null,
      password_confirmation: null,
      message: null

    }
  },
  methods: {
    async submitPasswordReset () {
      await this.$axios.post('api/auth/reset/password/', {
        token: this.$route.params.token,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
        .then(result => {
          this.$router.push('/login')
        })
        .catch(e => {
        })
    }
  }

}
</script>

<style>

</style>

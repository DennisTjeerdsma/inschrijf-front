<template>
  <div class="bg-neutral-200 font-sans antialiased h-screen">
    <div class="flex justify-center items-center min-h-full">
      <div class="w-64 mx-auto my-auto">
        <div class="text-center items-center justify-center flex mb-4">
          <p class="text-neutral-400 font-bold text-4xl mb-2 p-2">
            Vakgericht
          </p>
          <fa icon="futbol" class="text-neutral-400 fa-2x" />
        </div>

        <div
          class="w-full shadow bg-white rounded-lg mx-auto my-auto pt-4 border-t-4 border-primary-200"
        >
          <p class="text-center text-primary-300 text-2xl mb-4 font-bold">
            Sign In
          </p>
          <form type="submit" @submit.prevent="authenticate">
            <input-field
              v-model="email"
              icon="envelope"
              name="email"
              type="email"
              placeholder="example@example.com"
              class="mx-4 mb-4"
              required
            />
            <input-field
              v-model="password"
              icon="key"
              type="password"
              name="password"
              placeholder="Password"
              class="mx-4 mb-4"
              required
            />
            <div class="flex justify-center">
              <nuxt-link
                class="text-primary-200 hover:text-primary-400 mb-4"
                to="/password"
              >
                Forgot Password?
              </nuxt-link>
            </div>
            <div class="flex justify-center">
              <light-button
                class="mx-4 px-4 mb-4 text-center w-full"
                buttontype="submit"
              >
                Login
              </light-button>
            </div>
          </form>
        </div>
      </div>
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
      password: null,
      passwordFieldType: 'password',
      icon: 'eye-slash'
    }
  },
  auth: false,
  methods: {
    async authenticate () {
      await this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(response => {
          this.$router.push('/dashboard')
        })
        .catch(e => {
        })
    },
    switchVisibility () {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password'
      this.icon = this.icon === 'eye-slash' ? 'eye' : 'eye-slash'
    }
  }
}
</script>

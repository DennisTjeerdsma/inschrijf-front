<template>
  <div class="lg:flex pl-6">
    <div class="pt-4">
      <h1 class="text-primary-400 font-bold text-2xl underline">
        {{ name }}
      </h1>
      <p class="text-lg pt-4">
        {{ email }}
      </p>
      <p class="text-lg pt-4">
        Role: {{ role }}
      </p>
    </div>
    <div class="items-center">
      <image-upload v-model="image" class="pt-4">
        <div slot="activator" class>
          <div
            v-if="!image"
            class="rounded-lg shadow bg-neutral-200 hover:bg-neutral-300 flex-wrap flex text-neutral-400 content-center cursor-pointer h-48 w-48 justify-center"
          >
            <span>
              <fa icon="camera" class="fa-3x" />
            </span>
          </div>
          <img
            v-if="image"
            :src="image.imageURL"
            class="rounded-lg shadow cursor-pointer h-48 w-48"
          >
        </div>
      </image-upload>
      <light-button
        class="font-bold px-6 mx-auto w-4/5"
        @click.native="saveAvatar()"
      >
        Submit
      </light-button>
    </div>
  </div>
</template>

<script>
import ImageUpload from '~/components/ImageUpload.vue'
import LightButton from '~/components/LightButton.vue'
import { upload } from '~/plugins/upload.js'

export default {
  components: {
    ImageUpload,
    LightButton
  },
  data () {
    return {
      name: null,
      email: null,
      role: null,
      image: null,
      savedImage: false,
      tempImage: null
    }
  },
  computed: {
    isSaved () {
      return this.savedImage === false
    }
  },
  mounted () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.$axios.get(`api/user/${this.$route.params.id}`)
        .then(response => {
          this.name = response.data.name
          this.email = response.data.email
          this.role = response.data.role
        })
    },
    async saveAvatar () {
      if (this.isSaved && this.image) {
        await upload(this.image.formData).then(response => {
          this.tempImage = response.data.image
          this.savedImage = true
        })
      }
    }
  }
}
</script>

<style>

</style>

<template>
  <div>
    <div @click="launchFilePicker()">
      <slot name="activator" />
    </div>
    <input
      ref="file"
      type="file"
      :name="uploadFieldName"
      style="display:none"
      @change="onFileChange($event.target.name, $event.target.files)"
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ImageInput',
  props: {
    value: {}
  },
  data () {
    return {
      uploadFieldName: 'file',
      maxSize: 1024
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser'
    })
  },
  methods: {
    launchFilePicker () {
      this.$refs.file.click()
    },
    onFileChange (fieldName, file) {
      const { maxSize } = this
      const imageFile = file[0]

      if (file.length > 0) {
        const size = imageFile.size / maxSize / maxSize
        if (!imageFile.type.match('image.*')) {
          console.log('error1')
        } else if (size > 1) {
          console.log('error2')
        } else {
          const formData = new FormData()
          const imageURL = URL.createObjectURL(imageFile)
          formData.append(fieldName, imageFile)
          formData.append('username', this.loggedInUser.username)
          this.$emit('input', { formData, imageURL })
        }
      }
    }
  }
}
</script>

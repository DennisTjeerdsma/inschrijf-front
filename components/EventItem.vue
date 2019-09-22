<template>
  <div>
    <div class="rounded flex relative block items-center cursor-pointer rounded shadow-xl h-32 font-bold text-neutral-500 border border-neutral-100  ursor-pointer justify-between lg:px-4" @click.self="pushRoute">
      <div class="flex items-center overflow-auto">
        <fa
          icon="dot-circle"
          class="text-4xl m-2 text-primary-200"
        />
        <span
          class="text-xl overflow-auto"
        >
          {{ name }}
        </span>
      </div>
      <span v-if="!!enroll" class="p-4 hidden md:block">
        Participants: {{ participants }}/{{ maxparticipants }}
      </span>
      <span class="p-4 hidden md:block">
        Start: {{ start | formatDate }}
      </span>
      <span class="p-4 hidden lg:block">
        Location: {{ location }}
      </span>
      <div class="flex right-0 pr-4 items-center">
        <div v-if="!!enroll">
          <toggle-button :value="!!enrolled" off-text="Enroll" on-text="Enroll" class="mx-2" @click.native="$emit('setEnroll')" />
        </div>
        <div @click="$emit('editEvent')">
          <fa
            icon="edit"
            class="text-2xl mx-2 my-4 text-neutral-400 font-bold hover:text-primary-200 cursor-pointer hidden lg:block"
          />
        </div>
        <div @click="$emit('deleteEvent')">
          <fa
            icon="trash"
            class="text-2xl mx-2 my-4 text-neutral-400 font-bold hover:text-red-400 cursor-pointer hidden lg:block"
          />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import ToggleButton from '~/components/ToggleButton.vue'

export default {
  components: {
    ToggleButton
  },
  props: {
    name: {
      type: String,
      default: () => 'Default'

    },
    participants: {
      type: Number,
      default: () => 0
    },
    start: {
      type: String,
      default: () => '-'
    },
    location: {
      type: String,
      default: () => '-'
    },
    enroll: {
      type: Number,
      default: () => 0
    },
    enrolled: {
      type: Number,
      default: () => 0
    },
    maxparticipants: {
      type: Number,
      default: () => 0
    },
    id: {
      type: Number,
      default: () => null
    }
  },
  methods: {
    pushRoute () {
      this.$router.push(`dashboard/event/${this.id}`)
    }
  }
}
</script>

<style>

</style>

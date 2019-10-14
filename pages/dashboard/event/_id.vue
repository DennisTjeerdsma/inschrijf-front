<template>
  <div>
    <!----------------------- Top Bar --------------------------->
    <div class="shadow-b relative pt-4 items-center content-center lg:content-left lg:justify-between lg:pt-16 pb-4 px-4 lg:pl-10 shadow border-neutral-200 lg:flex w-full lg:w-auto  mx-auto" />
    <div class="lg:pl-10 pt-4 lg:pt-12 text-left px-8 lg:flex w-full lg:justify-between text-lg">
      <div>
        <h1 class="text-3xl font-bold underline text-primary-500 lg:w-1/2">
          {{ title }}
        </h1>
        <p class="text-normal text-black font-normal pt-4 text-lg">
          Held at: {{ location }}
        </p>
        <p class="text-normal text-black font-normal pt-4 text-lg">
          Starts at: {{ starttime | formatDate }}
        </p>
        <p v-if="!!enroll" class="text-normal text-black font-normal pt-4 text-lg">
          Enrollment ends: {{ enrolltime | formatDate }}
        </p>
        <toggle-button
          v-if="!!enroll"
          :value="!!enrolled"
          on-text="enroll"
          off-text="enroll"
          class="pt-4 px-4 lg:px-0"
          @click.native="setEnroll"
        />
      </div>
      <div v-if="!!enroll" class="lg:w-1/2 border-t-2 border-neutral-400 mt-4 lg:border-0">
        <h1 class="text-2xl pt-4 lg:pt-0 font-bold text-primary-400">
          Participants {{ countParticipants }}/{{ maxParticipantsComputed }}
          <transition-group name="list-complete" tag="p" class="pl-4">
            <li v-for="participant in sortedParticipants" :key="participant.id" class="text-lg text-black font-normal list-complete-item">
              {{ participant.name }}
            </li>
          </transition-group>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import ToggleButton from '~/components/ToggleButton.vue'

export default {
  components: {
    ToggleButton
  },
  data () {
    return {
      id: null,
      title: null,
      location: null,
      enroll: false,
      enrolled: null,
      participants: null,
      maxparticipants: null,
      starttime: null,
      enrolltime: null,
      countParticipants: null
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser'
    }),
    sortedParticipants () {
      if (this.participants) {
        const data = this.participants
        return _.orderBy(data, 'name', 'asc')
      }
      return []
    },
    maxParticipantsComputed () {
      if (this.maxparticipants === 0) {
        return '~'
      }
      return this.maxparticipants
    }

  },
  mounted () {
    this.fetchEvent()
  },
  methods: {
    ...mapActions({
      participate: 'events/participate'
    }),
    setEnroll () {
      const payload = {
        event: {
          id: this.id,
          title: this.this,
          location: this.location,
          enroll: this.enroll,
          enrolled: this.enrolled,
          participants: this.participants,
          starttime: this.starttime,
          enrolltime: this.enrolltime
        },
        userId: this.loggedInUser.id

      }
      this.participate(payload).then(() => (
        this.fetchEvent()
      ))
    },
    fetchEvent () {
      this.$axios.get(`api/event/${this.$route.params.id}`)
        .then(response => {
          this.id = response.data.id
          this.title = response.data.title
          this.location = response.data.location
          this.enroll = response.data.enroll
          this.enrolled = response.data.enrolled
          this.participants = response.data.participants
          this.maxparticipants = response.data.maxparticipants
          this.starttime = response.data.starttime
          this.enrolltime = response.data.enrolltime
          this.countParticipants = response.data.countParticipants
        })
    }
  }
}

</script>

<style>
</style>

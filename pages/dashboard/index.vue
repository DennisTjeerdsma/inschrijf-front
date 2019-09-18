<template>
  <div>
    <!---------------- Top Bar -------------------->
    <div class="shadow-b pt-16 pb-4 flex justify-between pl-10 shadow border-neutral-200">
      <add-button icon="plus-circle" @addEvent="openModal">
        Add Event
      </add-button>
    </div>
    <!----------------Main list ------------------->
    <transition-group name="list-complete" tag="p">
      <div v-for="item in sortedEvents" :key="item.id" class="pt-6 px-10 list-complete-item">
        <event-item
          :name="item.title"
          :start="item.starttime"
          :enroll="item.enroll"
          :location="item.location"
          :enrolled="item.enrolled"
          :participants="item.participants"
          @setEnroll="setEnroll(item)"
          @deleteEvent="deleteEvent(item)"
          @editEvent="editEvent(item)"
        />
      </div>
    </transition-group>
    <!---------------Modal---------------------->
    <modal v-model="open" class="w-full h-full">
      <form>
        <div class="flex">
          <p class="text-xl text-primary-400 font-bold mx-auto">
            Add Event
          </p>
        </div>
        <div class="pb-2">
          <p class="text-primary-200 pl-2">
            Event Title
          </p>
          <input-field v-model="title" name="title" placeholder="Borrel" />
        </div>
        <div class="pb-2">
          <p class="text-primary-200 pl-2">
            Event Location
          </p>
          <input-field v-model="location" name="location" placeholder="Proeflokaal Belgie" />
        </div>
        <div>
          <p class="text-primary-200 pl-2">
            Start Time
          </p>
          <div class="h-5 pl-2 text-red-400 text-sm">
            <div v-if="errors['starttime']">
              {{ errors['starttime'][0] }}
            </div>
          </div>
          <datetime
            v-model="starttime"
            value-zone="Europe/Amsterdam"
            zone="Europe/Amsterdam"
            type="datetime"
            class="border rounded bg-neutral-100 shadow pl-4 text-black py-1 pb-2"
            :class="{'border border-red-300': !!errors['starttime']}"
            placeholder="Input Date & Time"
          />
          <toggle-button v-model="enroll" on-text="Enrollment?" off-text="Enrollment?" class="pt-4" />
          <div v-if="!!enroll">
            <p class="text-primary-200 pt-2 pl-2">
              Enrollment End time
            </p>
            <div class="h-5 pl-2 text-red-400 text-sm">
              <div v-if="errors['enrolltime']">
                {{ errors['enrolltime'][0] }}
              </div>
            </div>
            <datetime
              v-model="enrolltime"
              type="datetime"
              value-zone="Europe/Amsterdam"
              zone="Europe/Amsterdam"
              class="border rounded bg-neutral-100 shadow pl-4 text-black py-1 pb-2"
              :class="{'border border-red-300': !!errors['enrolltime']}"
              placeholder="Input Date & Time"
            />
            <div class="pb-2 pt-2">
              <p class="text-primary-200 pl-2">
                Maximum Participants
              </p>
              <div class="h-5 pl-2 text-red-400 text-sm">
                <div v-if="errors['maxparticipants']">
                  {{ errors['maxparticipants'][0] }}
                </div>
              </div>
              <input
                v-model="maxparticipants"
                class="p-2 appearance-none shadow bg-neutral-100 focus:bg-neutral-300 w-full hover:bg-neutral-300 rounded leading-tight text-black"
                placeholder="Enter 0 for unlimited"
                :class="{'border-red-300 border': !!errors['maxparticipants'] }"
              >
            </div>
          </div>
          <div class="pt-2">
            <light-button v-if="!editing" class="w-full" buttontype="button" @click.native="onSubmit">
              Submit
            </light-button>
            <light-button v-if="editing" class="w-full" buttontype="button" @click.native="editSubmit">
              Submit
            </light-button>
          </div>
        </div>
      </form>
    </modal>
    <modal class="w-full">
      <p class="text-neutral-500 text-lg font-sans antialiased">
        This action will permanently delete the Event
        Are you sure you wish the proceed?
      </p>
    </modal>
  </div>
</template>

<script>
import { Datetime } from 'vue-datetime'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import AddButton from '~/components/AddButton.vue'
import Modal from '~/components/Modal.vue'
import InputField from '~/components/InputField.vue'
import EventItem from '~/components/EventItem.vue'
import ToggleButton from '~/components/ToggleButton.vue'
import LightButton from '~/components/LightButton.vue'

export default {
  components: {
    AddButton,
    Modal,
    InputField,
    Datetime,
    ToggleButton,
    LightButton,
    EventItem
  },
  data: () => ({
    open: false,
    starttime: null,
    title: null,
    location: null,
    enroll: 0,
    enrolltime: null,
    maxparticipants: null,
    tempEnrolled: false,
    deletemodal: false,
    editing: false,
    id: null
  }),
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      events: 'events/list',
      roles: 'roles/list'
    }),
    sortedEvents () {
      return this.events.slice().sort((a, b) => {
        return new Date(a.starttime) - new Date(b.starttime)
      })
    }
  },
  mounted () {
    this.load_events(this.loggedInUser)
    this.load_roles()
  },
  methods: {
    ...mapActions({
      load_events: 'events/load',
      participate: 'events/participate',
      remove: 'events/delete',
      addEvent: 'events/add',
      edit: 'events/edit',
      load_roles: 'roles/load'
    }),
    deleteEvent (event) {
      if (confirm('This will permanently delete this entry, are you sure you wish to proceed?')) { this.remove(event) }
    },
    setEnroll (event) {
      const payload = {
        event,
        userId: this.loggedInUser.id

      }
      this.participate(payload)
    },
    openModal () {
      this.open = !this.open
    },
    editEvent (event) {
      this.id = event.id
      this.title = event.title
      this.location = event.location
      this.enroll = !!event.enroll
      this.starttime = this.convertDateTime(event.starttime)
      this.enrolltime = this.convertDateTime(event.enrolltime)
      this.maxparticipants = event.maxparticipants
      this.openModal()
      this.editing = true
    },
    editSubmit () {
      const payload = {
        id: this.id,
        title: this.title,
        location: this.location,
        starttime: this.starttime,
        enrolltime: this.enrolltime,
        enroll: this.enroll,
        maxparticipants: this.maxparticipants
      }
      this.edit(payload).then(() => {
        this.clearFields()
        this.openModal()
        this.editing = false
        this.id = null
      })
    },
    onSubmit () {
      const payload = {
        title: this.title,
        location: this.location,
        starttime: this.starttime,
        enrolltime: this.enrolltime,
        enroll: this.enroll,
        maxparticipants: this.maxparticipants
      }
      this.addEvent(payload).then(() => {
        this.clearFields()
        this.openModal()
      })
    },
    clearFields () {
      this.title = null
      this.location = null
      this.enroll = 0
      this.starttime = null
      this.enrolltime = null
      this.maxparticipants = 0
    },
    convertDateTime (date) {
      return moment(date).toISOString()
    }
  }
}
</script>

<style>
.vdatetime-input {
  background: #f3f3f4;
  border-radius: 50px;
  }
</style>

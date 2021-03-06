<template>
  <div>
    <div v-if="hasPermission" class="">
      <!----------------------- Top Bar --------------------------->
      <div class="shadow-b relative pt-16 pb-4 flex pl-10 shadow border-neutral-200 flex w-full justify-between">
        <add-button icon="plus-circle" @addEvent="openModal">
          Create User
        </add-button>
        <div>
          <div class="pr-16 flex right-0 items-center">
            <div v-if="selected" class="text-lg text-primary-400 font-bold">
              {{ selected }} Selected
            </div>
            <fa icon="trash" class="m-3 hover:text-red-400 cursor-pointer text-neutral-500 text-2xl" @click="multiDelete" />
          </div>
        </div>
      </div>
      <!----------------------- Sorting column ------------------->
      <div class="px-6 pt-4">
        <user-item
          :top="true"
          :sort="sort"
          :order="order"
          @nameOrder="nameOrder"
          @roleOrder="roleOrder"
          @emailOrder="emailOrder"
        />
        <!-----------------------User list Rendering---------------->
        <transition-group name="list-complete" tag="p">
          <div v-for="user in sortedUsers" :key="user.id" class="list-complete-item">
            <user-item
              v-model="user.checked"
              :username="user.name"
              :role="user.role"
              :email="user.email"
              @selectItem="selectItem(user.id)"
              @deleteUser="deleteUser(user.id)"
            />
          </div>
        </transition-group>
      </div>
    </div>
    <div v-else>
      <p>You do not have permission to view this page</p>
    </div>
    <modal v-model="open">
      <form type="post">
        <div>
          <p class="text-lg text-primary-300">
            Full Name
          </p>
          <input-field v-model="name" name="name" placeholder="Bert Blaauw" />
        </div>
        <div>
          <p class="text-lg text-primary-300 pt-2">
            Email Adress
          </p>
          <input-field v-model="email" name="name" type="email" placeholder="example@example.com" />
        </div>
        <light-button buttontype="button" class="w-full mt-6" @click.native="createUser">
          Submit
        </light-button>
      </form>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import UserItem from '~/components/UserItem.vue'
import AddButton from '~/components/AddButton.vue'
import Modal from '~/components/Modal.vue'
import InputField from '~/components/InputField.vue'
import LightButton from '~/components/LightButton.vue'

export default {
  components: {
    UserItem,
    AddButton,
    Modal,
    InputField,
    LightButton
  },
  data () {
    return {
      checked: [],
      open: false,
      name: null,
      email: null,
      sort: 'name',
      order: 'asc'
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      users: 'users/list',
      roles: 'roles/list'
    }),
    hasPermission () {
      return (this.loggedInUser && this.loggedInUser.role === 'Super Admin') || (this.loggedInUser && this.loggedInUser.role === 'Bestuur')
    },
    selected () {
      return this.checked.length
    },
    sortedUsers () {
      if (this.users) {
        const data = this.users
        if (this.order && this.sort) {
          return _.orderBy(data, [this.sort], [this.order])
        }
      }
      return []
    }
  },
  mounted () {
    this.load_roles()
    this.load_users()
  },
  methods: {
    ...mapActions({
      load_users: 'users/load',
      load_roles: 'roles/load',
      delete_users: 'users/delete',
      multi_delete_users: 'users/multiDelete',
      create_user: 'users/create'
    }),
    selectItem (userId) {
      const index = this.checked.map(i => i).indexOf(userId)
      if (index === -1) {
        this.checked.push(userId)
      } else {
        this.checked.splice(index, 1)
      }
    },
    deleteUser (userId) {
      if (confirm('This will permanently delete this user, are you sure you wish to proceed?')) {
        this.delete_users(userId)
      }
    },
    multiDelete () {
      if (confirm('This will permanently delete the selected users, are you sure you with to proceed?')) {
        this.multi_delete_users(this.checked)
        this.checked = []
      }
    },
    openModal () {
      this.open = !this.open
    },

    createUser () {
      const payload = {
        name: this.name,
        email: this.email
      }
      this.create_user(payload)
      this.email = null
      this.name = null
      this.open = false
    },
    nameOrder () {
      this.sort = 'name'

      if (this.order === 'asc') {
        this.order = 'desc'
      } else if (this.order === 'desc') {
        this.order = 'asc'
      } else {
        this.order = 'asc'
      }
    },
    roleOrder () {
      this.sort = 'role'
      if (this.order === 'asc') {
        this.order = 'desc'
      } else if (this.order === 'desc') {
        this.order = 'asc'
      } else {
        this.order = 'asc'
      }
    },
    emailOrder () {
      this.sort = 'email'
      if (this.order === 'asc') {
        this.order = 'desc'
      } else if (this.order === 'desc') {
        this.order = 'asc'
      } else {
        this.order = 'asc'
      }
    }
  }
}
</script>

<style>

</style>

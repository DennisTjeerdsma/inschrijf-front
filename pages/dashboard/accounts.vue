<template>
  <div>
    <div v-if="hasPermission" class="">
      <!----------------------- Top Bar --------------------------->
      <div class="shadow-b pt-16 pb-4 flex pl-10 shadow border-neutral-200">
        <add-button icon="plus-circle" @addEvent="openModal">
          Create User
        </add-button>
        <div class="pr-12">
          <fa icon="trash" class="m-3 r-0 absolute right-0 hover:text-red-400 cursor-pointer text-neutral-500 text-xl items-center top-0" @click="multiDelete" />
        </div>
      </div>
      <!----------------------- Sorting column ------------------->
      <div class="mx-6 pt-4">
        <user-item :top="true" />
        <!-----------------------User list Rendering---------------->
        <transition-group name="list-complete" tag="p">
          <div v-for="user in users" :key="user.id" class="list-complete-item">
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
      fap
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserItem from '~/components/UserItem.vue'
import AddButton from '~/components/AddButton.vue'
import Modal from '~/components/Modal.vue'

export default {
  components: {
    UserItem,
    AddButton,
    Modal
  },
  data () {
    return {
      checked: [],
      open: false
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
      multi_delete_users: 'users/multiDelete'
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
    }

  }
}
</script>

<style>

</style>

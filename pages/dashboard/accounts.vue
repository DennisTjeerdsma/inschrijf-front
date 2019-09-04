<template>
  <div>
    <div v-if="hasPermission" class="">
      <div class="shadow-b pt-16 pb-4 flex pl-10 shadow border-neutral-200" />
      <delete-button />
      <!----------------------- Sorting column ------------------->
      <div class="mx-6 pt-4 w-4/5">
        <user-item :top="true" />
        <!-----------------------User list Rendering---------------->
        <transition-group class="" tag="p">
          <div v-for="user in users" :key="user.id" class="">
            <user-item v-model="user.checked" :username="user.username" :role="user.roles" :email="user.email" @toggleChecked="toggleChecked(user)" />
          </div>
        </transition-group>
      </div>
      <confirmation-box />
    </div>
    <div v-else>
      <p>You do not have permission to view this page</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import UserItem from '~/components/UserItem.vue'
import ConfirmationBox from '~/components/ConfirmationBox.vue'

export default {
  components: {
    UserItem,
    ConfirmationBox
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      users: 'users/list'
    }),
    hasPermission () {
      return (this.loggedInUser && this.loggedInUser.roles === 'admin') || (this.loggedInUser && this.loggedInUser.roles === 'bestuur')
    }
  },
  mounted () {
    this.load_users()
  },
  methods: {
    ...mapActions({
      load_users: 'users/load'
    }),
    toggleChecked (user) {
      Vue.set(user, 'checked', true)
    }
  }
}
</script>

<style>

</style>

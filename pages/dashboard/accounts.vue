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
            <user-item v-model="user.checked" :username="user.name" :role="user.role" :email="user.email" @selectItem="selectItem(item.id)" />
          </div>
        </transition-group>
      </div>
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

export default {
  components: {
    UserItem
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
      load_roles: 'roles/load'
    }),
    toggleChecked (user) {
      Vue.set(user, 'checked', true)
    }
  }
}
</script>

<style>

</style>

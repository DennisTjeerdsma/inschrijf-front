<template>
  <div class="h-screen w-screen">
    <!--------------Navbar ------------------------>
    <nav class="flex sticky h-20 lg:justify-start justify-center items-center bg-gunmetal-100">
      <fa
        icon="futbol"
        class="text-4xl text-white mx-2"
      />
      <span class="text-white text-2xl mx-2">
        Vakgericht Inschrijfsysteem
      </span>
    </nav>
    <div class="bg-grey-100 flex-row lg:flex items-stretch h-full shadow">
      <!-------------- Menu----------------------->
      <div name="menu" class="lg:w-48 bg-neutral-100 md:shadow lg:pt-16 w-screen">
        <div class="block rounded h-12 text-center p-3 mx-auto lg:hidden lg:h-20">
          <button class="w-full" @click="toggle">
            <fa icon="bars" class="text-2xl text-neutral-500 font-bold" />
          </button>
        </div>
        <div :class="open ? 'block': 'hidden'" class="w-full lg:block lg:items-center lg:w-auto">
          <div v-for="item in linkarray" :key="item.name" class="pt-2 md:pt-6">
            <menu-item
              :exact="item.exact"
              :name="item.name"
              :icon="item.icon"
              :link="item.link"
            />
          </div>
          <div class="mx-6 border-t-2 mt-6 bt-6 border-neutral-400" />
          <div v-for="item in adminarray" :key="item.name" class="pt-6">
            <menu-item :exact="item.exact" :name="item.name" :icon="item.icon" :link="item.link" />
          </div>
        </div>
      </div>
      <!----------------Content -------------------->
      <div class="flex-1">
        <nuxt class="py-2" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuItem from '~/components/MenuItem.vue'

export default {
  auth: true,
  components: {
    MenuItem
  },
  data: () => ({
    linkarray: [
      {
        name: 'Dashboard',
        link: '/dashboard',
        icon: 'tachometer-alt',
        exact: true
      },
      { name: 'Profile', link: '/dashboard/profile/', icon: 'user' },
      {
        name: 'Logout',
        link: '/logout',
        icon: 'sign-out-alt'
      }
    ],
    adminarray: [
      {
        name: 'Accounts',
        link: '/dashboard/accounts'
      }
    ],
    open: false
  }),
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser'
    })
  },
  methods: {
    toggle () {
      console.log()
      this.open = !this.open
    }
  }
}
</script>

<style>

</style>

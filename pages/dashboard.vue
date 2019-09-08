<template>
  <div class="relative h-screen w-screen overflow-auto">
    <!--------------Navbar ------------------------>
    <nav class="flex sticky h-20 items-center bg-gunmetal-100">
      <fa
        icon="futbol"
        class="text-4xl text-white mx-2"
      />
      <span class="text-white text-2xl mx-2">
        Vakgericht Inschrijfsysteem
      </span>
    </nav>
    <div class="bg-grey-100 flex items-stretch h-full shadow overflow-auto">
      <!-------------- Menu----------------------->
      <div name="menu" class="md:w-48 bg-neutral-100 md:shadow md:pt-16">
        <div v-for="item in linkarray" :key="item.name" class="pt-6">
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
      <!----------------Content -------------------->
      <div class="flex-1">
        <nuxt class="py-2" />
      </div>
    </div>
  </div>
</template>

<script>
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
      { name: 'Profile', link: '/dashboard/profile', icon: 'user' },
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
    ]
  })
}
</script>

<style>

</style>

<template>
  <div class="flex items-center relative justify-center bg-white text-lg lg:justify-between text-neutral-500 font-bold pl-6 p-1 px-4 w-full" :class="{'text-primary-500 border-b-2 border-primary-100': top, 'bg-neutral-100': checked}">
    <div class="flex px-4 lg:w-1/6 w-full">
      <input v-if="!top" type="checkbox" @change="selectItem">
      <span>{{ username }}</span>
      <fa v-if="username == 'Name'" :icon=" sort == 'name' && order == 'asc' ? 'chevron-up' : 'chevron-down'" class="m-2 cursor-pointer" @click="$emit('nameOrder')" />
    </div>
    <div class="flex px-4 w-1/6 lg:block hidden">
      <span> {{ role }} </span>
      <fa v-if="role == 'Role'" :icon=" sort == 'role' && order == 'asc' ? 'chevron-up' : 'chevron-down'" class="m-2 cursor-pointer" @click="$emit('roleOrder')" />
    </div>
    <div class="flex px-4 w-1/6 hidden lg:block">
      <span>{{ email }}</span>
      <fa v-if="email == 'Email'" :icon=" sort == 'email' && order == 'asc' ? 'chevron-up' : 'chevron-down'" class="m-2 cursor-pointer" @click="$emit('emailOrder')" />
    </div>
    <div class="flex lg:pr-4 " :class="{'invisible': top}">
      <fa icon="edit" class="m-2 hover:text-primary-300 cursor-pointer" @click="$emit('editUser')" />
      <fa icon="trash" class="m-2 hover:text-red-400 cursor-pointer" @click="$emit('deleteUser')" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: () => 'Name'
    },
    role: {
      type: String,
      default: () => 'Role'
    },
    email: {
      type: String,
      default: () => 'Email'
    },
    top: {
      type: Boolean,
      default: () => false
    },
    sort: {
      type: String,
      default: () => 'name'
    },
    order: {
      type: String,
      default: () => 'asc'
    }
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    selectItem () {
      this.checked = !this.checked
      this.$emit('selectItem')
    }
  }
}
</script>

<style>

</style>

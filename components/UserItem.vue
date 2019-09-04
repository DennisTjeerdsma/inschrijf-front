<template>
  <div class="flex items-center relative items-center justify-between rounded bg-white text-lg text-neutral-500 font-bold pl-6 p-1 px-4" :class="{'text-primary-500 border-b-2 border-primary-100': top}">
    <div class="flex px-4 w-1/6">
      <span>{{ username }}</span>
      <fa v-if="username == 'username'" icon="chevron-down" class="m-2" />
    </div>
    <div class="flex px-4 w-1/6">
      <span> {{ role }} </span>
      <fa v-if="role == 'role'" icon="chevron-down" class="m-2" />
    </div>
    <div class="flex px-4 w-1/6">
      <span>{{ email }}</span>
      <fa v-if="email == 'email'" icon="chevron-down" class="m-2" />
    </div>
    <div class="flex right-0 pr-4 " :class="{'invisible': top}">
      <fa icon="edit" class="m-2 hover:text-primary-300 cursor-pointer" @editUser="$emit('editUser')" />
      <fa icon="trash" class="m-2 hover:text-red-400 cursor-pointer" @deleteUser="$emit('deleteUser')" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: () => 'username'
    },
    role: {
      type: String,
      default: () => 'role'
    },
    email: {
      type: String,
      default: () => 'email'
    },
    top: {
      type: Boolean,
      default: () => false
    },
    checked: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style>

</style>

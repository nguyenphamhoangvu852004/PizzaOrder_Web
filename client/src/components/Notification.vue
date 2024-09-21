<template>
  <transition name="fade">
    <div v-if="isVisible" class="notification is-success">
      <button class="delete" @click="$emit('close')"></button>
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
defineProps({
  message: String,
  isVisible: Boolean,
});

defineEmits(["close"]);
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

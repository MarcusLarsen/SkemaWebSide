<script setup>
import LoginItem from '../components/LoginItem.vue'
</script>

<template>
  <main class="center-container">
    <LoginItem />
  </main>
</template>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}
</style>
<template>
  <main>
    <div class="container">
      <AccountsPage />
    </div>
  </main>
</template>

<script setup lang="ts">
import AccountsPage from './pages/AccountsPage.vue';
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  padding: 50px;
}
</style>

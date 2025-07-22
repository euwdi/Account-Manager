<template>
  <main>
    <div class="container">
      <AccountsPage />
    </div>
  </main>
</template>

<script setup lang="ts">
  import AccountsPage from './pages/AccountsPage.vue'
</script>

<style lang="scss" scoped>
  main {
    display: flex;
    justify-content: center;
    .container {
      width: 100%;
      max-width: 1200px;
      padding: 50px;

      display: flex;
    }
  }
</style>

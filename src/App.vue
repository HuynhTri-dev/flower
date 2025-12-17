<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// Router-based navigation - no need for local admin state here
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');

:root {
  --pink-50: #fff6fb;
  --pink-75: #ffeaf5;
  --pink-100: #ffe1f0;
  --pink-200: #ffd3e6;
  --pink-300: #fdbed6;
  --pink-400: #f37aa1;
  --pink-500: #f36da1;
  --pink-600: #ec4d8b;
  --pink-700: #d63675;
  --pink-800: #c02267;
  --peach-500: #ff9466;
  font-family: 'Be Vietnam Pro', 'Poppins', Arial, sans-serif;
}

body {
  margin: 0;
  background: linear-gradient(135deg, rgba(255, 231, 241, 0.8), rgba(255, 214, 232, 0.5));
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>

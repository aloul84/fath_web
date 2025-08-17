<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Decorative Background Elements -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="star">⭐</div>
      <div class="star">🌟</div>
      <div class="star">✨</div>
      <div class="star">💫</div>
      <div class="star">⭐</div>
    </div>

    <NavBar />
    <main class="relative z-10">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<template>
  <div class="kids-section-header  text-center mb-8">
    <h1
      class="text-4xl md:text-6xl py-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4">
      {{ title }}
    </h1>
    <p class="text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed">
      {{ subtitle }}
    </p>

    <!-- Interactive Decorative Elements -->
    <div class="mt-6 flex justify-center space-x-4">
      <div class="w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
      <div class="w-4 h-4 bg-pink-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
      <div class="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
      <div class="w-4 h-4 bg-green-400 rounded-full animate-bounce" style="animation-delay: 0.6s;"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: 'اكتشف عالمًا من المعلومات المثيرة!'
    }
  }
}
</script>

<style scoped>
.kids-section-header h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.kids-section-header p {
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}
</style>

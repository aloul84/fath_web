<template>
  <button
    :class="[
      'kids-btn',
      size === 'large' ? 'px-8 py-4 text-xl' :
      size === 'small' ? 'px-4 py-2 text-sm' :
      'px-6 py-3 text-lg',
      variant === 'secondary' ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
      variant === 'success' ? 'bg-gradient-to-r from-green-400 to-emerald-400' :
      variant === 'warning' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
      variant === 'danger' ? 'bg-gradient-to-r from-red-400 to-pink-500' :
      'bg-gradient-to-r from-pink-400 to-purple-400',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      fullWidth ? 'w-full' : ''
    ]"
    :disabled="disabled"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <!-- Icon -->
    <span v-if="icon" class="mr-2 text-xl">{{ icon }}</span>

    <!-- Content -->
    <span class="relative z-10">
      <slot>{{ text }}</slot>
    </span>

    <!-- Ripple Effect -->
    <div
      v-if="showRipple"
      class="ripple-effect"
      :style="rippleStyle"
    ></div>

    <!-- Sparkle Effect -->
    <div v-if="showSparkle" class="sparkle-container">
      <span class="sparkle">✨</span>
      <span class="sparkle">⭐</span>
      <span class="sparkle">💫</span>
    </div>
  </button>
</template>

<script>
export default {
  name: 'KidsButton',
  props: {
    text: {
      type: String,
      default: 'زر'
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    withRipple: {
      type: Boolean,
      default: true
    },
    withSparkle: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showRipple: false,
      rippleStyle: {},
      showSparkle: false
    }
  },

  methods: {
    handleClick(event) {
      if (this.disabled) return

      this.$emit('click', event)

      // Add click sound effect (optional)
      this.playClickSound()
    },

    handleMouseEnter() {
      if (this.disabled) return

      this.$emit('mouseenter')

      if (this.withSparkle) {
        this.showSparkle = true
        setTimeout(() => {
          this.showSparkle = false
        }, 1000)
      }
    },

    handleMouseLeave() {
      this.$emit('mouseleave')
      this.showSparkle = false
    },

    handleMouseDown(event) {
      if (this.disabled) return

      this.$emit('mousedown', event)

      if (this.withRipple) {
        this.createRipple(event)
      }
    },

    handleMouseUp() {
      this.$emit('mouseup')
    },

    createRipple(event) {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      this.rippleStyle = {
        width: size + 'px',
        height: size + 'px',
        left: x + 'px',
        top: y + 'px'
      }

      this.showRipple = true

      setTimeout(() => {
        this.showRipple = false
      }, 600)
    },

    playClickSound() {
      // Optional: Add click sound effect
      // You can implement actual sound playing here
      console.log('Click sound!')
    }
  }
}
</script>

<style scoped>
.kids-btn {
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  font-family: 'Comic Neue', cursive;
}

.kids-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.kids-btn:hover::before {
  left: 100%;
}

.kids-btn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.kids-btn:active:not(:disabled) {
  transform: translateY(-1px) scale(1.02);
}

/* Ripple Effect */
.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* Sparkle Effect */
.sparkle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  font-size: 16px;
  animation: sparkle 1s ease-out forwards;
}

.sparkle:nth-child(1) {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.sparkle:nth-child(2) {
  top: 30%;
  right: 20%;
  animation-delay: 0.2s;
}

.sparkle:nth-child(3) {
  bottom: 20%;
  left: 50%;
  animation-delay: 0.4s;
}

@keyframes sparkle {
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: scale(0) rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .kids-btn {
    font-size: 16px;
    padding: 12px 20px;
  }
}
</style>

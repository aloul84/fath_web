<template>
  <div
    :class="[
      'kids-card',
      `kids-card-${variant}`,
      hoverable ? 'hoverable' : '',
      clickable ? 'clickable' : '',
      fullWidth ? 'w-full' : '',
      size === 'large' ? 'p-8' :
      size === 'small' ? 'p-4' : 'p-6'
    ]"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Decorative Corner Elements -->
    <div v-if="showDecorations" class="decorative-elements">
      <div class="corner-element top-left">✨</div>
      <div class="corner-element top-right">🌟</div>
      <div class="corner-element bottom-left">💫</div>
      <div class="corner-element bottom-right">⭐</div>
    </div>

    <!-- Header Section -->
    <div v-if="$slots.header || title" class="card-header mb-4">
      <slot name="header">
        <div class="flex items-center space-x-3">
          <div v-if="icon" class="text-4xl">{{ icon }}</div>
          <h3 v-if="title" class="text-2xl font-bold text-gray-800 font-['Fredoka_One']">
            {{ title }}
          </h3>
        </div>
      </slot>
    </div>

    <!-- Content Section -->
    <div class="card-content">
      <slot></slot>
    </div>

    <!-- Footer Section -->
    <div v-if="$slots.footer" class="card-footer mt-6 pt-4 border-t-2 border-pink-200">
      <slot name="footer"></slot>
    </div>

    <!-- Interactive Overlay -->
    <div v-if="hoverable" class="interactive-overlay"></div>

    <!-- Floating Particles -->
    <div v-if="showParticles" class="floating-particles">
      <div class="particle" v-for="i in 5" :key="i" :style="getParticleStyle(i)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KidsCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    clickable: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    showDecorations: {
      type: Boolean,
      default: true
    },
    showParticles: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isHovered: false
    }
  },

  methods: {
    handleClick(event) {
      if (this.clickable) {
        this.$emit('click', event)
      }
    },

    handleMouseEnter() {
      this.isHovered = true
      this.$emit('mouseenter')
    },

    handleMouseLeave() {
      this.isHovered = false
      this.$emit('mouseleave')
    },

    getParticleStyle(index) {
      const delay = index * 0.2
      const duration = 3 + index * 0.5
      return {
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }
    }
  }
}
</script>

<style scoped>
.kids-card {
  position: relative;
  background: linear-gradient(135deg, #fff 0%, #f8f9ff 100%);
  border: 3px solid #ff6b6b;
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.2);
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;
}

/* Variant Styles */
.kids-card-primary {
  border-color: #4ecdc4;
  box-shadow: 0 15px 35px rgba(78, 205, 196, 0.2);
}

.kids-card-secondary {
  border-color: #a8e6cf;
  box-shadow: 0 15px 35px rgba(168, 230, 207, 0.2);
}

.kids-card-success {
  border-color: #4caf50;
  box-shadow: 0 15px 35px rgba(76, 175, 80, 0.2);
}

.kids-card-warning {
  border-color: #ff9800;
  box-shadow: 0 15px 35px rgba(255, 152, 0, 0.2);
}

.kids-card-danger {
  border-color: #f44336;
  box-shadow: 0 15px 35px rgba(244, 67, 54, 0.2);
}

/* Hoverable Cards */
.kids-card.hoverable:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(255, 107, 107, 0.3);
}

.kids-card.hoverable:hover.kids-card-primary {
  box-shadow: 0 25px 50px rgba(78, 205, 196, 0.3);
}

.kids-card.hoverable:hover.kids-card-secondary {
  box-shadow: 0 25px 50px rgba(168, 230, 207, 0.3);
}

.kids-card.hoverable:hover.kids-card-success {
  box-shadow: 0 25px 50px rgba(76, 175, 80, 0.3);
}

.kids-card.hoverable:hover.kids-card-warning {
  box-shadow: 0 25px 50px rgba(255, 152, 0, 0.3);
}

.kids-card.hoverable:hover.kids-card-danger {
  box-shadow: 0 25px 50px rgba(244, 67, 54, 0.3);
}

/* Clickable Cards */
.kids-card.clickable {
  cursor: pointer;
}

.kids-card.clickable:active {
  transform: translateY(-5px) scale(0.98);
}

/* Decorative Elements */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.corner-element {
  position: absolute;
  font-size: 20px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.corner-element.top-left {
  top: 10px;
  left: 10px;
}

.corner-element.top-right {
  top: 10px;
  right: 10px;
}

.corner-element.bottom-left {
  bottom: 10px;
  left: 10px;
}

.corner-element.bottom-right {
  bottom: 10px;
  right: 10px;
}

.kids-card:hover .corner-element {
  opacity: 1;
  transform: scale(1.2) rotate(10deg);
}

/* Interactive Overlay */
.interactive-overlay {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(45deg);
  transition: all 0.6s;
  opacity: 0;
}

.kids-card:hover .interactive-overlay {
  opacity: 1;
  left: 100%;
}

/* Floating Particles */
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
  animation: float-particle 3s ease-in-out infinite;
}

.particle:nth-child(1) { top: 20%; left: 10%; }
.particle:nth-child(2) { top: 60%; left: 80%; }
.particle:nth-child(3) { top: 80%; left: 20%; }
.particle:nth-child(4) { top: 30%; left: 70%; }
.particle:nth-child(5) { top: 70%; left: 40%; }

@keyframes float-particle {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

/* Card Header */
.card-header {
  position: relative;
  z-index: 2;
}

/* Card Content */
.card-content {
  position: relative;
  z-index: 2;
}

/* Card Footer */
.card-footer {
  position: relative;
  z-index: 2;
}

/* Responsive Design */
@media (max-width: 768px) {
  .kids-card {
    padding: 20px;
  }

  .corner-element {
    font-size: 16px;
  }

  .particle {
    width: 4px;
    height: 4px;
  }
}

/* Animation for new cards */
.kids-card {
  animation: cardEntrance 0.6s ease-out forwards;
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>

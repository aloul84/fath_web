<template>
  <div class="celestial-card-container" @click="$emit('click', celestial)">
    <!-- Cosmic Background -->
    <div class="cosmic-bg">
      <div class="stars-layer"></div>
      <div class="nebula-layer"></div>
      <div class="cosmic-dust"></div>
    </div>

    <!-- Floating Space Elements -->
    <div class="space-elements">
      <div class="meteor">☄️</div>
      <div class="satellite">🛰️</div>
      <div class="comet">💫</div>
    </div>

    <!-- Main Content -->
    <div class="celestial-content">
      <!-- Celestial Icon with Space Effects -->
      <div class="celestial-icon-wrapper">
        <div class="orbit-ring"></div>
        <div class="icon-halo"></div>
        <div class="celestial-emoji" :class="getCelestialClass(celestial.name)">
          {{ getCelestialEmoji(celestial.name) }}
        </div>
        <div class="orbiting-particles">
          <div class="particle" v-for="i in 6" :key="i" :style="getParticleStyle(i)"></div>
        </div>
      </div>

      <!-- Celestial Name with Space Text Effect -->
      <h3 class="celestial-name space-text">
        {{ celestial.name }}
      </h3>

      <!-- Celestial Information -->
      <div class="celestial-info">
        <div class="info-card type-card">
          <div class="info-icon">🌌</div>
          <div class="info-content">
            <span class="info-label">النوع</span>
            <span class="info-value">{{ celestial.type || 'غير محدد' }}</span>
          </div>
        </div>

        <div class="info-card distance-card">
          <div class="info-icon">📏</div>
          <div class="info-content">
            <span class="info-label">المسافة</span>
            <span class="info-value">{{ celestial.distance || 'غير محدد' }}</span>
          </div>
        </div>

        <div class="info-card size-card">
          <div class="info-icon">🔭</div>
          <div class="info-content">
            <span class="info-label">الحجم</span>
            <span class="info-value">{{ celestial.notes || 'غير محدد' }}</span>
          </div>
        </div>
      </div>

      <!-- Explore Button -->
      <button class="explore-space-btn" @click.stop>
        <span class="btn-text">استكشف الفضاء!</span>
        <span class="btn-icon">🚀</span>
        <div class="btn-trail"></div>
      </button>
    </div>

    <!-- Corner Space Decorations -->
    <div class="space-decorations">
      <div class="corner-planet">🪐</div>
      <div class="corner-ufo">🛸</div>
    </div>

    <!-- Interactive Space Effects -->
    <div class="space-effects">
      <div class="energy-wave"></div>
      <div class="cosmic-rays"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    celestial: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCelestialEmoji(name) {
      const emojiMap = {
        'Sun': '☀️',
        'Moon': '🌙',
        'Earth': '🌍',
        'Mars': '🔴',
        'Jupiter': '🪐',
        'Saturn': '🪐',
        'Star': '⭐',
        'Galaxy': '🌌',
        'Nebula': '💫',
        'Black Hole': '⚫',
        'Comet': '☄️',
        'Asteroid': '☄️',
        'default': '⭐'
      };

      return emojiMap[name] || emojiMap.default;
    },

    getCelestialClass(name) {
      const classMap = {
        'Sun': 'sun-class',
        'Moon': 'moon-class',
        'Earth': 'earth-class',
        'Mars': 'mars-class',
        'Jupiter': 'jupiter-class',
        'Saturn': 'saturn-class',
        'Star': 'star-class',
        'Galaxy': 'galaxy-class',
        'Nebula': 'nebula-class',
        'Black Hole': 'blackhole-class',
        'Comet': 'comet-class',
        'Asteroid': 'asteroid-class',
        'default': 'default-class'
      };

      return classMap[name] || classMap.default;
    },

    getParticleStyle(index) {
      const delay = index * 0.5;
      const duration = 4 + index * 0.5;
      return {
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      };
    }
  }
}
</script>

<style scoped>
.celestial-card-container {
  position: relative;
  background: linear-gradient(135deg, #0c1445 0%, #1a1a2e 50%, #16213e 100%);
  border: 4px solid transparent;
  border-radius: 30px;
  padding: 30px;
  margin: 20px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 0 30px rgba(138, 43, 226, 0.3);
}

.celestial-card-container:hover {
  transform: translateY(-15px) scale(1.05) rotate(-1deg);
  border-color: #8a2be2;
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.7),
    0 0 0 3px rgba(138, 43, 226, 0.5) inset,
    0 0 50px rgba(138, 43, 226, 0.5);
}

/* Cosmic Background */
.cosmic-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.stars-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(2px 2px at 20px 30px, #fff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(2px 2px at 160px 30px, #fff, transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: twinkle-stars 4s ease-in-out infinite;
}

.nebula-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(255, 20, 147, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(0, 191, 255, 0.3) 0%, transparent 50%);
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.cosmic-dust {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(1px 1px at 50px 50px, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 100px 100px, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 150px 150px, rgba(255, 255, 255, 0.5), transparent);
  animation: float-dust 8s ease-in-out infinite;
}

@keyframes twinkle-stars {

  0%,
  100% {
    opacity: 0.8;
  }

  50% {
    opacity: 1;
  }
}

@keyframes float-dust {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* Space Elements */
.space-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.meteor,
.satellite,
.comet {
  position: absolute;
  font-size: 18px;
  animation: space-float 8s ease-in-out infinite;
}

.meteor {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.satellite {
  top: 60%;
  right: 20%;
  animation-delay: 3s;
}

.comet {
  bottom: 30%;
  left: 25%;
  animation-delay: 6s;
}

@keyframes space-float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }

  25% {
    transform: translateY(-20px) rotate(90deg) scale(1.1);
  }

  50% {
    transform: translateY(-15px) rotate(180deg) scale(0.9);
  }

  75% {
    transform: translateY(-25px) rotate(270deg) scale(1.2);
  }
}

/* Main Content */
.celestial-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

/* Celestial Icon Wrapper */
.celestial-icon-wrapper {
  position: relative;
  margin-bottom: 25px;
}

.orbit-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  border: 2px dashed rgba(138, 43, 226, 0.6);
  border-radius: 50%;
  animation: orbit-rotate 10s linear infinite;
}

.icon-halo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(138, 43, 226, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse-halo 3s ease-in-out infinite;
}

.celestial-emoji {
  position: relative;
  font-size: 80px;
  margin: 0 auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
  transition: all 0.3s ease;
}

.celestial-card-container:hover .celestial-emoji {
  transform: scale(1.1) rotate(-5deg);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.7));
}

.orbiting-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: linear-gradient(45deg, #8a2be2, #ff1493);
  border-radius: 50%;
  animation: orbit-particle 4s linear infinite;
}

.particle:nth-child(1) {
  top: 10%;
  left: 50%;
}

.particle:nth-child(2) {
  top: 50%;
  right: 10%;
}

.particle:nth-child(3) {
  bottom: 10%;
  left: 50%;
}

.particle:nth-child(4) {
  top: 50%;
  left: 10%;
}

.particle:nth-child(5) {
  top: 20%;
  left: 20%;
}

.particle:nth-child(6) {
  bottom: 20%;
  right: 20%;
}

@keyframes orbit-rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes pulse-halo {

  0%,
  100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes orbit-particle {
  from {
    transform: rotate(0deg) translateX(60px) rotate(0deg);
  }

  to {
    transform: rotate(360deg) translateX(60px) rotate(-360deg);
  }
}

/* Celestial Name */
.celestial-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
  font-family: 'Fredoka One', cursive;
  background: linear-gradient(45deg, #8a2be2, #ff1493, #00bfff, #32cd32, #ffd700);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: space-rainbow 4s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
}

@keyframes space-rainbow {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* Celestial Information */
.celestial-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.info-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateX(10px) scale(1.02);
  border-color: #8a2be2;
  background: rgba(255, 255, 255, 0.2);
}

.type-card {
  border-left: 4px solid #8a2be2;
}

.distance-card {
  border-left: 4px solid #ff1493;
}

.size-card {
  border-left: 4px solid #00bfff;
}

.info-icon {
  font-size: 24px;
  margin-right: 15px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.info-content {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.info-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  margin-bottom: 2px;
}

.info-value {
  font-size: 16px;
  color: #fff;
  font-weight: bold;
}

/* Explore Button */
.explore-space-btn {
  position: relative;
  background: linear-gradient(135deg, #8a2be2 0%, #ff1493 100%);
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(138, 43, 226, 0.4);
}

.explore-space-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(138, 43, 226, 0.6);
}

.btn-text {
  margin-right: 10px;
}

.btn-icon {
  font-size: 20px;
  animation: rocket-launch 2s ease-in-out infinite;
}

@keyframes rocket-launch {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-8px) rotate(5deg);
  }
}

.btn-trail {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: all 0.6s ease;
}

.explore-space-btn:hover .btn-trail {
  left: 100%;
}

/* Space Decorations */
.space-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.corner-planet,
.corner-ufo {
  position: absolute;
  font-size: 24px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.corner-planet {
  top: 10px;
  left: 10px;
}

.corner-ufo {
  bottom: 10px;
  right: 10px;
}

.celestial-card-container:hover .corner-planet,
.celestial-card-container:hover .corner-ufo {
  opacity: 1;
  transform: scale(1.2) rotate(-15deg);
}

/* Space Effects */
.space-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.energy-wave {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(138, 43, 226, 0.2), transparent);
  transform: rotate(45deg);
  transition: all 1s ease;
  opacity: 0;
}

.celestial-card-container:hover .energy-wave {
  opacity: 1;
  left: 100%;
}

.cosmic-rays {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cosmic-rays::before,
.cosmic-rays::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #8a2be2, transparent);
  animation: cosmic-ray 3s ease-in-out infinite;
}

.cosmic-rays::before {
  left: 20%;
  animation-delay: 0s;
}

.cosmic-rays::after {
  right: 30%;
  animation-delay: 1.5s;
}

@keyframes cosmic-ray {

  0%,
  100% {
    opacity: 0;
    transform: scaleY(0);
  }

  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .celestial-card-container {
    padding: 20px;
    margin: 15px;
  }

  .celestial-emoji {
    font-size: 60px;
  }

  .celestial-name {
    font-size: 24px;
  }

  .info-card {
    padding: 12px;
  }

  .explore-space-btn {
    padding: 12px 24px;
    font-size: 16px;
  }
}

/* Special Celestial Classes */
.sun-class {
  filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5));
}

.moon-class {
  filter: drop-shadow(0 4px 8px rgba(192, 192, 192, 0.5));
}

.earth-class {
  filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.5));
}

.mars-class {
  filter: drop-shadow(0 4px 8px rgba(255, 69, 0, 0.5));
}

.jupiter-class {
  filter: drop-shadow(0 4px 8px rgba(255, 140, 0, 0.5));
}

.saturn-class {
  filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5));
}

.star-class {
  filter: drop-shadow(0 4px 8px rgba(255, 255, 0, 0.5));
}

.galaxy-class {
  filter: drop-shadow(0 4px 8px rgba(138, 43, 226, 0.5));
}

.nebula-class {
  filter: drop-shadow(0 4px 8px rgba(255, 20, 147, 0.5));
}

.blackhole-class {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8));
}

.comet-class {
  filter: drop-shadow(0 4px 8px rgba(255, 255, 255, 0.5));
}

.asteroid-class {
  filter: drop-shadow(0 4px 8px rgba(128, 128, 128, 0.5));
}
</style>

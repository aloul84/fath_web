<template>
  <div class="rivers-card-container" @click="$emit('click', river)">
    <!-- Water Background -->
    <div class="water-bg">
      <div class="water-waves"></div>
      <div class="water-bubbles"></div>
      <div class="water-flow"></div>
    </div>

    <!-- Floating Water Elements -->
    <div class="water-elements">
      <div class="fish">🐟</div>
      <div class="boat">🚣</div>
      <div class="water-drop">💧</div>
    </div>

    <!-- Main Content -->
    <div class="rivers-content">
      <!-- River Icon with Water Effects -->
      <div class="river-icon-wrapper">
        <div class="water-ripple"></div>
        <div class="river-emoji" :class="getRiverClass(river.type)">
          {{ getRiverEmoji(river.type) }}
        </div>
        <div class="water-sparkles">
          <span class="sparkle">💎</span>
          <span class="sparkle">✨</span>
        </div>
      </div>

      <!-- River Name with Water Text Effect -->
      <h3 class="river-name water-text">
        {{ river.name }}
      </h3>

      <!-- River Information -->
      <div class="river-info">
        <div class="info-card length-card">
          <div class="info-icon">📏</div>
          <div class="info-content">
            <span class="info-label">الطول</span>
            <span class="info-value">{{ river.length_km || 'غير محدد' }}</span>
          </div>
        </div>

        <div class="info-card source-card">
          <div class="info-icon">🏔️</div>
          <div class="info-content">
            <span class="info-label">المصدر</span>
            <span class="info-value">{{ river.mouth || 'غير محدد' }}</span>
          </div>
        </div>

        <div class="info-card source-card">
          <div class="info-icon">🌍</div>
          <div class="info-content">
            <span class="info-label">الدول</span>
            <div class="countries-wrap">
              <template v-if="river.countries">
                <span v-for="country in river.countries.split('،')" :key="country" class="country-badge">
                  {{ country.trim() }}
                </span>
              </template>
              <span v-else>غير محدد</span>
            </div>
          </div>
        </div>



        <div class="info-card flow-card">
          <div class="info-icon">🌊</div>
          <div class="info-content">
            <span class="info-label">ملاحظة</span>
            <span class="info-value">{{ river.notes || 'غير محدد' }}</span>
          </div>
        </div>
      </div>


    </div>

    <!-- Corner Water Decorations -->
    <div class="water-decorations">
      <div class="corner-shell">🐚</div>
      <div class="corner-pebble">🪨</div>
    </div>

    <!-- Interactive Water Effects -->
    <div class="water-effects">
      <div class="flow-wave"></div>
      <div class="current-rays"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    river: {
      type: Object,
      required: true
    }
  },
  methods: {
    getRiverEmoji(type) {
      const emojiMap = {
        'River': '🌊',
        'Stream': '💧',
        'Creek': '🏞️',
        'Brook': '🌿',
        'Tributary': '🔄',
        'Delta': '🌊',
        'Estuary': '🏖️',
        'Canal': '🚢',
        'Waterfall': '🌊',
        'Spring': '💦',
        'Lake': '🏞️',
        'Pond': '🐸',
        'default': '🌊'
      };

      return emojiMap[type] || emojiMap.default;
    },

    getRiverClass(type) {
      const classMap = {
        'River': 'river-class',
        'Stream': 'stream-class',
        'Creek': 'creek-class',
        'Brook': 'brook-class',
        'Tributary': 'tributary-class',
        'Delta': 'delta-class',
        'Estuary': 'estuary-class',
        'Canal': 'canal-class',
        'Waterfall': 'waterfall-class',
        'Spring': 'spring-class',
        'Lake': 'lake-class',
        'Pond': 'pond-class',
        'default': 'default-class'
      };

      return classMap[type] || classMap.default;
    }
  }
}
</script>

<style scoped>
.rivers-card-container {
  position: relative;
  background: linear-gradient(135deg, #00bfff 0%, #87ceeb 50%, #b0e0e6 100%);
  border: 4px solid transparent;
  border-radius: 30px;
  padding: 30px;
  margin: 20px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow:
    0 20px 40px rgba(0, 191, 255, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset,
    0 0 30px rgba(135, 206, 235, 0.3);
}

.rivers-card-container:hover {
  transform: translateY(-15px) scale(1.05) rotate(-1deg);
  border-color: #00bfff;
  box-shadow:
    0 30px 60px rgba(0, 191, 255, 0.5),
    0 0 0 3px rgba(0, 191, 255, 0.5) inset,
    0 0 50px rgba(0, 191, 255, 0.5);
}

.countries-wrap {
  display: flex;
  flex-wrap: wrap;
  /* يسمح بالانتقال لسطر جديد */
  gap: 8px;
  /* مسافة بين البادجات */
  margin-top: 4px;
}

.country-badge {
  display: inline-block;
  padding: 4px 12px;
  border: 1px solid #007BFF;
  /* اللون الأزرق للبوردير */
  border-radius: 20px;
  /* الشكل البيضاوي */
  /* لون خلفية فاتح */
  color: #ffffff;
  /* لون النص */
  font-size: 0.85rem;
  white-space: nowrap;
  /* لمنع كسر الكلمات داخل البادج */
}

/* Water Background */
.water-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.water-waves {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(45deg, transparent 49%, rgba(255, 255, 255, 0.3) 50%, transparent 51%),
    linear-gradient(-45deg, transparent 49%, rgba(255, 255, 255, 0.2) 50%, transparent 51%);
  background-size: 60px 60px;
  opacity: 0.4;
  animation: water-wave 4s linear infinite;
}

.water-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(2px 2px at 60px 80px, rgba(255, 255, 255, 0.5), transparent),
    radial-gradient(1px 1px at 100px 40px, rgba(255, 255, 255, 0.7), transparent),
    radial-gradient(1px 1px at 140px 90px, rgba(255, 255, 255, 0.4), transparent);
  animation: bubble-rise 6s ease-in-out infinite;
}

.water-flow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
  animation: water-flow-move 3s linear infinite;
}

@keyframes water-wave {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 60px 60px;
  }
}

@keyframes bubble-rise {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes water-flow-move {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

/* Water Elements */
.water-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.fish,
.boat,
.water-drop {
  position: absolute;
  font-size: 24px;
  animation: water-element-swim 7s ease-in-out infinite;
}

.fish {
  top: 25%;
  left: 20%;
  animation-delay: 0s;
}

.boat {
  top: 65%;
  right: 25%;
  animation-delay: 2.5s;
}

.water-drop {
  bottom: 30%;
  left: 30%;
  animation-delay: 5s;
}

@keyframes water-element-swim {

  0%,
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
  }

  25% {
    transform: translateY(-15px) translateX(10px) scale(1.1);
  }

  50% {
    transform: translateY(-10px) translateX(-5px) scale(0.9);
  }

  75% {
    transform: translateY(-20px) translateX(15px) scale(1.2);
  }
}

/* Main Content */
.rivers-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

/* River Icon Wrapper */
.river-icon-wrapper {
  position: relative;
  margin-bottom: 25px;
}

.water-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(0, 191, 255, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: water-ripple-pulse 3s ease-in-out infinite;
}

.river-emoji {
  position: relative;
  font-size: 80px;
  margin: 0 auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.rivers-card-container:hover .river-emoji {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
}

.water-sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  font-size: 18px;
  animation: water-sparkle 3s ease-in-out infinite;
}

.sparkle:nth-child(1) {
  top: 15%;
  left: 35%;
  animation-delay: 0s;
}

.sparkle:nth-child(2) {
  top: 20%;
  right: 40%;
  animation-delay: 1.5s;
}

@keyframes water-ripple-pulse {

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

@keyframes water-sparkle {

  0%,
  100% {
    opacity: 0.4;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

/* River Name */
.river-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
  font-family: 'Fredoka One', cursive;
  background: linear-gradient(45deg, #00bfff, #87ceeb, #4169e1, #00ced1, #20b2aa);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: water-rainbow 4s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(0, 191, 255, 0.5);
}

@keyframes water-rainbow {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* River Information */
.river-info {
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
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateX(10px) scale(1.02);
  border-color: #00bfff;
  background: rgba(255, 255, 255, 0.3);
}

.length-card {
  border-left: 4px solid #00bfff;
}

.source-card {
  border-left: 4px solid #87ceeb;
}

.flow-card {
  border-left: 4px solid #4169e1;
}

.info-icon {
  font-size: 24px;
  margin-right: 15px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.info-content {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.info-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  margin-bottom: 2px;
}

.info-value {
  font-size: 16px;
  color: #fff;
  font-weight: bold;
}

/* Explore Button */
.explore-river-btn {
  position: relative;
  background: linear-gradient(135deg, #00bfff 0%, #87ceeb 100%);
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 191, 255, 0.4);
}

.explore-river-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 191, 255, 0.6);
}

.btn-text {
  margin-right: 10px;
}

.btn-icon {
  font-size: 20px;
  animation: wave-bounce 2s ease-in-out infinite;
}

@keyframes wave-bounce {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-8px) rotate(10deg);
  }
}

.btn-water-trail {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: all 0.6s ease;
}

.explore-river-btn:hover .btn-water-trail {
  left: 100%;
}

/* Water Decorations */
.water-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.corner-shell,
.corner-pebble {
  position: absolute;
  font-size: 24px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.corner-shell {
  top: 10px;
  left: 10px;
}

.corner-pebble {
  bottom: 10px;
  right: 10px;
}

.rivers-card-container:hover .corner-shell,
.rivers-card-container:hover .corner-pebble {
  opacity: 1;
  transform: scale(1.2) rotate(-15deg);
}

/* Water Effects */
.water-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.flow-wave {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(0, 191, 255, 0.2), transparent);
  transform: rotate(45deg);
  transition: all 1s ease;
  opacity: 0;
}

.rivers-card-container:hover .flow-wave {
  opacity: 1;
  left: 100%;
}

.current-rays {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.current-rays::before,
.current-rays::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #00bfff, transparent);
  animation: current-ray 5s ease-in-out infinite;
}

.current-rays::before {
  left: 30%;
  animation-delay: 0s;
}

.current-rays::after {
  right: 40%;
  animation-delay: 2.5s;
}

@keyframes current-ray {

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
  .rivers-card-container {
    padding: 20px;
    margin: 15px;
  }

  .river-emoji {
    font-size: 60px;
  }

  .river-name {
    font-size: 24px;
  }

  .info-card {
    padding: 12px;
  }

  .explore-river-btn {
    padding: 12px 24px;
    font-size: 16px;
  }
}

/* Special River Classes */
.river-class {
  filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.5));
}

.stream-class {
  filter: drop-shadow(0 4px 8px rgba(135, 206, 235, 0.5));
}

.creek-class {
  filter: drop-shadow(0 4px 8px rgba(0, 128, 128, 0.5));
}

.brook-class {
  filter: drop-shadow(0 4px 8px rgba(32, 178, 170, 0.5));
}

.tributary-class {
  filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.5));
}

.delta-class {
  filter: drop-shadow(0 4px 8px rgba(0, 206, 209, 0.5));
}

.estuary-class {
  filter: drop-shadow(0 4px 8px rgba(32, 178, 170, 0.5));
}

.canal-class {
  filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.5));
}

.waterfall-class {
  filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.5));
}

.spring-class {
  filter: drop-shadow(0 4px 8px rgba(0, 206, 209, 0.5));
}

.lake-class {
  filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.5));
}

.pond-class {
  filter: drop-shadow(0 4px 8px rgba(0, 128, 128, 0.5));
}
</style>

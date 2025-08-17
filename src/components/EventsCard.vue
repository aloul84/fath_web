<template>
  <div class="events-card-container" @click="$emit('click', event)">
    <!-- Time Machine Background -->
    <div class="time-machine-bg">
      <div class="time-portal"></div>
      <div class="time-ripples"></div>
      <div class="chrono-particles"></div>
    </div>

    <!-- Floating Time Elements -->
    <div class="time-elements">
      <div class="clock">🕐</div>
      <div class="calendar">📅</div>
      <div class="hourglass">⏳</div>
    </div>

    <!-- Main Content -->
    <div class="events-content">
      <!-- Event Icon with Time Effects -->
      <div class="event-icon-wrapper">
        <div class="time-aura"></div>

        <div class="time-sparkles">
          <span class="sparkle">⚡</span>
          <span class="sparkle">💫</span>
        </div>
      </div>

      <!-- Event Name with Time Text Effect -->
      <h3 class="event-name time-text">
        {{ event.event_name }}
      </h3>

      <!-- Event Details -->
      <div class="event-details">
        <div class="detail-card date-card">
          <div class="detail-icon">📅</div>
          <div class="detail-content">
            <span class="detail-label">التاريخ</span>
            <span class="detail-value">{{ event.date || 'غير محدد' }}</span>
          </div>
        </div>

        <div class="detail-card location-card">
          <div class="detail-icon">📍</div>
          <div class="detail-content">
            <span class="detail-label">الموقع</span>
            <span class="detail-value">{{ event.location || 'غير محدد' }}</span>
          </div>
        </div>

        <div class="detail-card importance-card">
          <div class="detail-icon">📚</div>
          <div class="detail-content">
            <span class="detail-label">مرتبط ب</span>
            <span class="detail-value">{{ event.associated_with || 'غير محدد' }}</span>
          </div>
        </div>
        <div class="detail-card importance-card">
          <div class="detail-icon">⭐</div>
          <div class="detail-content">
            <span class="detail-label">الاهمية</span>
            <span class="detail-value">{{ event.significance || 'غير محدد' }}</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Corner Time Decorations -->
    <div class="time-decorations">
      <div class="corner-sundial">🕰️</div>
      <div class="corner-stopwatch">⏱️</div>
    </div>

    <!-- Interactive Time Effects -->
    <div class="time-effects">
      <div class="chrono-wave"></div>
      <div class="temporal-rays"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    getEventEmoji(type) {
      const emojiMap = {
        'War': '⚔️',
        'Peace': '🕊️',
        'Discovery': '🔍',
        'Invention': '💡',
        'Revolution': '🔥',
        'Independence': '🏛️',
        'Space': '🚀',
        'Medical': '🏥',
        'Sports': '⚽',
        'Cultural': '🎭',
        'Scientific': '🧬',
        'Political': '🗳️',
        'default': '📅'
      };

      return emojiMap[type] || emojiMap.default;
    },

    getEventClass(type) {
      const classMap = {
        'War': 'war-class',
        'Peace': 'peace-class',
        'Discovery': 'discovery-class',
        'Invention': 'invention-class',
        'Revolution': 'revolution-class',
        'Independence': 'independence-class',
        'Space': 'space-class',
        'Medical': 'medical-class',
        'Sports': 'sports-class',
        'Cultural': 'cultural-class',
        'Scientific': 'scientific-class',
        'Political': 'political-class',
        'default': 'default-class'
      };

      return classMap[type] || classMap.default;
    }
  }
}
</script>

<style scoped>
.events-card-container {
  position: relative;
  background: linear-gradient(135deg, #2c1810 0%, #4a1c1c 50%, #3d1f1f 100%);
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
    0 0 30px rgba(255, 140, 0, 0.3);
}

.events-card-container:hover {
  transform: translateY(-15px) scale(1.05) rotate(1deg);
  border-color: #ff8c00;
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.7),
    0 0 0 3px rgba(255, 140, 0, 0.5) inset,
    0 0 50px rgba(255, 140, 0, 0.5);
}

/* Time Machine Background */
.time-machine-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.time-portal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: conic-gradient(from 0deg, #ff8c00, #ff4500, #ff6347, #ff8c00);
  border-radius: 50%;
  opacity: 0.1;
  animation: time-portal-spin 8s linear infinite;
}

.time-ripples {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at center, transparent 0%, rgba(255, 140, 0, 0.1) 30%, transparent 70%),
    radial-gradient(circle at center, transparent 0%, rgba(255, 69, 0, 0.1) 50%, transparent 80%),
    radial-gradient(circle at center, transparent 0%, rgba(255, 105, 180, 0.1) 70%, transparent 90%);
  animation: time-ripple-pulse 4s ease-in-out infinite;
}

.chrono-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(1px 1px at 30px 30px, rgba(255, 140, 0, 0.6), transparent),
    radial-gradient(1px 1px at 80px 80px, rgba(255, 69, 0, 0.5), transparent),
    radial-gradient(1px 1px at 130px 130px, rgba(255, 105, 180, 0.6), transparent),
    radial-gradient(1px 1px at 180px 180px, rgba(255, 140, 0, 0.4), transparent);
  animation: chrono-float 6s ease-in-out infinite;
}

@keyframes time-portal-spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes time-ripple-pulse {

  0%,
  100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes chrono-float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }
}

/* Time Elements */
.time-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.clock,
.calendar,
.hourglass {
  position: absolute;
  font-size: 20px;
  animation: time-element-float 7s ease-in-out infinite;
}

.clock {
  top: 15%;
  left: 20%;
  animation-delay: 0s;
}

.calendar {
  top: 65%;
  right: 25%;
  animation-delay: 2.5s;
}

.hourglass {
  bottom: 25%;
  left: 30%;
  animation-delay: 5s;
}

@keyframes time-element-float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }

  25% {
    transform: translateY(-18px) rotate(90deg) scale(1.1);
  }

  50% {
    transform: translateY(-12px) rotate(180deg) scale(0.9);
  }

  75% {
    transform: translateY(-22px) rotate(270deg) scale(1.2);
  }
}

/* Main Content */
.events-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

/* Event Icon Wrapper */
.event-icon-wrapper {
  position: relative;
  margin-bottom: 25px;
}

.time-aura {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  background: radial-gradient(circle, rgba(255, 140, 0, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: time-aura-pulse 3s ease-in-out infinite;
}

.event-emoji {
  position: relative;
  font-size: 80px;
  margin: 0 auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
  transition: all 0.3s ease;
}

.events-card-container:hover .event-emoji {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.7));
}

.time-sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  font-size: 18px;
  animation: time-sparkle 3s ease-in-out infinite;
}

.sparkle:nth-child(1) {
  top: 12%;
  left: 25%;
  animation-delay: 0s;
}

.sparkle:nth-child(2) {
  top: 18%;
  right: 30%;
  animation-delay: 1.5s;
}

@keyframes time-aura-pulse {

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

@keyframes time-sparkle {

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

/* Event Name */
.event-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
  font-family: 'Fredoka One', cursive;
  background: linear-gradient(45deg, #ff8c00, #ff4500, #ff6347, #ff69b4, #ffd700);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: time-rainbow 4s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(255, 140, 0, 0.5);
}

@keyframes time-rainbow {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* Event Details */
.event-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.detail-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.detail-card:hover {
  transform: translateX(10px) scale(1.02);
  border-color: #ff8c00;
  background: rgba(255, 255, 255, 0.2);
}

.date-card {
  border-left: 4px solid #ff8c00;
}

.location-card {
  border-left: 4px solid #ff4500;
}

.importance-card {
  border-left: 4px solid #ff6347;
}

.detail-icon {
  font-size: 24px;
  margin-right: 15px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.detail-content {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.detail-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  margin-bottom: 2px;
}

.detail-value {
  font-size: 16px;
  color: #fff;
  font-weight: bold;
}

/* Learn More Button */
.learn-more-btn {
  position: relative;
  background: linear-gradient(135deg, #ff8c00 0%, #ff4500 100%);
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 140, 0, 0.4);
}

.learn-more-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(255, 140, 0, 0.6);
}

.btn-text {
  margin-right: 10px;
}

.btn-icon {
  font-size: 20px;
  animation: book-bounce 2s ease-in-out infinite;
}

@keyframes book-bounce {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-6px) rotate(5deg);
  }
}

.btn-time-trail {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: all 0.6s ease;
}

.learn-more-btn:hover .btn-time-trail {
  left: 100%;
}

/* Time Decorations */
.time-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.corner-sundial,
.corner-stopwatch {
  position: absolute;
  font-size: 24px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.corner-sundial {
  top: 10px;
  left: 10px;
}

.corner-stopwatch {
  bottom: 10px;
  right: 10px;
}

.events-card-container:hover .corner-sundial,
.events-card-container:hover .corner-stopwatch {
  opacity: 1;
  transform: scale(1.2) rotate(15deg);
}

/* Time Effects */
.time-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.chrono-wave {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 140, 0, 0.2), transparent);
  transform: rotate(45deg);
  transition: all 1s ease;
  opacity: 0;
}

.events-card-container:hover .chrono-wave {
  opacity: 1;
  left: 100%;
}

.temporal-rays {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.temporal-rays::before,
.temporal-rays::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #ff8c00, transparent);
  animation: temporal-ray 4s ease-in-out infinite;
}

.temporal-rays::before {
  left: 25%;
  animation-delay: 0s;
}

.temporal-rays::after {
  right: 35%;
  animation-delay: 2s;
}

@keyframes temporal-ray {

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
  .events-card-container {
    padding: 20px;
    margin: 15px;
  }

  .event-emoji {
    font-size: 60px;
  }

  .event-name {
    font-size: 24px;
  }

  .detail-card {
    padding: 12px;
  }

  .learn-more-btn {
    padding: 12px 24px;
    font-size: 16px;
  }
}

/* Special Event Classes */
.war-class {
  filter: drop-shadow(0 4px 8px rgba(255, 0, 0, 0.5));
}

.peace-class {
  filter: drop-shadow(0 4px 8px rgba(0, 255, 0, 0.5));
}

.discovery-class {
  filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.5));
}

.invention-class {
  filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5));
}

.revolution-class {
  filter: drop-shadow(0 4px 8px rgba(255, 69, 0, 0.5));
}

.independence-class {
  filter: drop-shadow(0 4px 8px rgba(0, 128, 0, 0.5));
}

.space-class {
  filter: drop-shadow(0 4px 8px rgba(138, 43, 226, 0.5));
}

.medical-class {
  filter: drop-shadow(0 4px 8px rgba(255, 105, 180, 0.5));
}

.sports-class {
  filter: drop-shadow(0 4px 8px rgba(255, 140, 0, 0.5));
}

.cultural-class {
  filter: drop-shadow(0 4px 8px rgba(255, 20, 147, 0.5));
}

.scientific-class {
  filter: drop-shadow(0 4px 8px rgba(0, 255, 127, 0.5));
}

.political-class {
  filter: drop-shadow(0 4px 8px rgba(255, 69, 0, 0.5));
}
</style>

<template>
  <div class="stages-card-container" @click="$emit('click', stage)">
    <!-- Timeline Background -->
    <div class="timeline-bg">
      <div class="timeline-line"></div>
      <div class="timeline-marks"></div>
      <div class="progress-dots"></div>
    </div>

    <!-- Floating Timeline Elements -->
    <div class="timeline-elements">
      <div class="clock">⏰</div>
      <div class="calendar">📅</div>
      <div class="milestone">🎯</div>
    </div>

    <!-- Main Content -->
    <div class="stages-content">
      <!-- Stage Icon with Timeline Effects -->
      <div class="stage-icon-wrapper">
        <div class="timeline-aura"></div>
        <div class="stage-emoji" :class="getStageClass(stage.category)">
          {{ getStageEmoji(stage.category) }}
        </div>
        <div class="timeline-sparkles">
          <span class="sparkle">⚡</span>
          <span class="sparkle">💫</span>
        </div>
      </div>

      <!-- Stage Name with Timeline Text Effect -->
      <h3 class="stage-name timeline-text">
        {{ stage.category }}
      </h3>

      <!-- Stage Information -->
      <div class="stage-info">
        <div class="info-card duration-card">
          <div class="info-icon">⏱️</div>
          <div class="info-content">
            <span class="info-label">المدة</span>
            <span class="info-value">{{ stage.stage || 'غير محدد' }}</span>
          </div>
        </div>

        <div class="info-card difficulty-card">
          <div class="info-icon">📊</div>
          <div class="info-content">
            <span class="info-label">الفئة</span>
            <span class="info-value">{{ stage.term || 'غير محدد' }}</span>
          </div>
        </div>

        <div class="info-card status-card">
          <div class="info-icon">🏆</div>
          <div class="info-content">
            <span class="info-label">الوصف</span>
            <span class="info-value">{{ stage.description || 'غير محدد' }}</span>
          </div>
        </div>
      </div>


    </div>

    <!-- Corner Timeline Decorations -->
    <div class="timeline-decorations">
      <div class="corner-flag">🚩</div>
      <div class="corner-trophy">🏆</div>
    </div>

    <!-- Interactive Timeline Effects -->
    <div class="timeline-effects">
      <div class="progress-wave"></div>
      <div class="milestone-rays"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stage: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStageEmoji(type) {
      const emojiMap = {
        'Beginner': '🌱',
        'Intermediate': '🌿',
        'Advanced': '🌳',
        'Expert': '🏆',
        'Master': '👑',
        'Novice': '🐣',
        'Student': '📚',
        'Graduate': '🎓',
        'Professional': '💼',
        'Leader': '👨‍💼',
        'Innovator': '💡',
        'Pioneer': '🚀',
        'default': '📈'
      };

      return emojiMap[type] || emojiMap.default;
    },

    getStageClass(type) {
      const classMap = {
        'Beginner': 'beginner-class',
        'Intermediate': 'intermediate-class',
        'Advanced': 'advanced-class',
        'Expert': 'expert-class',
        'Master': 'master-class',
        'Novice': 'novice-class',
        'Student': 'student-class',
        'Graduate': 'graduate-class',
        'Professional': 'professional-class',
        'Leader': 'leader-class',
        'Innovator': 'innovator-class',
        'Pioneer': 'pioneer-class',
        'default': 'default-class'
      };

      return classMap[type] || classMap.default;
    }
  }
}
</script>

<style scoped>
.stages-card-container {
  position: relative;
  background: linear-gradient(135deg, #9370db 0%, #8a2be2 50%, #9932cc 100%);
  border: 4px solid transparent;
  border-radius: 30px;
  padding: 30px;
  margin: 20px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow:
    0 20px 40px rgba(147, 112, 219, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset,
    0 0 30px rgba(138, 43, 226, 0.3);
}

.stages-card-container:hover {
  transform: translateY(-15px) scale(1.05) rotate(1deg);
  border-color: #ffd700;
  box-shadow:
    0 30px 60px rgba(147, 112, 219, 0.5),
    0 0 0 3px rgba(255, 215, 0, 0.5) inset,
    0 0 50px rgba(255, 215, 0, 0.5);
}

/* Timeline Background */
.timeline-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #ffd700, #ff6347, #32cd32, #4169e1, #ffd700);
  transform: translateY(-50%);
  animation: timeline-progress 8s linear infinite;
}

.timeline-marks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(90deg, transparent 19%, rgba(255, 215, 0, 0.6) 20%, rgba(255, 215, 0, 0.6) 21%, transparent 22%),
    linear-gradient(90deg, transparent 39%, rgba(255, 215, 0, 0.6) 40%, rgba(255, 215, 0, 0.6) 41%, transparent 42%),
    linear-gradient(90deg, transparent 59%, rgba(255, 215, 0, 0.6) 60%, rgba(255, 215, 0, 0.6) 61%, transparent 62%),
    linear-gradient(90deg, transparent 79%, rgba(255, 215, 0, 0.6) 80%, rgba(255, 215, 0, 0.6) 81%, transparent 82%);
  opacity: 0.7;
}

.progress-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(3px 3px at 25% 50%, #ffd700, transparent),
    radial-gradient(3px 3px at 50% 50%, #ff6347, transparent),
    radial-gradient(3px 3px at 75% 50%, #32cd32, transparent);
  animation: dots-pulse 3s ease-in-out infinite;
}

@keyframes timeline-progress {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

@keyframes dots-pulse {

  0%,
  100% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }
}

/* Timeline Elements */
.timeline-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.clock,
.calendar,
.milestone {
  position: absolute;
  font-size: 24px;
  animation: timeline-element-float 8s ease-in-out infinite;
}

.clock {
  top: 20%;
  left: 25%;
  animation-delay: 0s;
}

.calendar {
  top: 70%;
  right: 30%;
  animation-delay: 3s;
}

.milestone {
  bottom: 25%;
  left: 35%;
  animation-delay: 6s;
}

@keyframes timeline-element-float {

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
.stages-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

/* Stage Icon Wrapper */
.stage-icon-wrapper {
  position: relative;
  margin-bottom: 25px;
}

.timeline-aura {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: timeline-aura-pulse 3s ease-in-out infinite;
}

.stage-emoji {
  position: relative;
  font-size: 80px;
  margin: 0 auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.stages-card-container:hover .stage-emoji {
  transform: scale(1.1) rotate(-5deg);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
}

.timeline-sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  font-size: 18px;
  animation: timeline-sparkle 3s ease-in-out infinite;
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

@keyframes timeline-aura-pulse {

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

@keyframes timeline-sparkle {

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

/* Stage Name */
.stage-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
  font-family: 'Fredoka One', cursive;
  background: linear-gradient(45deg, #9370db, #8a2be2, #ffd700, #ff6347, #32cd32);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: timeline-rainbow 4s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

@keyframes timeline-rainbow {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* Stage Information */
.stage-info {
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
  border-color: #ffd700;
  background: rgba(255, 255, 255, 0.3);
}

.duration-card {
  border-left: 4px solid #9370db;
}

.difficulty-card {
  border-left: 4px solid #8a2be2;
}

.status-card {
  border-left: 4px solid #ffd700;
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

/* Start Button */
.start-stage-btn {
  position: relative;
  background: linear-gradient(135deg, #9370db 0%, #ffd700 100%);
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(147, 112, 219, 0.4);
}

.start-stage-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(147, 112, 219, 0.6);
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
    transform: translateY(-10px) rotate(5deg);
  }
}

.btn-timeline-trail {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: all 0.6s ease;
}

.start-stage-btn:hover .btn-timeline-trail {
  left: 100%;
}

/* Timeline Decorations */
.timeline-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.corner-flag,
.corner-trophy {
  position: absolute;
  font-size: 24px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.corner-flag {
  top: 10px;
  left: 10px;
}

.corner-trophy {
  bottom: 10px;
  right: 10px;
}

.stages-card-container:hover .corner-flag,
.stages-card-container:hover .corner-trophy {
  opacity: 1;
  transform: scale(1.2) rotate(15deg);
}

/* Timeline Effects */
.timeline-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.progress-wave {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.2), transparent);
  transform: rotate(45deg);
  transition: all 1s ease;
  opacity: 0;
}

.stages-card-container:hover .progress-wave {
  opacity: 1;
  left: 100%;
}

.milestone-rays {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.milestone-rays::before,
.milestone-rays::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #ffd700, transparent);
  animation: milestone-ray 4s ease-in-out infinite;
}

.milestone-rays::before {
  left: 35%;
  animation-delay: 0s;
}

.milestone-rays::after {
  right: 45%;
  animation-delay: 2s;
}

@keyframes milestone-ray {

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
  .stages-card-container {
    padding: 20px;
    margin: 15px;
  }

  .stage-emoji {
    font-size: 60px;
  }

  .stage-name {
    font-size: 24px;
  }

  .info-card {
    padding: 12px;
  }

  .start-stage-btn {
    padding: 12px 24px;
    font-size: 16px;
  }
}

/* Special Stage Classes */
.beginner-class {
  filter: drop-shadow(0 4px 8px rgba(34, 139, 34, 0.5));
}

.intermediate-class {
  filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5));
}

.advanced-class {
  filter: drop-shadow(0 4px 8px rgba(255, 140, 0, 0.5));
}

.expert-class {
  filter: drop-shadow(0 4px 8px rgba(255, 69, 0, 0.5));
}

.master-class {
  filter: drop-shadow(0 4px 8px rgba(138, 43, 226, 0.5));
}

.novice-class {
  filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.5));
}

.student-class {
  filter: drop-shadow(0 4px 8px rgba(65, 105, 225, 0.5));
}

.graduate-class {
  filter: drop-shadow(0 4px 8px rgba(255, 20, 147, 0.5));
}

.professional-class {
  filter: drop-shadow(0 4px 8px rgba(128, 128, 128, 0.5));
}

.leader-class {
  filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5));
}

.innovator-class {
  filter: drop-shadow(0 4px 8px rgba(0, 255, 127, 0.5));
}

.pioneer-class {
  filter: drop-shadow(0 4px 8px rgba(255, 105, 180, 0.5));
}
</style>

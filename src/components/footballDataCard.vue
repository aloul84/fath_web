<template>
  <div class="football-card-container" @click="$emit('click', football)">
    <!-- Stadium Background -->
    <div class="stadium-bg">
      <div class="grass-field"></div>
      <div class="crowd-noise"></div>
      <div class="goal-posts"></div>
    </div>

    <!-- Floating Football Elements -->
    <div class="football-elements">
      <div class="football-ball">⚽</div>
      <div class="trophy">🏆</div>
      <div class="whistle">📢</div>
    </div>

    <!-- Main Content -->
    <div class="football-content">
      <!-- Football Icon with Stadium Effects -->
      <div class="football-icon-wrapper">
        <div class="stadium-lights"></div>
        <div class="football-emoji" :class="getFootballClass(football.type)">
          {{ getFootballEmoji(football.type) }}
        </div>
        <div class="goal-sparkles">
          <span class="sparkle">⚡</span>
          <span class="sparkle">💫</span>
        </div>
      </div>

      <!-- Football Name with Stadium Text Effect -->
      <h3 class="football-name stadium-text">
        {{ football.category }} {{ football.name }}
      </h3>

      <!-- Football Information -->
      <div class="football-info">
        <div class="info-card team-card">
          <div class="info-icon">👥</div>
          <div class="info-content">
            <span class="info-label">الاصل</span>
            <span class="info-value">{{ football.origin || 'غير محدد' }}</span>
          </div>
        </div>

        <div class="info-card position-card">
          <div class="info-icon">🎯</div>
          <div class="info-content">
            <span class="info-label">ملاحظات</span>
            <span class="info-value">{{ football.notes || 'غير محدد' }}</span>
          </div>
        </div>


      </div>


    </div>

    <!-- Corner Stadium Decorations -->
    <div class="stadium-decorations">
      <div class="corner-flag">🚩</div>
      <div class="corner-referee">👨‍⚖️</div>
    </div>

    <!-- Interactive Stadium Effects -->
    <div class="stadium-effects">
      <div class="cheer-wave"></div>
      <div class="spotlight-rays"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    football: {
      type: Object,
      required: true
    }
  },
  methods: {
    getFootballEmoji(type) {
      const emojiMap = {
        'Player': '⚽',
        'Team': '👥',
        'Match': '🏟️',
        'Tournament': '🏆',
        'League': '📋',
        'Coach': '👨‍💼',
        'Stadium': '🏟️',
        'Fan': '📢',
        'Referee': '👨‍⚖️',
        'Goal': '🥅',
        'Assist': '🎯',
        'Save': '🧤',
        'default': '⚽'
      };

      return emojiMap[type] || emojiMap.default;
    },

    getFootballClass(type) {
      const classMap = {
        'Player': 'player-class',
        'Team': 'team-class',
        'Match': 'match-class',
        'Tournament': 'tournament-class',
        'League': 'league-class',
        'Coach': 'coach-class',
        'Stadium': 'stadium-class',
        'Fan': 'fan-class',
        'Referee': 'referee-class',
        'Goal': 'goal-class',
        'Assist': 'assist-class',
        'Save': 'save-class',
        'default': 'default-class'
      };

      return classMap[type] || classMap.default;
    }
  }
}
</script>

<style scoped>
.football-card-container {
  position: relative;
  background: linear-gradient(135deg, #228b22 0%, #32cd32 50%, #90ee90 100%);
  border: 4px solid transparent;
  border-radius: 30px;
  padding: 30px;
  margin: 20px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow:
    0 20px 40px rgba(34, 139, 34, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset,
    0 0 30px rgba(255, 215, 0, 0.3);
}

.football-card-container:hover {
  transform: translateY(-15px) scale(1.05) rotate(-1deg);
  border-color: #ffd700;
  box-shadow:
    0 30px 60px rgba(34, 139, 34, 0.5),
    0 0 0 3px rgba(255, 215, 0, 0.5) inset,
    0 0 50px rgba(255, 215, 0, 0.5);
}

/* Stadium Background */
.stadium-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.grass-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(90deg, transparent 49%, rgba(255, 255, 255, 0.3) 50%, transparent 51%),
    linear-gradient(0deg, transparent 49%, rgba(255, 255, 255, 0.3) 50%, transparent 51%);
  background-size: 40px 40px;
  opacity: 0.4;
  animation: grass-move 3s linear infinite;
}

.crowd-noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(ellipse at 20% 10%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 90%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
  animation: crowd-cheer 2s ease-in-out infinite;
}

.goal-posts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(90deg, transparent 30%, rgba(255, 255, 255, 0.4) 30.5%, rgba(255, 255, 255, 0.4) 31%, transparent 31.5%),
    linear-gradient(90deg, transparent 68%, rgba(255, 255, 255, 0.4) 68.5%, rgba(255, 255, 255, 0.4) 69%, transparent 69.5%);
  background-size: 100% 100%;
  opacity: 0.6;
}

@keyframes grass-move {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 40px 40px;
  }
}

@keyframes crowd-cheer {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.6;
  }
}

/* Football Elements */
.football-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.football-ball,
.trophy,
.whistle {
  position: absolute;
  font-size: 22px;
  animation: football-element-bounce 6s ease-in-out infinite;
}

.football-ball {
  top: 20%;
  left: 25%;
  animation-delay: 0s;
}

.trophy {
  top: 70%;
  right: 30%;
  animation-delay: 2s;
}

.whistle {
  bottom: 20%;
  left: 35%;
  animation-delay: 4s;
}

@keyframes football-element-bounce {

  0%,
  100% {
    transform: translateY(0px) scale(1);
  }

  25% {
    transform: translateY(-20px) scale(1.1);
  }

  50% {
    transform: translateY(-15px) scale(0.9);
  }

  75% {
    transform: translateY(-25px) scale(1.2);
  }
}

/* Main Content */
.football-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

/* Football Icon Wrapper */
.football-icon-wrapper {
  position: relative;
  margin-bottom: 25px;
}

.stadium-lights {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: stadium-lights-pulse 3s ease-in-out infinite;
}

.football-emoji {
  position: relative;
  font-size: 80px;
  margin: 0 auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.football-card-container:hover .football-emoji {
  transform: scale(1.1) rotate(-5deg);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
}

.goal-sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  font-size: 18px;
  animation: goal-sparkle 3s ease-in-out infinite;
}

.sparkle:nth-child(1) {
  top: 15%;
  left: 30%;
  animation-delay: 0s;
}

.sparkle:nth-child(2) {
  top: 20%;
  right: 35%;
  animation-delay: 1.5s;
}

@keyframes stadium-lights-pulse {

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

@keyframes goal-sparkle {

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

/* Football Name */
.football-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
  font-family: 'Fredoka One', cursive;
  background: linear-gradient(45deg, #32cd32, #ffd700, #ff6347, #4169e1, #ff1493);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: stadium-rainbow 4s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

@keyframes stadium-rainbow {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* Football Information */
.football-info {
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

.team-card {
  border-left: 4px solid #32cd32;
}

.position-card {
  border-left: 4px solid #ffd700;
}

.stats-card {
  border-left: 4px solid #ff6347;
}

.detail-icon {
  font-size: 24px;
  margin-right: 15px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.detail-content {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.detail-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  margin-bottom: 2px;
}

.detail-value {
  font-size: 16px;
  color: #fff;
  font-weight: bold;
}

/* Play Button */
.play-football-btn {
  position: relative;
  background: linear-gradient(135deg, #32cd32 0%, #ffd700 100%);
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(34, 139, 34, 0.4);
}

.play-football-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(34, 139, 34, 0.6);
}

.btn-text {
  margin-right: 10px;
}

.btn-icon {
  font-size: 20px;
  animation: ball-kick 2s ease-in-out infinite;
}

@keyframes ball-kick {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-8px) rotate(15deg);
  }
}

.btn-stadium-trail {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: all 0.6s ease;
}

.play-football-btn:hover .btn-stadium-trail {
  left: 100%;
}

/* Stadium Decorations */
.stadium-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.corner-flag,
.corner-referee {
  position: absolute;
  font-size: 24px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.corner-flag {
  top: 10px;
  left: 10px;
}

.corner-referee {
  bottom: 10px;
  right: 10px;
}

.football-card-container:hover .corner-flag,
.football-card-container:hover .corner-referee {
  opacity: 1;
  transform: scale(1.2) rotate(-15deg);
}

/* Stadium Effects */
.stadium-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.cheer-wave {
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

.football-card-container:hover .cheer-wave {
  opacity: 1;
  left: 100%;
}

.spotlight-rays {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.spotlight-rays::before,
.spotlight-rays::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #ffd700, transparent);
  animation: spotlight-ray 5s ease-in-out infinite;
}

.spotlight-rays::before {
  left: 30%;
  animation-delay: 0s;
}

.spotlight-rays::after {
  right: 40%;
  animation-delay: 2.5s;
}

@keyframes spotlight-ray {

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
  .football-card-container {
    padding: 20px;
    margin: 15px;
  }

  .football-emoji {
    font-size: 60px;
  }

  .football-name {
    font-size: 24px;
  }

  .info-card {
    padding: 12px;
  }

  .play-football-btn {
    padding: 12px 24px;
    font-size: 16px;
  }
}

/* Special Football Classes */
.player-class {
  filter: drop-shadow(0 4px 8px rgba(34, 139, 34, 0.5));
}

.team-class {
  filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5));
}

.match-class {
  filter: drop-shadow(0 4px 8px rgba(255, 99, 71, 0.5));
}

.tournament-class {
  filter: drop-shadow(0 4px 8px rgba(65, 105, 225, 0.5));
}

.league-class {
  filter: drop-shadow(0 4px 8px rgba(255, 20, 147, 0.5));
}

.coach-class {
  filter: drop-shadow(0 4px 8px rgba(255, 140, 0, 0.5));
}

.stadium-class {
  filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.5));
}

.fan-class {
  filter: drop-shadow(0 4px 8px rgba(255, 105, 180, 0.5));
}

.referee-class {
  filter: drop-shadow(0 4px 8px rgba(128, 128, 128, 0.5));
}

.goal-class {
  filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5));
}

.assist-class {
  filter: drop-shadow(0 4px 8px rgba(0, 255, 127, 0.5));
}

.save-class {
  filter: drop-shadow(0 4px 8px rgba(255, 69, 0, 0.5));
}
</style>

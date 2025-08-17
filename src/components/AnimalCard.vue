<template>
    <div class="animal-card-container" @click="$emit('click', animal)">
        <!-- Background Pattern -->
        <div class="card-bg-pattern"></div>

        <!-- Floating Elements -->
        <div class="floating-elements">
            <div class="floating-star">⭐</div>
            <div class="floating-heart">💖</div>
            <div class="floating-sparkle">✨</div>
        </div>

        <!-- Main Card Content -->
        <div class="card-main-content">
            <!-- Animal Icon with Glow Effect -->
            <div class="animal-icon-container">
                <div class="icon-glow"></div>
                <div class="animal-emoji" :class="getAnimalClass(animal.name)">
                    {{ getAnimalEmoji(animal.name) }}
                </div>
                <div class="icon-sparkles">
                    <span class="sparkle">✨</span>
                    <span class="sparkle">💫</span>
                </div>
            </div>

            <!-- Animal Name with Rainbow Text -->
            <h3 class="animal-name rainbow-text">
                {{ animal.name }}
            </h3>

            <!-- Animal Details in Colorful Boxes -->
            <div class="animal-details">
                <div class="detail-box habitat-box">
                    <div class="detail-icon">🏠</div>
                    <div class="detail-content">
                        <span class="detail-label">صغيره</span>
                        <span class="detail-value">{{ animal.young || 'غير محدد' }}</span>
                    </div>
                </div>

                <div class="detail-box diet-box">
                    <div class="detail-icon">🍽️</div>
                    <div class="detail-content">
                        <span class="detail-label">الصوت</span>
                        <span class="detail-value">{{ animal.sound || 'غير محدد' }}</span>
                    </div>
                </div>

                <div class="detail-box size-box">
                    <div class="detail-icon">📏</div>
                    <div class="detail-content">
                        <span class="detail-label">ملاحظة</span>
                        <span class="detail-value">{{ animal.notes || 'غير محدد' }}</span>
                    </div>
                </div>
            </div>


        </div>

        <!-- Corner Decorations -->
        <div class="corner-decorations">
            <div class="corner-paw">🐾</div>
            <div class="corner-flower">🌸</div>
        </div>

        <!-- Hover Effects -->
        <div class="hover-effects">
            <div class="color-trail"></div>
            <div class="bubble-trail"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        animal: {
            type: Object,
            required: true
        }
    },
    methods: {
        getAnimalEmoji(name) {
            const emojiMap = {
                'Lion': '🦁',
                'Tiger': '🐯',
                'Elephant': '🐘',
                'Giraffe': '🦒',
                'Monkey': '🐒',
                'Panda': '🐼',
                'Penguin': '🐧',
                'Dolphin': '🐬',
                'Eagle': '🦅',
                'Owl': '🦉',
                'default': '🐾'
            };

            return emojiMap[name] || emojiMap.default;
        },

        getAnimalClass(name) {
            const classMap = {
                'Lion': 'lion-class',
                'Tiger': 'tiger-class',
                'Elephant': 'elephant-class',
                'Giraffe': 'giraffe-class',
                'Monkey': 'monkey-class',
                'Panda': 'panda-class',
                'Penguin': 'penguin-class',
                'Dolphin': 'dolphin-class',
                'Eagle': 'eagle-class',
                'Owl': 'owl-class',
                'default': 'default-class'
            };

            return classMap[name] || classMap.default;
        }
    }
}
</script>

<style scoped>
.animal-card-container {
    position: relative;
    background: linear-gradient(135deg, #fff6f6 0%, #f0f8ff 50%, #fff0f5 100%);
    border: 4px solid transparent;
    border-radius: 30px;
    padding: 30px;
    margin: 20px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    box-shadow:
        0 20px 40px rgba(255, 107, 107, 0.2),
        0 0 0 1px rgba(255, 255, 255, 0.8) inset;
}

.animal-card-container:hover {
    transform: translateY(-15px) scale(1.05) rotate(2deg);
    border-color: #ff6b6b;
    box-shadow:
        0 30px 60px rgba(255, 107, 107, 0.4),
        0 0 0 3px rgba(255, 255, 255, 0.9) inset,
        0 0 30px rgba(255, 107, 107, 0.3);
}

/* Background Pattern */
.card-bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(173, 216, 230, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 218, 185, 0.1) 0%, transparent 50%);
    opacity: 0.6;
    transition: opacity 0.3s ease;
}

.animal-card-container:hover .card-bg-pattern {
    opacity: 1;
}

/* Floating Elements */
.floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.floating-star,
.floating-heart,
.floating-sparkle {
    position: absolute;
    font-size: 20px;
    animation: float-around 6s ease-in-out infinite;
}

.floating-star {
    top: 15%;
    left: 10%;
    animation-delay: 0s;
}

.floating-heart {
    top: 25%;
    right: 15%;
    animation-delay: 2s;
}

.floating-sparkle {
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
}

@keyframes float-around {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg) scale(1);
    }

    25% {
        transform: translateY(-15px) rotate(90deg) scale(1.1);
    }

    50% {
        transform: translateY(-10px) rotate(180deg) scale(0.9);
    }

    75% {
        transform: translateY(-20px) rotate(270deg) scale(1.2);
    }
}

/* Main Content */
.card-main-content {
    position: relative;
    z-index: 2;
    text-align: center;
}

/* Animal Icon Container */
.animal-icon-container {
    position: relative;
    margin-bottom: 25px;
}

.icon-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(255, 107, 107, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulse-glow 2s ease-in-out infinite;
}

.animal-emoji {
    position: relative;
    font-size: 80px;
    margin: 0 auto;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    transition: all 0.3s ease;
}

.animal-card-container:hover .animal-emoji {
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
}

.icon-sparkles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.sparkle {
    position: absolute;
    font-size: 16px;
    animation: sparkle-twinkle 3s ease-in-out infinite;
}

.sparkle:nth-child(1) {
    top: 10%;
    left: 20%;
    animation-delay: 0s;
}

.sparkle:nth-child(2) {
    top: 15%;
    right: 25%;
    animation-delay: 1.5s;
}

@keyframes sparkle-twinkle {

    0%,
    100% {
        opacity: 0.3;
        transform: scale(0.8);
    }

    50% {
        opacity: 1;
        transform: scale(1.2);
    }
}

@keyframes pulse-glow {

    0%,
    100% {
        opacity: 0.5;
        transform: translate(-50%, -50%) scale(1);
    }

    50% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1.1);
    }
}

/* Animal Name */
.animal-name {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 25px;
    font-family: 'Fredoka One', cursive;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: rainbow-shift 3s ease-in-out infinite;
}

@keyframes rainbow-shift {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

/* Animal Details */
.animal-details {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 25px;
}

.detail-box {
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.detail-box:hover {
    transform: translateX(10px) scale(1.02);
    border-color: #ff6b6b;
}

.habitat-box {
    background: linear-gradient(135deg, #ffeaa7, #fab1a0);
}

.diet-box {
    background: linear-gradient(135deg, #a29bfe, #fd79a8);
}

.size-box {
    background: linear-gradient(135deg, #74b9ff, #55a3ff);
}

.detail-icon {
    font-size: 24px;
    margin-right: 15px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.detail-content {
    display: flex;
    flex-direction: column;
    text-align: right;
}

.detail-label {
    font-size: 14px;
    color: #666;
    font-weight: 600;
    margin-bottom: 2px;
}

.detail-value {
    font-size: 16px;
    color: #333;
    font-weight: bold;
}

/* Interactive Button */
.discover-btn {
    position: relative;
    background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
    border: none;
    border-radius: 25px;
    padding: 15px 30px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

.discover-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4);
}

.btn-text {
    margin-right: 10px;
}

.btn-icon {
    font-size: 20px;
    animation: rocket-bounce 2s ease-in-out infinite;
}

@keyframes rocket-bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-5px);
    }
}

.btn-ripple {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
}

.discover-btn:active .btn-ripple {
    width: 300px;
    height: 300px;
    opacity: 0;
}

/* Corner Decorations */
.corner-decorations {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.corner-paw,
.corner-flower {
    position: absolute;
    font-size: 24px;
    opacity: 0.6;
    transition: all 0.3s ease;
}

.corner-paw {
    top: 10px;
    left: 10px;
}

.corner-flower {
    bottom: 10px;
    right: 10px;
}

.animal-card-container:hover .corner-paw,
.animal-card-container:hover .corner-flower {
    opacity: 1;
    transform: scale(1.2) rotate(15deg);
}

/* Hover Effects */
.hover-effects {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.color-trail {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 107, 107, 0.1), transparent);
    transform: rotate(45deg);
    transition: all 0.8s ease;
    opacity: 0;
}

.animal-card-container:hover .color-trail {
    opacity: 1;
    left: 100%;
}

.bubble-trail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.bubble-trail::before,
.bubble-trail::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
    border-radius: 50%;
    animation: bubble-float 4s ease-in-out infinite;
}

.bubble-trail::before {
    top: 20%;
    left: 80%;
    animation-delay: 0s;
}

.bubble-trail::after {
    top: 70%;
    left: 20%;
    animation-delay: 2s;
}

@keyframes bubble-float {

    0%,
    100% {
        transform: translateY(0) scale(1);
        opacity: 0.7;
    }

    50% {
        transform: translateY(-20px) scale(1.2);
        opacity: 1;
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .animal-card-container {
        padding: 20px;
        margin: 15px;
    }

    .animal-emoji {
        font-size: 60px;
    }

    .animal-name {
        font-size: 24px;
    }

    .detail-box {
        padding: 12px;
    }

    .discover-btn {
        padding: 12px 24px;
        font-size: 16px;
    }
}

/* Special Animal Classes */
.lion-class {
    filter: drop-shadow(0 4px 8px rgba(255, 165, 0, 0.3));
}

.tiger-class {
    filter: drop-shadow(0 4px 8px rgba(255, 69, 0, 0.3));
}

.elephant-class {
    filter: drop-shadow(0 4px 8px rgba(128, 128, 128, 0.3));
}

.giraffe-class {
    filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.3));
}

.monkey-class {
    filter: drop-shadow(0 4px 8px rgba(139, 69, 19, 0.3));
}

.panda-class {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.penguin-class {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.dolphin-class {
    filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.3));
}

.eagle-class {
    filter: drop-shadow(0 4px 8px rgba(139, 69, 19, 0.3));
}

.owl-class {
    filter: drop-shadow(0 4px 8px rgba(139, 69, 19, 0.3));
}
</style>

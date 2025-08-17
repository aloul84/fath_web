<template>
    <div class="region-card-container" @click="$emit('click', region)">
        <!-- World Map Background -->
        <div class="world-map-bg">
            <div class="continents"></div>
            <div class="oceans"></div>
            <div class="compass-rose"></div>
        </div>

        <!-- Floating World Elements -->
        <div class="world-elements">
            <div class="globe">🌍</div>
            <div class="flag">🏁</div>
            <div class="landmark">🗽</div>
        </div>

        <!-- Main Content -->
        <div class="region-content">
            <!-- Region Icon with World Effects -->
            <div class="region-icon-wrapper">
                <div class="world-aura"></div>
                <div class="region-emoji" :class="getRegionClass(region.country)">
                    {{ getRegionEmoji(region.country) }}
                </div>
                <div class="world-sparkles">
                    <span class="sparkle">✨</span>
                    <span class="sparkle">💫</span>
                </div>
            </div>

            <!-- Region Name with World Text Effect -->
            <h3 class="region-name world-text">
                {{ region.country }}
            </h3>

            <!-- Region Information -->
            <div class="region-info">
                <div class="info-card population-card">
                    <div class="info-icon">👥</div>
                    <div class="info-content">
                        <span class="info-label">السكان</span>
                        <span class="info-value">{{ region.population || 'غير محدد' }}</span>
                    </div>
                </div>

                <div class="info-card capital-card">
                    <div class="info-icon">🏛️</div>
                    <div class="info-content">
                        <span class="info-label">العاصمة</span>
                        <span class="info-value">{{ region.capital || 'غير محدد' }}</span>
                    </div>
                </div>
                <div class="info-card capital-card">
                    <div class="info-icon">💰</div>
                    <div class="info-content">
                        <span class="info-label">العملة</span>
                        <span class="info-value">{{ region.currency || 'غير محدد' }}</span>
                    </div>
                </div>

                <div class="info-card capital-card">
                    <div class="info-icon">📏</div>
                    <div class="info-content">
                        <span class="info-label">المساحة</span>
                        <span class="info-value">{{ region.area_sq_km || 'غير محدد' }}</span>
                    </div>
                </div>

                <div class="info-card capital-card">
                    <div class="info-icon">🏝️</div>
                    <div class="info-content">
                        <span class="info-label">معالم أثرية أو مشهورة</span>
                        <span class="info-value">{{ region.landmarks || 'غير محدد' }}</span>
                    </div>
                </div>

                <div class="info-card capital-card">
                    <div class="info-icon">🚩</div>
                    <div class="info-content">
                        <span class="info-label">وصف العلم</span>
                        <span class="info-value">{{ region.flag_description || 'غير محدد' }}</span>
                    </div>
                </div>



            </div>


        </div>

        <!-- Corner World Decorations -->
        <div class="world-decorations">
            <div class="corner-mountain">⛰️</div>
            <div class="corner-tree">🌳</div>
        </div>

        <!-- Interactive World Effects -->
        <div class="world-effects">
            <div class="global-wave"></div>
            <div class="earth-rays"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        region: {
            type: Object,
            required: true
        }
    },
    methods: {
        getRegionEmoji(type) {
            const emojiMap = {
                'Country': '🏛️',
                'City': '🏙️',
                'State': '🗺️',
                'Province': '🏘️',
                'Territory': '🏔️',
                'Island': '🏝️',
                'Continent': '🌍',
                'Region': '🗺️',
                'Capital': '🏛️',
                'Port': '⚓',
                'Mountain': '⛰️',
                'Desert': '🏜️',
                'Forest': '🌲',
                'Ocean': '🌊',
                'default': '🌍'
            };

            return emojiMap[type] || emojiMap.default;
        },

        getRegionClass(type) {
            const classMap = {
                'Country': 'country-class',
                'City': 'city-class',
                'State': 'state-class',
                'Province': 'province-class',
                'Territory': 'territory-class',
                'Island': 'island-class',
                'Continent': 'continent-class',
                'Region': 'region-class',
                'Capital': 'capital-class',
                'Port': 'port-class',
                'Mountain': 'mountain-class',
                'Desert': 'desert-class',
                'Forest': 'forest-class',
                'Ocean': 'ocean-class',
                'default': 'default-class'
            };

            return classMap[type] || classMap.default;
        }
    }
}
</script>

<style scoped>
.region-card-container {
    position: relative;
    background: linear-gradient(135deg, #4169e1 0%, #1e90ff 50%, #87ceeb 100%);
    border: 4px solid transparent;
    border-radius: 30px;
    padding: 30px;
    margin: 20px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    box-shadow:
        0 20px 40px rgba(65, 105, 225, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.2) inset,
        0 0 30px rgba(135, 206, 235, 0.3);
}

.region-card-container:hover {
    transform: translateY(-15px) scale(1.05) rotate(1deg);
    border-color: #87ceeb;
    box-shadow:
        0 30px 60px rgba(65, 105, 225, 0.5),
        0 0 0 3px rgba(135, 206, 235, 0.5) inset,
        0 0 50px rgba(135, 206, 235, 0.5);
}

/* World Map Background */
.world-map-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.continents {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        radial-gradient(ellipse at 25% 25%, rgba(34, 139, 34, 0.3) 0%, transparent 40%),
        radial-gradient(ellipse at 75% 75%, rgba(34, 139, 34, 0.3) 0%, transparent 40%),
        radial-gradient(ellipse at 50% 50%, rgba(34, 139, 34, 0.2) 0%, transparent 50%);
    animation: continents-rotate 20s linear infinite;
}

.oceans {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
        radial-gradient(ellipse at 20% 80%, rgba(0, 191, 255, 0.2) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(0, 191, 255, 0.2) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 60%, rgba(0, 191, 255, 0.15) 0%, transparent 50%);
    animation: oceans-wave 8s ease-in-out infinite;
}

.compass-rose {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: conic-gradient(from 0deg, #ffd700, #ff6347, #32cd32, #4169e1, #ffd700);
    border-radius: 50%;
    opacity: 0.1;
    animation: compass-spin 15s linear infinite;
}

@keyframes continents-rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes oceans-wave {

    0%,
    100% {
        opacity: 0.3;
    }

    50% {
        opacity: 0.6;
    }
}

@keyframes compass-spin {
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

/* World Elements */
.world-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.globe,
.flag,
.landmark {
    position: absolute;
    font-size: 24px;
    animation: world-element-float 8s ease-in-out infinite;
}

.globe {
    top: 18%;
    left: 30%;
    animation-delay: 0s;
}

.flag {
    top: 72%;
    right: 28%;
    animation-delay: 3s;
}

.landmark {
    bottom: 28%;
    left: 25%;
    animation-delay: 6s;
}

@keyframes world-element-float {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg) scale(1);
    }

    25% {
        transform: translateY(-22px) rotate(90deg) scale(1.1);
    }

    50% {
        transform: translateY(-18px) rotate(180deg) scale(0.9);
    }

    75% {
        transform: translateY(-28px) rotate(270deg) scale(1.2);
    }
}

/* Main Content */
.region-content {
    position: relative;
    z-index: 2;
    text-align: center;
}

/* Region Icon Wrapper */
.region-icon-wrapper {
    position: relative;
    margin-bottom: 25px;
}

.world-aura {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 140px;
    background: radial-gradient(circle, rgba(135, 206, 235, 0.4) 0%, transparent 70%);
    border-radius: 50%;
    animation: world-aura-pulse 3s ease-in-out infinite;
}

.region-emoji {
    position: relative;
    font-size: 80px;
    margin: 0 auto;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    transition: all 0.3s ease;
}

.region-card-container:hover .region-emoji {
    transform: scale(1.1) rotate(-5deg);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
}

.world-sparkles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.sparkle {
    position: absolute;
    font-size: 18px;
    animation: world-sparkle 3s ease-in-out infinite;
}

.sparkle:nth-child(1) {
    top: 12%;
    left: 35%;
    animation-delay: 0s;
}

.sparkle:nth-child(2) {
    top: 18%;
    right: 40%;
    animation-delay: 1.5s;
}

@keyframes world-aura-pulse {

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

@keyframes world-sparkle {

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

/* Region Name */
.region-name {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 25px;
    font-family: 'Fredoka One', cursive;
    background: linear-gradient(45deg, #4169e1, #87ceeb, #32cd32, #ffd700, #ff6347);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: world-rainbow 4s ease-in-out infinite;
    text-shadow: 0 0 20px rgba(135, 206, 235, 0.5);
}

@keyframes world-rainbow {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

/* Region Information */
.region-info {
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
    border-color: #87ceeb;
    background: rgba(255, 255, 255, 0.3);
}

.population-card {
    border-left: 4px solid #4169e1;
}

.capital-card {
    border-left: 4px solid #87ceeb;
}

.language-card {
    border-left: 4px solid #32cd32;
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
.explore-world-btn {
    position: relative;
    background: linear-gradient(135deg, #4169e1 0%, #87ceeb 100%);
    border: none;
    border-radius: 25px;
    padding: 15px 30px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(65, 105, 225, 0.4);
}

.explore-world-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 35px rgba(65, 105, 225, 0.6);
}

.btn-text {
    margin-right: 10px;
}

.btn-icon {
    font-size: 20px;
    animation: globe-spin 3s linear infinite;
}

@keyframes globe-spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.btn-world-trail {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: all 0.6s ease;
}

.explore-world-btn:hover .btn-world-trail {
    left: 100%;
}

/* World Decorations */
.world-decorations {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.corner-mountain,
.corner-tree {
    position: absolute;
    font-size: 24px;
    opacity: 0.6;
    transition: all 0.3s ease;
}

.corner-mountain {
    top: 10px;
    left: 10px;
}

.corner-tree {
    bottom: 10px;
    right: 10px;
}

.region-card-container:hover .corner-mountain,
.region-card-container:hover .corner-tree {
    opacity: 1;
    transform: scale(1.2) rotate(15deg);
}

/* World Effects */
.world-effects {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.global-wave {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(135, 206, 235, 0.2), transparent);
    transform: rotate(45deg);
    transition: all 1s ease;
    opacity: 0;
}

.region-card-container:hover .global-wave {
    opacity: 1;
    left: 100%;
}

.earth-rays {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.earth-rays::before,
.earth-rays::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #87ceeb, transparent);
    animation: earth-ray 6s ease-in-out infinite;
}

.earth-rays::before {
    left: 35%;
    animation-delay: 0s;
}

.earth-rays::after {
    right: 45%;
    animation-delay: 3s;
}

@keyframes earth-ray {

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
    .region-card-container {
        padding: 20px;
        margin: 15px;
    }

    .region-emoji {
        font-size: 60px;
    }

    .region-name {
        font-size: 24px;
    }

    .info-card {
        padding: 12px;
    }

    .explore-world-btn {
        padding: 12px 24px;
        font-size: 16px;
    }
}

/* Special Region Classes */
.country-class {
    filter: drop-shadow(0 4px 8px rgba(65, 105, 225, 0.5));
}

.city-class {
    filter: drop-shadow(0 4px 8px rgba(135, 206, 235, 0.5));
}

.state-class {
    filter: drop-shadow(0 4px 8px rgba(32, 205, 50, 0.5));
}

.province-class {
    filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5));
}

.territory-class {
    filter: drop-shadow(0 4px 8px rgba(255, 99, 71, 0.5));
}

.island-class {
    filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.5));
}

.continent-class {
    filter: drop-shadow(0 4px 8px rgba(34, 139, 34, 0.5));
}

.region-class {
    filter: drop-shadow(0 4px 8px rgba(138, 43, 226, 0.5));
}

.capital-class {
    filter: drop-shadow(0 4px 8px rgba(255, 20, 147, 0.5));
}

.port-class {
    filter: drop-shadow(0 4px 8px rgba(0, 128, 128, 0.5));
}

.mountain-class {
    filter: drop-shadow(0 4px 8px rgba(139, 69, 19, 0.5));
}

.desert-class {
    filter: drop-shadow(0 4px 8px rgba(255, 165, 0, 0.5));
}

.forest-class {
    filter: drop-shadow(0 4px 8px rgba(0, 100, 0, 0.5));
}

.ocean-class {
    filter: drop-shadow(0 4px 8px rgba(0, 191, 255, 0.5));
}
</style>

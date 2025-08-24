<template>
    <nav class="kids-nav text-white shadow-lg relative overflow-hidden">
        <!-- Decorative Elements -->
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="star">⭐</div>
        <div class="star">🌟</div>
        <div class="star">✨</div>

        <div class="container mx-auto px-4 py-4 relative z-10">
            <div class="flex justify-between items-center">
                <router-link to="/"
                    class="text-2xl font-bold flex items-center hover:scale-105 transition-transform duration-300">
                    <span class="mr-3 flex-shrink-0">
                        <img src="@/assets/logo/fath-logo-white.png" alt="فذ"
                            class="h-16 sm:h-18 md:h-22 lg:h-25 w-auto">
                    </span>

                    <span
                        class="font-['Fredoka_One'] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                        عالم فَذ 
                    </span>
                </router-link>

                <div class="hidden md:flex space-x-4 ml-8">
                    <router-link v-for="(item, index) in navItems" :key="index" :to="item.path"
                        class="kids-nav-link px-4 py-3 text-lg font-bold flex items-center"
                        active-class="bg-white bg-opacity-30 border-white">
                        <span class="text-2xl mr-2">{{ item.icon }}</span>
                        {{ item.name }}
                    </router-link>
                </div>

                <button class="md:hidden text-3xl hover:scale-110 transition-transform duration-300"
                    @click="toggleMenu">
                    🍔
                </button>
            </div>

            <!-- Mobile menu -->
            <div v-if="isMenuOpen" class="md:hidden mt-4 pb-4 animate-fadeInUp">
                <router-link v-for="(item, index) in navItems" :key="index" :to="item.path"
                    class="block kids-nav-link px-4 py-3 text-lg font-bold mb-2 text-center"
                    active-class="bg-white bg-opacity-30 border-white" @click="isMenuOpen = false">
                    <span class="text-2xl mr-2">{{ item.icon }}</span>
                    {{ item.name }}
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isMenuOpen: false,
            navItems: [
                { name: '🐾 الحيوانات', path: '/animals', icon: '🐾' },
                { name: '⭐ الأجرام السماوية', path: '/celestial', icon: '⭐' },
                { name: '🌍 البلدان', path: '/countries', icon: '🌍' },
                { name: '🎉 الأحداث', path: '/events', icon: '🎉' },
                { name: '⚽ كرة القدم', path: '/football', icon: '⚽' },
                { name: '🌊 الأنهار', path: '/rivers', icon: '🌊' },
                { name: '🎭 المراحل', path: '/stages', icon: '🎭' }
            ]
        }
    },
    methods: {
        /*************  ✨ Windsurf Command ⭐  *************/
        /**
         * Toggles the state of the mobile menu.
         *
         * @return {void}
         */
        /*******  b48b35c9-c453-4b3b-8af5-450b1fc0cb42  *******/
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        }
    }
}
</script>

<style scoped>
.animate-fadeInUp {
    animation: fadeInUp 0.5s ease-out;
}
</style>

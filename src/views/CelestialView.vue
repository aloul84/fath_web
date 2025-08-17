<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Section Header -->
        <SectionHeader title="🌌 عالم الأجرام السماوية" subtitle="استكشف الأجرام والظواهر الكونية المدهشة!" />

        <!-- Search and Filter Section -->
        <div class="kids-card p-6 mb-8 text-center">
            <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div class="relative flex-1 max-w-md">
                    <input v-model="searchTerm" type="text" placeholder="🔍 ابحث عن جرم سماوي..."
                        class="w-full px-6 py-4 text-lg border-3 border-indigo-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all duration-300"
                        @input="resetPagination" />
                    <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">🔭</span>
                </div>

                <button @click="showFilters = !showFilters" class="kids-btn px-8 py-4 text-lg">
                    {{ showFilters ? 'إخفاء الفلاتر' : '⚙️ الفلاتر' }}
                </button>
            </div>

            <!-- Filters -->
            <div v-if="showFilters" class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeInUp">
                <select v-model="selectedType" @change="resetPagination"
                    class="px-4 py-3 text-lg border-2 border-purple-300 rounded-full focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300">
                    <option value="">🌍 جميع الأنواع</option>
                    <option value="planet">🪐 كوكب</option>
                    <option value="star">⭐ نجم</option>
                    <option value="galaxy">🌌 مجرة</option>
                    <option value="phenomenon">✨ ظاهرة</option>
                </select>

                <select v-model="selectedVisibility" @change="resetPagination"
                    class="px-4 py-3 text-lg border-2 border-blue-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300">
                    <option value="">👀 جميع الحالات</option>
                    <option value="visible">👁️ مرئي</option>
                    <option value="invisible">🌑 غير مرئي</option>
                </select>

                <button @click="clearFilters" class="kids-btn bg-gradient-to-r from-red-400 to-pink-500 px-6 py-3">
                    🗑️ مسح الفلاتر
                </button>
            </div>
        </div>

        <!-- Navigation Info -->
        <div v-if="!loading && filteredCelestials.length > 0" class="text-center mb-6 px-4">
            <div
                class="inline-flex flex-col md:flex-row items-center gap-2 md:gap-4 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 md:px-6 py-3 rounded-full max-w-full">
                <span class="text-sm md:text-lg font-bold text-indigo-700 text-center">
                    <span class="block md:inline">عرض {{ startIndex + 1 }} - {{ Math.min(startIndex + itemsPerPage,
                        filteredCelestials.length) }}</span>
                    <span class="block md:inline md:mr-2">من أصل {{ filteredCelestials.length }} جرم سماوي</span>
                </span>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
            <div class="kids-loading mx-auto mb-4"></div>
            <p class="text-2xl text-gray-600 font-bold">جاري تحميل الأجرام السماوية... 🌌</p>
        </div>

        <!-- Celestial Grid -->
        <div v-else-if="filteredCelestials.length > 0" class="relative">
            <button v-if="canGoPrevious" @click="previousPage"
                class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
                <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path>
                </svg>
                <span class="sr-only">الصفحة السابقة</span>
            </button>

            <button v-if="canGoNext" @click="nextPage"
                class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
                <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span class="sr-only">الصفحة التالية</span>
            </button>
            <!-- Celestials Grid -->
            <div class="flex justify-center">
                <div class="grid gap-8" :class="isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'">
                    <CelestialCard v-for="(celestial, index) in currentPageCelestials" :key="celestial.id"
                        :celestial="celestial" @click="showCelestialDetails(celestial)" class="animate-slideIn"
                        :class="isMobile ? 'mx-auto max-w-lg w-full' : 'w-full max-w-md'"
                        :style="{ animationDelay: `${index * 0.1}s` }" />
                </div>
            </div>

            <!-- Page Dots Navigation -->
            <div v-if="totalPages > 1" class="flex justify-center mt-8 gap-2">
                <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                    class="w-4 h-4 rounded-full transition-all duration-300 hover:scale-125" :class="page === currentPage
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md'
                        : 'bg-gray-300 hover:bg-gray-400'">
                    <span class="sr-only">صفحة {{ page }}</span>
                </button>
            </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-12">
            <div class="text-8xl mb-4 animate-bounce">😔</div>
            <h3 class="text-3xl font-bold text-gray-600 mb-2">لم نجد أجرام سماوية!</h3>
            <p class="text-xl text-gray-500 mb-6">جرب تغيير الفلاتر أو البحث بكلمات مختلفة</p>
            <button @click="clearFilters" class="kids-btn hover:animate-pulse">
                🔄 إعادة تعيين البحث
            </button>
        </div>
    </div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'
import CelestialCard from '@/components/CelestialCard.vue'
import celestial_objects_and_phenomena from '@/assets/json/celestial_objects_and_phenomena.js'

export default {
    components: {
        SectionHeader,
        CelestialCard
    },
    data() {
        return {
            celestials: [],
            loading: true,
            searchTerm: '',
            selectedType: '',
            selectedVisibility: '',
            showFilters: false,
            selectedCelestial: null,
            currentPage: 1,
            isMobile: false
        }
    },
    computed: {
        itemsPerPage() {
            return this.isMobile ? 1 : 6;
        },
        filteredCelestials() {
            let filtered = this.celestials;

            if (this.searchTerm) {
                filtered = filtered.filter(celestial =>
                    celestial.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                );
            }

            if (this.selectedType) {
                filtered = filtered.filter(celestial =>
                    celestial.type === this.selectedType
                );
            }

            if (this.selectedVisibility) {
                filtered = filtered.filter(celestial =>
                    celestial.visibility === this.selectedVisibility
                );
            }

            return filtered;
        },
        totalPages() {
            return Math.ceil(this.filteredCelestials.length / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        currentPageCelestials() {
            return this.filteredCelestials.slice(this.startIndex, this.startIndex + this.itemsPerPage);
        },
        // ADD THESE MISSING COMPUTED PROPERTIES:
        canGoPrevious() {
            return this.currentPage > 1;
        },
        canGoNext() {
            return this.currentPage < this.totalPages;
        }
    },
    methods: {
        async fetchCelestials() {
            try {
                this.loading = true;
                this.celestials = celestial_objects_and_phenomena;
            } catch (error) {
                console.error('Error fetching celestials:', error);
            } finally {
                this.loading = false;
            }
        },
        checkMobile() {
            this.isMobile = window.innerWidth < 768;
        },
        handleResize() {
            this.checkMobile();
            this.currentPage = 1;
        },
        clearFilters() {
            this.searchTerm = '';
            this.selectedType = '';
            this.selectedVisibility = '';
            this.resetPagination();
        },
        resetPagination() {
            this.currentPage = 1;
        },
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        showCelestialDetails(celestial) {
            this.selectedCelestial = celestial;
        },
        // ADD THESE MISSING METHODS:
        previousPage() {
            if (this.canGoPrevious) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.canGoNext) {
                this.currentPage++;
            }
        }
    },
    mounted() {
        this.fetchCelestials();
        this.checkMobile();
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    watch: {
        filteredCelestials() {
            if (this.currentPage > this.totalPages && this.totalPages > 0) {
                this.currentPage = 1;
            }
        }
    }
}
</script>

<style scoped>
/* same animations & kids theme as Animals page */
.animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
}

.animate-slideIn {
    animation: slideIn 0.5s ease-out forwards;
    opacity: 0;
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
}

.animate-scaleIn {
    animation: scaleIn 0.3s ease-out forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.kids-loading {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #6b5bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

<template>
    <div class="container mx-auto px-4 py-8">
        <SectionHeader title="🌊 الأنهار الكبرى" description="استكشف معلومات عن أهم الأنهار حول العالم" icon="waves" />

        <div class="p-6 mb-8 text-center bg-gray-100 rounded-xl shadow-inner">
            <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div class="relative flex-1 max-w-md">
                    <input v-model="searchTerm" type="text" placeholder="🔍 ابحث عن نهر..."
                        class="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all duration-300"
                        @input="resetPagination" />
                    <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
                </div>

                <button @click="showFilters = !showFilters"
                    class="px-8 py-4 text-lg font-semibold text-white bg-cyan-500 rounded-full hover:bg-cyan-600 transition-all duration-300">
                    {{ showFilters ? 'إخفاء الفلاتر' : '🔧 الفلاتر' }}
                </button>
            </div>

            <div v-if="showFilters" class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeInUp">
                <select v-model="selectedContinent" @change="resetPagination"
                    class="px-4 py-3 text-lg border-2 border-cyan-300 rounded-full focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all duration-300">
                    <option value="">🗺️ جميع القارات</option>
                    <option v-for="continent in uniqueContinents" :key="continent" :value="continent">{{ continent }}
                    </option>
                </select>

                <button @click="clearFilters"
                    class="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-red-500 hover:to-pink-600 transition-all duration-300">
                    🗑️ مسح الفلاتر
                </button>
            </div>
        </div>
        <div v-if="!loading && filteredRivers.length > 0" class="text-center mb-6 px-4">
            <div
                class="inline-flex flex-col md:flex-row items-center gap-2 md:gap-4 bg-gradient-to-r from-purple-100 to-pink-100 px-4 md:px-6 py-3 rounded-full max-w-full">
                <span class="text-sm md:text-lg font-bold text-purple-700 text-center">
                    <span class="block md:inline">عرض {{ startIndex + 1 }} - {{ Math.min(startIndex + itemsPerPage,
                        filteredRivers.length) }}</span>
                    <span class="block md:inline md:mr-2">من أصل {{ filteredRivers.length }} نهر</span>
                </span>
                <!-- Smart Pagination Dots - Only show limited number -->
                <div v-if="totalPages <= 10" class="flex gap-1 mt-2 md:mt-0">
                    <div v-for="page in totalPages" :key="page"
                        class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110"
                        :class="page === currentPage ? 'bg-purple-500 scale-125' : 'bg-purple-300'"
                        @click="goToPage(page)"></div>
                </div>
                <!-- Advanced Pagination for many pages -->
                <div v-else class="flex gap-1 mt-2 md:mt-0 items-center">
                    <!-- First page -->
                    <div class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110"
                        :class="1 === currentPage ? 'bg-purple-500 scale-125' : 'bg-purple-300'" @click="goToPage(1)">
                    </div>

                    <!-- Dots before current if needed -->
                    <span v-if="currentPage > 3" class="text-purple-400 text-xs">...</span>

                    <!-- Pages around current -->
                    <div v-for="page in visiblePages" :key="page"
                        class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110"
                        :class="page === currentPage ? 'bg-purple-500 scale-125' : 'bg-purple-300'"
                        @click="goToPage(page)"></div>

                    <!-- Dots after current if needed -->
                    <span v-if="currentPage < totalPages - 2" class="text-purple-400 text-xs">...</span>

                    <!-- Last page -->
                    <div v-if="totalPages > 1"
                        class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110"
                        :class="totalPages === currentPage ? 'bg-purple-500 scale-125' : 'bg-purple-300'"
                        @click="goToPage(totalPages)"></div>
                </div>
            </div>
        </div>



        <div v-if="loading" class="text-center py-12">
            <div class="w-16 h-16 border-4 border-cyan-400 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-2xl text-cyan-600 font-bold">جاري تحميل بيانات الأنهار...</p>
        </div>

        <div v-else-if="filteredRivers.length > 0" class="relative">
            <button v-if="canGoPrevious" @click="previousPage"
                class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-gradient-to-r from-cyan-500 to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
                <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path>
                </svg>
                <span class="sr-only">الصفحة السابقة</span>
            </button>

            <button v-if="canGoNext" @click="nextPage"
                class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-gradient-to-r from-teal-600 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
                <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span class="sr-only">الصفحة التالية</span>
            </button>

            <div class="flex justify-center">
                <div class="grid gap-8"
                    :class="isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'">
                    <RiversCard v-for="(river, index) in currentPageRivers" :key="river.name" :river="river"
                        class="animate-slideIn" :style="{ animationDelay: `${index * 0.1}s` }" />
                </div>
            </div>

            <div v-if="totalPages > 1" class="flex justify-center mt-8 gap-2">
                <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                    class="w-4 h-4 rounded-full transition-all duration-300 hover:scale-125" :class="page === currentPage
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 shadow-md'
                        : 'bg-gray-300 hover:bg-gray-400'">
                    <span class="sr-only">صفحة {{ page }}</span>
                </button>
            </div>
        </div>

        <div v-else class="text-center py-12">
            <div class="text-8xl mb-4 animate-bounce">😔</div>
            <h3 class="text-3xl font-bold text-gray-600 mb-2">لم نجد أي أنهار!</h3>
            <p class="text-xl text-gray-500 mb-6">جرب تغيير الفلاتر أو البحث بكلمات مختلفة</p>
            <button @click="clearFilters"
                class="px-6 py-3 font-semibold text-white bg-cyan-500 rounded-full hover:bg-cyan-600 transition-all duration-300 hover:animate-pulse">
                🔄 إعادة تعيين البحث
            </button>
        </div>
    </div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';
import RiversCard from '@/components/RiversCard.vue';
import riversData from '@/assets/json/rivers.js';

export default {
    components: {
        SectionHeader,
        RiversCard
    },
    data() {
        return {
            loading: true,
            rivers: [],
            searchTerm: '',
            selectedContinent: '',
            showFilters: false,
            currentPage: 1,
            isMobile: false
        };
    },
    computed: {
        itemsPerPage() {
            return this.isMobile ? 1 : 6;
        },
        filteredRivers() {
            let filtered = this.rivers;

            if (this.searchTerm) {
                const term = this.searchTerm.toLowerCase();
                filtered = filtered.filter(river =>
                    river.name.toLowerCase().includes(term)
                );
            }

            if (this.selectedContinent) {
                filtered = filtered.filter(river =>
                    river.continent.includes(this.selectedContinent)
                );
            }

            return filtered;
        },
        uniqueContinents() {
            const continents = new Set();
            this.rivers.forEach(river => {
                if (river.continent) {
                    river.continent.forEach(c => continents.add(c));
                }
            });
            return [...continents].sort();
        },
        totalPages() {
            return Math.ceil(this.filteredRivers.length / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        currentPageRivers() {
            return this.filteredRivers.slice(this.startIndex, this.startIndex + this.itemsPerPage);
        },
        canGoPrevious() {
            return this.currentPage > 1;
        },
        canGoNext() {
            return this.currentPage < this.totalPages;
        }
    },
    async mounted() {
        this.fetchRivers();
        this.checkMobile();
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    watch: {
        filteredRivers() {
            if (this.currentPage > this.totalPages && this.totalPages > 0) {
                this.currentPage = 1;
            }
        }
    },
    methods: {
        async fetchRivers() {
            try {
                this.loading = true;
                this.rivers = riversData.map(river => ({
                    ...river,
                    icon: river.icon || '🌊'
                }));
            } catch (error) {
                console.error('Error loading rivers data:', error);
            } finally {
                this.loading = false;
            }
        },
        checkMobile() {
            this.isMobile = window.innerWidth < 768; // Tailwind's `md` breakpoint
        },
        handleResize() {
            this.checkMobile();
            this.resetPagination();
        },
        clearFilters() {
            this.searchTerm = '';
            this.selectedContinent = '';
            this.resetPagination();
        },
        resetPagination() {
            this.currentPage = 1;
        },
        nextPage() {
            if (this.canGoNext) {
                this.currentPage++;
            }
        },
        previousPage() {
            if (this.canGoPrevious) {
                this.currentPage--;
            }
        },
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        }
    }
};
</script>

<style scoped>
/* Add the keyframes from the AnimalCard page */
.animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
}

.animate-slideIn {
    animation: slideIn 0.5s ease-out forwards;
    opacity: 0;
}

.animate-bounce {
    animation: bounce 1s infinite;
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

@keyframes bounce {

    0%,
    100% {
        transform: translateY(-5%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
}
</style>

This video provides an excellent guide on refactoring Vue components from the Options API to the Composition API, a
common task when modernizing Vue applications.

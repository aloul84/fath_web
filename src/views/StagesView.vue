<template>
    <div class="container mx-auto px-4 py-8">
        <SectionHeader title="⏳ مراحل النمو البشري" description="استكشف المراحل المختلفة للتطور البشري"
            icon="timeline" />

        <div class="p-6 mb-8 text-center bg-gray-100 rounded-xl shadow-inner">
            <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div class="relative flex-1 max-w-md">
                    <input v-model="searchTerm" type="text" placeholder="🔍 ابحث عن مرحلة..."
                        class="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300"
                        @input="resetPagination" />
                    <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
                </div>

                <button @click="showFilters = !showFilters"
                    class="px-8 py-4 text-lg font-semibold text-white bg-purple-500 rounded-full hover:bg-purple-600 transition-all duration-300">
                    {{ showFilters ? 'إخفاء الفلاتر' : '🔧 الفلاتر' }}
                </button>
            </div>

            <div v-if="showFilters" class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeInUp">
                <select v-model="selectedCategory" @change="resetPagination"
                    class="px-4 py-3 text-lg border-2 border-purple-300 rounded-full focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300">
                    <option value="">👶 جميع الفئات</option>
                    <option value="infancy">الطفولة المبكرة</option>
                    <option value="childhood">الطفولة</option>
                    <option value="adolescence">المراهقة</option>
                    <option value="adulthood">الشباب</option>
                    <option value="old age">الشيخوخة</option>
                </select>

                <button @click="clearFilters"
                    class="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-red-500 hover:to-pink-600 transition-all duration-300">
                    🗑️ مسح الفلاتر
                </button>
            </div>
        </div>

        <div v-if="!loading && filteredStages.length > 0" class="text-center mb-6 px-4">
            <div
                class="inline-flex flex-col md:flex-row items-center gap-2 md:gap-4 bg-gradient-to-r from-purple-100 to-pink-100 px-4 md:px-6 py-3 rounded-full max-w-full">
                <span class="text-sm md:text-lg font-bold text-purple-700 text-center">
                    <span class="block md:inline">عرض {{ startIndex + 1 }} - {{ Math.min(startIndex + itemsPerPage,
                        filteredStages.length) }}</span>
                    <span class="block md:inline md:mr-2">من أصل {{ filteredStages.length }} مرحلة</span>
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
            <div class="w-16 h-16 border-4 border-purple-400 border-dashed rounded-full animate-spin mx-auto mb-4">
            </div>
            <p class="text-2xl text-purple-600 font-bold">جاري تحميل المراحل...</p>
        </div>

        <div v-else-if="filteredStages.length > 0" class="relative">
            <button v-if="canGoPrevious" @click="previousPage"
                class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
                <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path>
                </svg>
                <span class="sr-only">الصفحة السابقة</span>
            </button>

            <button v-if="canGoNext" @click="nextPage"
                class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-gradient-to-r from-pink-600 to-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
                <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span class="sr-only">الصفحة التالية</span>
            </button>

            <div class="flex justify-center">
                <div class="grid gap-8"
                    :class="isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'">
                    <StagesCard v-for="(stage, index) in currentPageStages" :key="stage.name" :stage="stage"
                        class="animate-slideIn" :style="{ animationDelay: `${index * 0.1}s` }" />
                </div>
            </div>

            <div v-if="totalPages > 1" class="flex justify-center mt-8 gap-2">
                <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                    class="w-4 h-4 rounded-full transition-all duration-300 hover:scale-125" :class="page === currentPage
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-md'
                        : 'bg-gray-300 hover:bg-gray-400'">
                    <span class="sr-only">صفحة {{ page }}</span>
                </button>
            </div>
        </div>

        <div v-else class="text-center py-12">
            <div class="text-8xl mb-4 animate-bounce">😔</div>
            <h3 class="text-3xl font-bold text-gray-600 mb-2">لم نجد أي مراحل!</h3>
            <p class="text-xl text-gray-500 mb-6">جرب تغيير الفلاتر أو البحث بكلمات مختلفة</p>
            <button @click="clearFilters"
                class="px-6 py-3 font-semibold text-white bg-purple-500 rounded-full hover:bg-purple-600 transition-all duration-300 hover:animate-pulse">
                🔄 إعادة تعيين البحث
            </button>
        </div>
    </div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';
import StagesCard from '@/components/StagesCard.vue';
import stagesData from '@/assets/json/stages.js';

export default {
    components: {
        SectionHeader,
        StagesCard
    },
    data() {
        return {
            loading: true,
            stages: [],
            searchTerm: '',
            selectedCategory: '',
            showFilters: false,
            currentPage: 1,
            isMobile: false
        };
    },
    computed: {
        itemsPerPage() {
            return this.isMobile ? 1 : 6;
        },
        filteredStages() {
            let filtered = this.stages;

            if (this.searchTerm) {
                const term = this.searchTerm.toLowerCase();
                filtered = filtered.filter(stage =>
                    stage.name.toLowerCase().includes(term) ||
                    (stage.description && stage.description.toLowerCase().includes(term))
                );
            }

            if (this.selectedCategory) {
                filtered = filtered.filter(stage =>
                    stage.category === this.selectedCategory
                );
            }

            return filtered;
        },
        totalPages() {
            return Math.ceil(this.filteredStages.length / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        currentPageStages() {
            return this.filteredStages.slice(this.startIndex, this.startIndex + this.itemsPerPage);
        },
        canGoPrevious() {
            return this.currentPage > 1;
        },
        canGoNext() {
            return this.currentPage < this.totalPages;
        }
    },
    async mounted() {
        this.fetchStages();
        this.checkMobile();
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    watch: {
        filteredStages() {
            if (this.currentPage > this.totalPages && this.totalPages > 0) {
                this.currentPage = 1;
            }
        }
    },
    methods: {
        async fetchStages() {
            try {
                this.loading = true;
                this.stages = stagesData.map(stage => ({
                    ...stage,
                    icon: stage.icon || '👶'
                }));
            } catch (error) {
                console.error('Error loading stages data:', error);
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
            this.selectedCategory = '';
            this.showFilters = false;
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

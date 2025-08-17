<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Section Header -->
        <SectionHeader title="📜 الأحداث التاريخية" subtitle="اكتشف أبرز الأحداث التي شكلت حضارتنا!" />

        <!-- Search + Filters -->
        <div class="kids-card p-6 mb-8 text-center">
            <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
                <!-- Search -->
                <div class="relative flex-1 max-w-md">
                    <input v-model="searchTerm" type="text" placeholder="🔍 ابحث عن حدث..."
                        class="w-full px-6 py-4 text-lg border-3 border-yellow-300 rounded-full focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200 transition-all duration-300"
                        @input="resetPagination" />
                    <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
                </div>

                <button @click="showFilters = !showFilters" class="kids-btn px-8 py-4 text-lg">
                    {{ showFilters ? "إخفاء الفلاتر" : "⚙️ الفلاتر" }}
                </button>
            </div>

            <!-- Filters -->
            <div v-if="showFilters" class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeInUp">
                <select v-model="selectedRegion" @change="resetPagination"
                    class="px-4 py-3 text-lg border-2 border-blue-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300">
                    <option value="">🌍 جميع المناطق</option>
                    <option value="middle-east">🏜️ الشرق الأوسط</option>
                    <option value="europe">🏰 أوروبا</option>
                    <option value="asia">⛩️ آسيا</option>
                    <option value="africa">🌍 أفريقيا</option>
                </select>

                <select v-model="selectedEra" @change="resetPagination"
                    class="px-4 py-3 text-lg border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300">
                    <option value="">⏳ جميع العصور</option>
                    <option value="ancient">🏺 قديم</option>
                    <option value="medieval">⚔️ وسـيط</option>
                    <option value="modern">🚂 حديث</option>
                </select>

                <button @click="clearFilters" class="kids-btn bg-gradient-to-r from-red-400 to-pink-500 px-6 py-3">
                    🗑️ مسح الفلاتر
                </button>
            </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-12">
            <div class="kids-loading mx-auto mb-4"></div>
            <p class="text-2xl text-gray-600 font-bold">جاري تحميل الأحداث... ⏳</p>
        </div>

        <!-- Events Content -->
        <div v-else-if="filteredEvents.length > 0">
            <!-- Results Info -->
            <div class="text-center mb-6 px-4">
                <div
                    class="inline-flex flex-col md:flex-row items-center gap-2 md:gap-4 bg-gradient-to-r from-purple-100 to-pink-100 px-4 md:px-6 py-3 rounded-full max-w-full">
                    <span class="text-sm md:text-lg font-bold text-purple-700 text-center">
                        <span class="block md:inline">عرض {{ startIndex + 1 }} - {{ Math.min(startIndex + itemsPerPage,
                            filteredEvents.length) }}</span>
                        <span class="block md:inline md:mr-2">من أصل {{ filteredEvents.length }} حدث</span>
                    </span>
                    <!-- Smart Pagination Dots -->
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
                            :class="1 === currentPage ? 'bg-purple-500 scale-125' : 'bg-purple-300'"
                            @click="goToPage(1)">
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

            <!-- Events Grid with Navigation -->
            <div class="relative">
                <!-- Navigation Buttons -->
                <button v-if="canGoPrevious" @click="previousPage"
                    class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all">
                    <svg class="w-6 h-6 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <button v-if="canGoNext" @click="nextPage"
                    class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-gradient-to-r from-orange-600 to-red-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all">
                    <svg class="w-6 h-6 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <!-- Events Grid -->
                <div class="flex justify-center">
                    <div class="grid gap-8"
                        :class="isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'">
                        <EventsCard v-for="(event, index) in currentPageEvents" :key="event.id" :event="event"
                            @click="showEventDetails" class="animate-slideIn"
                            :class="isMobile ? 'mx-auto max-w-lg w-full' : 'w-full max-w-md'"
                            :style="{ animationDelay: `${index * 0.1}s` }" />
                    </div>
                </div>

                <!-- Bottom Pagination -->
                <div v-if="totalPages > 1" class="flex justify-center mt-8 gap-2">
                    <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                        class="w-4 h-4 rounded-full transition-all duration-300 hover:scale-125"
                        :class="page === currentPage ? 'bg-gradient-to-r from-yellow-500 to-red-500 shadow-md' : 'bg-gray-300 hover:bg-gray-400'">
                        <span class="sr-only">صفحة {{ page }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-12">
            <div class="text-8xl mb-4 animate-bounce">😔</div>
            <h3 class="text-3xl font-bold text-gray-600 mb-2">لم نجد أحداث!</h3>
            <p class="text-xl text-gray-500 mb-6">جرب تغيير الفلاتر أو البحث بكلمات مختلفة</p>
            <button @click="clearFilters" class="kids-btn hover:animate-pulse">🔄 إعادة تعيين البحث</button>
        </div>

        <!-- Event Details Modal -->
    </div>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue";
import EventsCard from "@/components/EventsCard.vue";
import events from "@/assets/json/events.js";

export default {
    components: { SectionHeader, EventsCard },
    data() {
        return {
            events: [],
            loading: true,
            searchTerm: "",
            selectedRegion: "",
            selectedEra: "",
            showFilters: false,
            selectedEvent: null,
            currentPage: 1,
            isMobile: false,
        };
    },
    computed: {
        itemsPerPage() {
            return this.isMobile ? 1 : 6;
        },
        filteredEvents() {
            let filtered = this.events;
            if (this.searchTerm) {
                filtered = filtered.filter((e) =>
                    e.title.toLowerCase().includes(this.searchTerm.toLowerCase())
                );
            }
            if (this.selectedRegion) {
                filtered = filtered.filter((e) => e.region === this.selectedRegion);
            }
            if (this.selectedEra) {
                filtered = filtered.filter((e) => e.era === this.selectedEra);
            }
            return filtered;
        },
        totalPages() {
            return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        currentPageEvents() {
            return this.filteredEvents.slice(this.startIndex, this.startIndex + this.itemsPerPage);
        },
        canGoPrevious() {
            return this.currentPage > 1;
        },
        canGoNext() {
            return this.currentPage < this.totalPages;
        },
        visiblePages() {
            const current = this.currentPage;
            const total = this.totalPages;
            const pages = [];

            // Show pages around current page
            const start = Math.max(2, current - 1);
            const end = Math.min(total - 1, current + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            return pages;
        },
    },
    methods: {
        async fetchEvents() {
            try {
                this.loading = true;
                this.events = events;
            } catch (e) {
                console.error("Error loading events:", e);
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
            this.searchTerm = "";
            this.selectedRegion = "";
            this.selectedEra = "";
            this.resetPagination();
        },
        resetPagination() {
            this.currentPage = 1;
        },
        nextPage() {
            if (this.canGoNext) this.currentPage++;
        },
        previousPage() {
            if (this.canGoPrevious) this.currentPage--;
        },
        goToPage(p) {
            if (p >= 1 && p <= this.totalPages) this.currentPage = p;
        },
        showEventDetails(event) {
            this.selectedEvent = event;
        },
    },
    mounted() {
        this.fetchEvents();
        this.checkMobile();
        window.addEventListener("resize", this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.handleResize);
    },
};
</script>

<style scoped>
/* same animations as your animals view */
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
    border-top: 4px solid #f59e0b;
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

<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
        <div class="p-6">
            <div class="flex justify-between items-start">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ title }}</h3>
                <span v-if="badge" class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{{ badge }}</span>
            </div>

            <div class="mt-4 space-y-2">
                <div v-for="(value, key) in data" :key="key" class="flex">
                    <span class="text-gray-600 font-medium w-1/3">{{ formatKey(key) }}:</span>
                    <span class="text-gray-800 flex-1">{{ value }}</span>
                </div>
            </div>

            <div v-if="notes" class="mt-4 p-3 bg-blue-50 rounded-lg">
                <p class="text-blue-800">{{ notes }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        data: {
            type: Object,
            required: true
        },
        notes: {
            type: String,
            default: ''
        },
        badge: {
            type: String,
            default: ''
        }
    },
    methods: {
        formatKey(key) {
            // Convert camelCase or snake_case to spaced words
            return key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/^./, str => str.toUpperCase())
        }
    }
}
</script>

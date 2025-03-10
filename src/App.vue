<script setup>
import { useRoute } from 'vue-router'
import Layout from '../src/components/LayOut.vue'
import { computed } from 'vue'

const route = useRoute()
const routeKey = computed(() => route.fullPath) // Force re-render on route change
</script>

<template>
  <Layout :key="routeKey" />
</template>

<style scoped></style>

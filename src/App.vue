<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useTimeSlotStore } from './stores/timeSlotStore';
import AppHeader from "./components/AppHeader.vue";
import TimeSlotsCalendar from "./components/TimeSlotsCalendar.vue";
import TimeSlotPanel from "./components/TimeSlotPanel.vue";
import PageTitleBar from './components/PageTitleBar.vue';

const store = useTimeSlotStore();

onMounted(() => {
  store.startSSE();
});

onUnmounted(() => {
  store.closeSSE(); 
});
</script>

<template>
  <AppHeader />
  <main class="flex min-h-screen flex-col px-6 lg:px-12">
    <PageTitleBar />
    <TimeSlotsCalendar />
    <TimeSlotPanel />
  </main>
</template>

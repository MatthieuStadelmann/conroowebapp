<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
import HeaderSection from "./components/HeaderSection.vue";
import TimeSlots from "./components/TimeSlots.vue";
import SlotPanel from "./components/SlotPanel.vue";
</script>

<template>
  <AppHeader />
  <main class="px-6 lg:px-12">
    <HeaderSection />
    <TimeSlots />
    <SlotPanel />
  </main>
</template>

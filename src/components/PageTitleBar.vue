<script setup lang="ts">
import ConnectionStatus from "./UI/ConnectionStatus.vue";
</script>

<template>
  <div class="flex flex-col-reverse border-b-2 border-primary py-10 lg:flex-row lg:justify-between">
    <h1 class="mt-4 text-4xl font-bold lg:mt-0">
      Trucking Web App
    </h1>
    <ConnectionStatus />
  </div>
</template>

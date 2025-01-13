<script setup lang="ts">
import logoSrc from "../assets/logo.svg";
</script>
<template>
  <header class="bg-primary px-12 py-6 text-white shadow-md">
    <div class="mx-auto">
      <a href="/"><img :src="logoSrc" alt="Logo" class="h-6 w-auto" /></a>
    </div>
  </header>
</template>

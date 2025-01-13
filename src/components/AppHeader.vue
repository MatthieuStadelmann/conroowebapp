<script setup lang="ts">
import logoSrc from "../assets/logo.svg";
</script>
<template>
  <header class="bg-primary px-6 py-6 text-white shadow-md lg:px-12">
    <div class="mx-auto">
      <a href="/"><img :src="logoSrc" alt="Logo" class="h-6 w-auto" /></a>
    </div>
  </header>
</template>

<template>
  <div>
    <div v-if="komponen == 'NamaPage'" class="nama">
      <NamaPage />
    </div>
    <div class="home">
      <HomePage />
    </div>
  </div>
</template>

<script>
import app from '@/assets/js'
export default app
</script>

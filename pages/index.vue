<template>
  <div>
    <div v-if="komponen == 'NamaPage'" class="nama">
      <transition
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
        mode="out-in"
      >
        <NamaPage />
      </transition>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');
</style>

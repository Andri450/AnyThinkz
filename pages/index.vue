<template>
  <div>
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
      mode="out-in"
    >
      <component :is="komponen" />
    </transition>
  </div>
</template>

<script>
import app from '@/assets/js'
export default app
</script>

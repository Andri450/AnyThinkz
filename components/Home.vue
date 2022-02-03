<template>
  <div>
    <b-container>
      <client-only>
        <b-row>
          <b-col cols="12" class="mt-28 sapaan">
            <p>Hallo, {{ nama }}</p>
          </b-col>
        </b-row>
        <transition
          enter-active-class="animate__animated animate__backInRight"
          leave-active-class="animate__animated animate__backOutRight"
          mode="out-in"
        >
          <component :is="KomponenAtas" />
        </transition>
      </client-only>

      <div class="status animate__animated animate__bounce">
        <button v-if="refresh" @click="refresh_halaman()">
          {{ isi_refresh }}
        </button>
        <table>
          <thead>
            <tr>
              <td />
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="data in ShowDats" :key="data.key" class="s p-10 mb-20">
              <td>
                <p v-html="data.isi" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-container>
  </div>
</template>

<script>
import app from '@/assets/js/home.js'
export default app
</script>

<style>
  @import '@/assets/style/home.css';
</style>

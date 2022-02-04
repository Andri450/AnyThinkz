<template>
  <div>
    <b-container>
      <client-only>
        <div class="komponen-atas">
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
        </div>
      </client-only>

      <div class="status">
        <button v-if="refresh" @click="refresh_halaman()">
          {{ isi_refresh }}
        </button>
        <transition-group
          enter-active-class="animate__animated animate__backInRight"
          leave-active-class="animate__animated animate__backOutRight"
          mode="out-in"
        >
          <div v-for="data in ShowDats" :key="data.key" class="s p-10 mb-20">
            <div class="box-status w-100">
              <b-row>
                <b-col cols="12" class="header-status">
                  <h5>anonim</h5>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="main-status">
                  <p v-html="data.isi" />
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="foot-status">
                  <label>lope komen share</label>
                </b-col>
              </b-row>
            </div>
          </div>
        </transition-group>
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

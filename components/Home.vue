<template>
  <div>
    <b-container>
      <client-only>
        <div class="komponen-atas p-2">
          <b-row>
            <b-col cols="12" class="mt-16 sapaan animate__animated animate__fadeInDown">
              <p>
                Hallo, <span class="sapaan-nama animate__animated animate__fadeInRight animate__delay-1s">{{ nama }}</span>
              </p>
            </b-col>
          </b-row>
          <transition
            enter-active-class="animate__animated animate__fadeInRight"
            leave-active-class="animate__animated animate__fadeOutRight"
            mode="out-in"
          >
            <component :is="KomponenAtas" />
          </transition>
        </div>
      </client-only>

      <b-row>
        <div class="status p-2" :class="{ 'sts-cari': KomponenAtas === 'SearchStatus', 'sts-post': KomponenAtas === 'TulisStatus'}">
          <button v-if="refresh" @click="refresh_halaman()">
            {{ isi_refresh }}
          </button>
          <transition-group
            enter-active-class="animate__animated animate__fadeInDown"
            leave-active-class="animate__animated animate__fadeOutUp"
            mode="out-in"
          >
            <div v-for="data in ShowDats" :id="data.key" :key="data.key" class="s p-10 mb-20">
              <div class="box-status w-100">
                <b-row>
                  <b-col cols="12" class="header-status">
                    <h5>Anonim</h5>
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
      </b-row>
      <b-row>
        <div class="nav">
          <b-col>
            <p class="">
              Home
            </p>
          </b-col>
          <b-col>
            <p class="">
              Inbox
            </p>
          </b-col>
          <b-col>
            <p class="" @click="ganti_komponen_atas()">
              Post
            </p>
          </b-col>
          <b-col>
            <p class="">
              notif
            </p>
          </b-col>
          <b-col>
            <p class="">
              Akun
            </p>
          </b-col>
        </div>
      </b-row>
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

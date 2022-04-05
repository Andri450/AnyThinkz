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
        <div v-if="refresh" class="col-12 bungkus-refresh" :class="{ 'refresh-cari': KomponenAtas === 'SearchStatus', 'refresh-tulis': KomponenAtas === 'TulisStatus'}">
          <b-button class="btn-refresh btn-primary" @click="refresh_halaman()">
            {{ isi_refresh }}
          </b-button>
        </div>
        <div class="status p-2" :class="{ 'sts-cari': KomponenAtas === 'SearchStatus', 'sts-post': KomponenAtas === 'TulisStatus'}">
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
        <div class="nav animate__animated animate__fadeInUp">
          <b-col>
            <div class="homebtn">
              <i class="fas fa-home" />
            </div>
          </b-col>
          <b-col>
            <div class="inbox">
              <i class="fas fa-message" />
            </div>
          </b-col>
          <div class="animate__animated animate__fadeInDown">
            <div class="btn-plusclose" :class="{ 'plus': KomponenAtas === 'SearchStatus', 'xclose': KomponenAtas === 'TulisStatus'}" @click="ganti_komponen_atas()">
              <i class="fas fa-plus" />
            </div>
          </div>
          <b-col>
            <div class="notif">
              <i class="fas fa-bell" />
            </div>
          </b-col>
          <b-col>
            <div class="akun">
              <i class="fas fa-user" />
            </div>
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
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
</style>

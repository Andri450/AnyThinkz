<template>
  <div>
    <div class="komponen-search">
      <b-row>
        <b-col cols="12">
          <label>Cari topik yang ingin kamu baca</label>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="10">
          <b-form-input v-model="search_status" placeholder="cari topik yang diinginkan..." />
        </b-col>
        <b-col cols="col">
          <b-button class="btn btn-cari" @click="Search()">
            cari
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-dropdown id="dropdownMenuButton" block :text="sort_status">
            <b-dropdown-item :active="cek_aktif('postingan terbaru')" @click="klik_dropdown('postingan terbaru')">
              postingan terbaru
            </b-dropdown-item>
            <b-dropdown-item :active="cek_aktif('postingan terlama')" @click="klik_dropdown('postingan terlama')">
              postingan terlama
            </b-dropdown-item>
            <b-dropdown-item :active="cek_aktif('postingan terpopuler')" @click="klik_dropdown('postingan terpopuler')">
              postingan terpopuler
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import app from '@/assets/js/sub_js/SearchStatus.js'
export default app
</script>

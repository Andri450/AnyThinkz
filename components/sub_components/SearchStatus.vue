<template>
  <div>
    <div class="komponen-search">
      <b-row>
        <b-col cols="12">
          <p>Cari topik yang ingin kamu baca</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="10">
          <b-form-input placeholder="cari topik yang diinginkan..." />
        </b-col>
        <b-col cols="col">
          <b-button class="btn btn-cari" @click="pindah">
            cari
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-dropdown id="dropdownMenuButton" block text="postingan terbaru">
            <b-dropdown-item active>
              postingan terbaru
            </b-dropdown-item>
            <b-dropdown-item>postingan terlama</b-dropdown-item>
            <b-dropdown-item>
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

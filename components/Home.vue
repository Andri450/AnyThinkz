<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12" class="mt-28 sapaan">
          <p>Hallo, {{ nama }}</p>
        </b-col>
      </b-row>
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
          <b-button class="btn-cari p-3">
            cari
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-dropdown id="dropdownMenuButton" block text="postingan terbaru" class="dd">
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
      <client-only v-if="tulis">
        <vue-editor
          v-model="status.isi"
          class="mention-input__input-item-container relative"
          :editor-toolbar="customToolbar"
          :editor-options="d_editorOptions"
        />
        <button @click="kirim()">
          Kirim
        </button>
        <button v-if="refresh" @click="refresh_halaman()">
          {{ isi_refresh }}
        </button>
        <p>{{ status.penulis }}</p>
      </client-only>
      <div v-if="tulis">
        <table>
          <thead>
            <tr>
              <td />
            </tr>
          </thead>
          <tbody class="">
            <!-- <transition-group
            enter-active-class="animate__animated animate__fadeInDown"
            leave-active-class="animate__animated animate__fadeOutUp"
            mode="out-in"
          > -->
            <tr v-for="data in ShowDats" :key="data.key" class="s p-10 mb-20">
              <td>
                <p v-html="data.isi" />
              </td>
            </tr>
          <!-- </transition-group> -->
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

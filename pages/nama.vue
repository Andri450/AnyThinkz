<template>
  <b-container class="tess">
  <b-row>
    <b-col cols="12" class="mt-68"><p class="big-text dark-purple-color">Selamat datang di AnyThinkz.</p></b-col>
  </b-row>

  <b-row>
      <b-img src="@/assets/images/peep-78.svg" class="mx-auto mt-36" fluid alt="Center image"></b-img>
  </b-row>
  <b-row>
    <b-col  class="mt-16" cols="12"><p class="secondary-text dark-purple-color mb-1"><b>Hai ! , di AnyThinkz kamu bisa ceritakan apapun tanpa perlu takut identitasmu diketahui oleh publik</b></p></b-col>
    <b-col  class="mt-16" cols="12"><p class="secondary-text grey">* Tulis nama samaran kamu di bawah ini,agar Minthinkz mudah menyapamu :)</p></b-col>
    <b-col  class="mt-28 mb-5" cols="12">
      <b-form-input v-model="text" placeholder="nama samaran kamu..."></b-form-input>
      <b-button block class="mt-20 p-3 button-block-submit orange">Lanjutkan</b-button></b-col>
  </b-row>

  </b-container>
</template>

<script>
import '@/assets/style/coba.css'

export default {
  name: 'NamaPage'
}
</script>

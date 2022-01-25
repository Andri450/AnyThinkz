<template>
  <div class="bungkus">
    <b-container class="tess">
      <b-row>
        <b-col cols="12" class="mt-68">
          <p class="big-text dark-purple-color">
            Selamat datang di AnyThinkz.
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-img src="@/assets/images/peep-78.svg" class="mx-auto mt-36" fluid alt="Center image" />
      </b-row>
      <b-row>
        <b-col class="mt-16" cols="12">
          <p class="secondary-text dark-purple-color mb-1">
            <b>Hai ! , di AnyThinkz kamu bisa ceritakan apapun tanpa perlu takut identitasmu diketahui oleh publik</b>
          </p>
        </b-col>
        <b-col class="mt-16" cols="12">
          <p class="secondary-text grey">
            * Tulis nama samaran kamu di bawah ini,agar Minthinkz mudah menyapamu :)
          </p>
        </b-col>
        <b-col class="mt-28 mb-5" cols="12">
          <b-form-input v-model="usr.nama" placeholder="nama samaran kamu..." />
          <b-button block class="mt-20 p-3 button-block-submit orange" @click="simpan()">
            Lanjutkan
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'NamaPage',
  data () {
    return {
      usr: {
        nama: ''
      }
    }
  },
  methods: {
    simpan () {
      const user = this.$fireModule.database().ref('tb_users')
      user.child(localStorage.getItem('IDu')).update(this.usr).then(() => {
        this.$store.commit('updateHalaman', 'HomePage')
        localStorage.nama = this.usr.nama
      }).catch((err) => {
        alert(err)
      })
    }
  }
}
</script>

<style scoped>
  @import '@/assets/style/coba.css';
</style>

<style scoped>
  /* .modal-backdrop {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
  .bungkus{
    position: fixed;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    overflow-y: scroll;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
.tess::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.tess {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>

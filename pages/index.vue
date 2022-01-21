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
import 'animate.css'
import NamaPage from './../components/Nama.vue'
import HomePage from './../components/Home.vue'

export default {
  name: 'IndexPage',
  components: {
    HomePage,
    NamaPage
  },
  data () {
    return {
      id: '',
      tanya_nama: 'sa',
      komponen: 'NamaPage'
    }
  },
  created () {
    this.cek_data()
  },
  beforeMount () {

  },
  methods: {
    cek_data () {
      // alert('oke')
    }
  }
}

</script>

import 'Vuex'
import 'animate.css'
import NamaPage from '@/components/Nama.vue'
import HomePage from '@/components/Home.vue'

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
      komponen: '',
      user_c: {
        Singularitas: '',
        nama: '',
        aktif: 'T'
      }
    }
  },
  created () {
    this.komponen = this.$store.getters.gethalaman
  },
  beforeMount () {
    setInterval(() => {
      if (localStorage.getItem('IDu') !== this.$store.getters.getIDu || localStorage.getItem('Singularitas') !== this.$store.getters.getSingular) {
        this.cek_identitas()
      }
    }, 1000)
  },
  mounted () {
  },
  methods: {
    cek_identitas () {
      if (window) {
        if (localStorage.getItem('IDu')) {
          if (localStorage.getItem('Singularitas')) {
            const user = this.$fireModule.database().ref('tb_users')
            user.child(localStorage.getItem('IDu')).get().then((data) => {
              if (data.val().Singularitas !== localStorage.getItem('Singularitas')) {
                this.buat_identitas()
              } else {
                this.user_c.nama = data.val().nama
                localStorage.nama = data.val().nama
                this.cek_nama()
              }
            }).catch((err) => {
              if (err.message.includes('Cannot read properties of null')) {
                this.buat_identitas()
              } else if (err.message.includes('Client is offline')) {
                this.$toast.error('Koneksi tidak stabil', {
                  position: 'top-center',
                  timeout: 5000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: true,
                  draggable: true,
                  draggablePercent: 0.6,
                  showCloseButtonOnHover: false,
                  hideProgressBar: false,
                  closeButton: 'button',
                  icon: true,
                  rtl: false
                })
              }
            })
          } else {
            this.buat_identitas()
          }
        } else {
          this.buat_identitas()
        }
      }
    },
    buat_identitas () {
      localStorage.removeItem('IDu')
      localStorage.removeItem('Singularitas')
      localStorage.removeItem('nama')
      localStorage.clear()

      const d = new Date()
      const dat = d.getDay().toString() + d.getMilliseconds().toString() + d.getFullYear().toString() + d.getSeconds().toString() + d.getMonth().toString() + d.getMinutes().toString()
      const singular = Math.round(new Date().getTime() / 1000)
      this.user_c.Singularitas = dat + singular

      const user = this.$fireModule.database().ref('tb_users')
      user.push(this.user_c).then((dats) => {
        localStorage.IDu = dats.key
        localStorage.Singularitas = dat + singular
        this.$store.commit('updateIDu', dats.key)
        this.$store.commit('updateSingular', dat + singular)
        localStorage.nama = ''
        this.user_c.nama = ''
      })

      this.cek_nama()
    },
    cek_nama () {
      if (this.user_c.nama !== '') {
        this.$store.commit('updateHalaman', 'HomePage')
        this.komponen = 'HomePage'
      } else {
        this.$store.commit('updateHalaman', 'NamaPage')
        this.komponen = 'NamaPage'
      }
    }
  },
  updated () {
    // console.log('update')
  },
  watch: {
    '$store.state.halaman': {
      handler (dat) {
        this.komponen = dat
      }
    }
  }
}

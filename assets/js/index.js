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
    this.cek_identitas()
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
              if (err === 'Error: Error: Client is offline.') {
                console.log(err.error)
                alert(err)
              } else {
                console.log(err.code)
                alert(err.code)
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
  watch: {
    '$store.state.halaman': {
      handler (dat) {
        this.komponen = dat
      }
    }
  }
}

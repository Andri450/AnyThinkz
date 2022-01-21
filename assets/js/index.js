
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
    this.cek_identitas()
  },
  beforeMount () {

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
              alert(err)
              this.buat_identitas()
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
      this.user_c.Singularitas = dat

      const user = this.$fireModule.database().ref('tb_users')
      user.push(this.user_c).then((dats) => {
        localStorage.IDu = dats.key
        localStorage.Singularitas = dat
        localStorage.nama = ''
        this.user_c.nama = ''
      })

      this.cek_nama()
    },
    cek_nama () {
      if (this.user_c.nama !== '') {
        this.komponen = 'HomePage'
      } else {
        this.komponen = 'NamaPage'
      }
    }
  }
}

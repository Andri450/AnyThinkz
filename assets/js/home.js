import SearchStatus from '@/components/sub_components/SearchStatus.vue'
import TulisStatus from '@/components/sub_components/TulisStatus.vue'

export default {
  name: 'HomePage',
  components: {
    SearchStatus,
    TulisStatus
  },
  data () {
    return {
      KomponenAtas: 'SearchStatus',
      nama: '',
      refresh: false,
      isi_refresh: '',
      sort_status: '',
      search_status: '',
      search: 'false',
      ShowDats: [],
      NewDats: []
    }
  },
  watch: {
    '$store.state.halaman': {
      handler (dat) {
        this.nama = localStorage.getItem('nama')
      }
    },
    '$store.state.KomponenAtas': {
      handler (dat) {
        this.KomponenAtas = dat
        this.refresh_halaman()
      }
    },
    NewDats: {
      handler (baru, lama) {
        const jumlah = baru.length - this.ShowDats.length
        this.isi_refresh = jumlah + ' status baru'
        if (jumlah > 0) {
          this.refresh = true
        } else if (jumlah === 0) {
          this.refresh_halaman()
        } else {
          this.refresh = false
        }
      }
    },
    '$store.state.sort_status': {
      handler (dat) {
        this.sort_status = dat
        if (dat === 'postingan terbaru') {
          if (this.$store.state.search_status === '') {
            this.ShowDats = []
            const status = this.$fireModule.database().ref('tb_status').orderByChild('CreatedAt')
            status.on('value', this.fetch_status, this.err)
            this.refresh_halaman()
          } else {
            this.ShowDats = []
            const status = this.$fireModule.database().ref('tb_status').orderByChild('CreatedAt')
            status.on('value', this.fetch_status_search, this.err)
            this.refresh_halaman()
          }
        } else if (dat === 'postingan terlama') {
          if (this.$store.state.search_status === '') {
            this.ShowDats = []
            const status = this.$fireModule.database().ref('tb_status')
            status.on('value', this.fetch_status, this.err)
            this.refresh_halaman()
          } else {
            this.ShowDats = []
            const status = this.$fireModule.database().ref('tb_status')
            status.on('value', this.fetch_status_search, this.err)
            this.refresh_halaman()
          }
        }
      }
    },
    '$store.state.search_status': {
      handler (dat) {
        this.search = false
        this.$store.commit('updateSearch', false)
        this.search_status = dat
        if (dat === '' && this.sort_status === 'postingan terbaru') {
          this.ShowDats = []
          const status = this.$fireModule.database().ref('tb_status').orderByChild('CreatedAt')
          status.on('value', this.fetch_status, this.err)
          this.refresh_halaman()
        } else if (dat !== '' && this.sort_status === 'postingan terlama') {
          this.ShowDats = []
          const status = this.$fireModule.database().ref('tb_status')
          status.on('value', this.fetch_status, this.err)
          this.refresh_halaman()
        }
      }
    },
    '$store.state.search': {
      handler (dat) {
        this.search = dat
        if (dat === true) {
          this.ShowDats = []
          const status = this.$fireModule.database().ref('tb_status')
          status.on('value', this.fetch_status_search, this.err)
          this.refresh_halaman()
        }
      },
      '$store.state.posted': {
        handler (dat) {
          alert('da')
          if (dat === true) {
            // this.$store.commit('updatePosted', false)
            this.refresh_halaman()
          }
        }
      }
    }
  },
  created () {
    const status = this.$fireModule.database().ref('tb_status').orderByChild('CreatedAt')
    status.on('value', this.fetch_status, this.err)

    const user = this.$fireModule.database().ref('tb_users').child(localStorage.getItem('IDu'))
    user.on('value', this.fetch_usr, this.err)
  },
  mounted () {
    this.nama = localStorage.getItem('nama')
  },
  updated () {
    this.sort_status = this.$store.state.sort_status
    this.nama = localStorage.getItem('nama')
  },
  methods: {
    ganti_komponen_atas () {
      if (this.KomponenAtas === 'SearchStatus') {
        this.KomponenAtas = 'TulisStatus'
      } else {
        this.KomponenAtas = 'SearchStatus'
      }
    },
    tes () {
      alert('k')
    },
    hapus_data () {
      this.ShowDats = []
    },
    refresh_halaman () {
      this.ShowDats = this.NewDats
      this.refresh = false
    },
    fetch_status (items) {
      this.NewDats = []
      items.forEach((item) => {
        if (item.val().isi.search('<p>') >= 0 && item.val().isi.search('</p>') >= 0) {
          this.NewDats.push(
            {
              key: item.key,
              isi: item.val().isi
            }
          )
        }
      })
      if (this.ShowDats.length === 0) {
        this.refresh_halaman()
      }
    },
    fetch_usr (items) {
      localStorage.nama = items.val().nama
      this.nama = items.val().nama
    },
    fetch_status_search (items) {
      this.NewDats = []
      items.forEach((item) => {
        if (item.val().isi.search('<p>') >= 0 && item.val().isi.search('</p>') >= 0) {
          if (item.val().isi.includes(this.search_status)) {
            this.NewDats.push(
              {
                key: item.key,
                isi: item.val().isi
              }
            )
          }
        }
      })
      this.refresh_halaman()
    }
  }
}

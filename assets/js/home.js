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
      }
    },
    NewDats: {
      handler (baru, lama) {
        const jumlah = baru.length - this.ShowDats.length
        this.isi_refresh = jumlah + ' status baru'
        if (jumlah > 0) {
          this.refresh = true
        } else {
          this.refresh = false
        }
      }
    }
  },
  created () {
    const status = this.$fireModule.database().ref('tb_status').orderByChild('CreatedAt')
    status.on('value', this.fetch_status, this.err)
  },
  mounted () {
    this.nama = localStorage.getItem('nama')
  },
  updated () {
    this.nama = localStorage.getItem('nama')
  },
  methods: {
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
    }
  }
}

export default {
  name: 'SearchStatus',
  data () {
    return {
      sort_status: '',
      search_status: ''
    }
  },
  methods: {
    klik_dropdown (dat) {
      this.sort_status = dat
    },
    cek_aktif (dat) {
      if (dat === this.sort_status) {
        return true
      } else {
        return false
      }
    },
    pindah () {
      this.$store.commit('updateKomponenAtas', 'TulisStatus')
    },
    Search () {
      this.$store.commit('updateSearch', true)
    }
  },
  mounted () {
    this.sort_status = this.$store.state.sort_status
  },
  watch: {
    sort_status: {
      handler (dat) {
        if (dat !== '') {
          this.$store.commit('updateSortStatus', dat)
        }
      }
    },
    '$store.state.sort_status': {
      handler (dat) {
        this.sort_status = dat
      }
    },
    search_status: {
      handler (dat) {
        this.$store.commit('updateSearchStatus', dat)
      }
    }
  }
}

export default {
  name: 'SearchStatus',
  data () {
    return {

    }
  },
  methods: {
    pindah () {
      this.$store.commit('updateKomponenAtas', 'TulisStatus')
    }
  }
}

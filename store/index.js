export const state = () => ({
  IDu: '',
  Singularitas: '',
  halaman: '',
  KomponenAtas: '',
  sort_status: 'postingan terbaru',
  search_status: '',
  search: false
})

export const mutations = {
  updateIDu (state, data) {
    state.IDu = data
  },
  updateSingular (state, data) {
    state.Singularitas = data
  },
  updateHalaman (state, data) {
    state.halaman = data
  },
  updateKomponenAtas (state, data) {
    state.KomponenAtas = data
  },
  updateSortStatus (state, data) {
    state.sort_status = data
  },
  updateSearchStatus (state, data) {
    state.search_status = data
  },
  updateSearch (state, data) {
    state.search = data
  }
}

export const getters = {
  getHalaman: (state) => {
    return state.halaman
  },
  getIDu: (state) => {
    return state.IDu
  },
  getSingular: (state) => {
    return state.Singularitas
  }
}

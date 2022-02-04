export const state = () => ({
  IDu: '',
  Singularitas: '',
  halaman: '',
  KomponenAtas: ''
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

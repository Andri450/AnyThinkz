export const state = () => ({
  halaman: '',
  KomponenAtas: ''
})

export const mutations = {
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
  }
}

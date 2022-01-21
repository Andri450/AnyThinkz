export const state = () => ({
  halaman: ''
})

export const mutations = {
  updateHalaman (state, data) {
    state.halaman = data
  }
}

export const getters = {
  getHalaman: (state) => {
    return state.halaman
  }
}

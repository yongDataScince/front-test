export const state = () => ({
  products: []
})

export const actions = {
  async setAllProducts ({ commit }) {
    const data = await this.$axios.get('/product')
    commit('SET_PRODUCTS', data)
  }
}

export const mutations = {
  SET_PRODUCTS (state, payload) {
    state.products = payload
  }
}

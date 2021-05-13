export const state = () => ({
  products: [],
  categories: [],
  category: 1
})

export const actions = {
  async setAllProducts ({ commit }) {
    const data = await this.$axios.get('/api/product?category=3')
    commit('SET_PRODUCTS', data)
  },

  async choiseCategory ({ commit }, payload = 1) {
    const data = await this.$axios.get(`/api/product?category=${payload}`)
    commit('CHOISE_CATEGORY', { data: data.data, category: payload })
  },

  async setCategories ({ commit }) {
    const data = await this.$axios.get('/api/product-category')
    commit('SET_CATEGORIES', data)
  }
}

export const mutations = {
  SET_PRODUCTS (state, payload) {
    state.products = payload
  },

  SET_CATEGORIES (state, payload) {
    state.categories = payload
  },

  CHOISE_CATEGORY (state, payload) {
    state.category = payload.category
    state.products = payload.data
  }
}

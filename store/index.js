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

  FILTER_PRODUCTS (state, payload) {
    if (payload === 'price') {
      state.products.sort((a, b) => {
        return a.price < b.price ? 1 : -1
      })
    } else {
      state.products.sort((a, b) => {
        return a.rating < b.rating ? 1 : -1
      })
    }
  },

  SET_CATEGORIES (state, payload) {
    state.categories = payload
  },

  CHOISE_CATEGORY (state, payload) {
    state.category = payload.category
    state.products = payload.data
  }
}

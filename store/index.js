export const state = () => ({
  products: [],   // list of products
  categories: [], // list of all categies
  category: 1     // default category
})

export const actions = {
  async choiseCategory ({ commit }, payload = 1) { // choise category and load data
    const data = await this.$axios.get(`/api/product?category=${payload}`)
    commit('CHOISE_CATEGORY', { data: data.data, category: payload })
  },

  async setCategories ({ commit }) {    // load all categories
    if(this.$auth.$storage.getLocalStorage('categories')) {
      commit('SET_CATEGORIES', this.$auth.$storage.getLocalStorage('categories') )
    } else {
      const data = await this.$axios.get('/api/product-category')
      this.$auth.$storage.setLocalStorage('categories', data)
      commit('SET_CATEGORIES', data)
    }
  },

  removeProduct ({ commit }, payload) { // remove product from cart with "id"
    commit('cart/REMOVE_PRODUCT', payload, { root: true })
    commit('REMOVE_FROM_CART', payload)
  },

  clearCart ({ commit }) {  // clear cart after submiting
    commit('cart/CLEAR_CART', null, { root: true })
    commit('CLEAR_CART')
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
    payload.data.map((i) => {
      i.inCart = false
      return i
    })
    state.category = payload.category
    state.products = payload.data
  },

  REMOVE_FROM_CART (state, payload) {
    state.products.map((i) => {
      if (i.id === payload.id) {
        i.inCart = false
      }
      return i
    })
    this.$auth.$storage.setLocalStorage('catProducts', state.products)
  },

  CLEAR_CART (state) {
    state.products.map((i) => {
      i.inCart = false
      return i
    })
    this.$auth.$storage.setLocalStorage('products', [])
    this.$auth.$storage.setLocalStorage('catProducts', state.products)
  }
}

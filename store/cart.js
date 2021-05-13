export const state = () => ({
  products: [], // list of products in cart
  open: false,  // conditional for open cart window
  done: false   // conditional for submiting
})

export const actions = {  // add product in cart
  addProduct ({ commit }, payload) {
    commit('ADD_PRODUCT', payload)
  }
}

export const mutations = {
  SET_STORAGE(state) {
    if(this.$auth.$storage.getLocalStorage('products')) {
      state.products = this.$auth.$storage.getLocalStorage('products')
    } else {
      state.products = []
    }
  },

  ADD_PRODUCT (state, payload) {
    payload.inCart = true
    state.products.push(payload)
    this.$auth.$storage.setLocalStorage('products', state.products)
  },

  REMOVE_PRODUCT (state, payload) {
    state.products = state.products.filter(i => i.id !== payload.id)
    this.$auth.$storage.setLocalStorage('products', state.products)
  },

  TOGGLE (state) { // toggle cart window state
    state.done = false
    state.open = !state.open
  },

  CLOSE (state) {
    state.open = false
  },

  CLEAR_CART (state) {
    state.products = []
    state.done = true
  }
}

export const state = () => ({
  count: 0,     // count of products in cart
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
  ADD_PRODUCT (state, payload) {
    payload.inCart = true
    state.products.push(payload)
    state.count += 1
  },

  REMOVE_PRODUCT (state, payload) {
    state.products = state.products.filter(i => i.id !== payload.id)
    state.count = state.products.length
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
    state.count = state.products.length
    state.done = true
  }
}

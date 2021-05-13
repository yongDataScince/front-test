export const state = () => ({
  count: 0,
  products: [],
  open: false
})

export const actions = {
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

  TOGGLE (state) {
    state.open = !state.open
  }
}

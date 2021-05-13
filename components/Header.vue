<template>
  <header class="main__header">
    <div class="main__header--title">
      TestList
    </div>
    <button class="cart-btn">
      <div class="count" v-if="count > 0">
        {{ count }}
      </div>
      <i class="icon icon-cart" @click="toggle"/>
    </button>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      count: state => state.cart.count
    })
  },

  methods: {
    ...mapMutations({
      toggle: 'cart/TOGGLE'
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/css/colors.scss";
  .main__header {
    width: 100vw;
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0px 0px 8px 8px;
    padding: 16px 102px 17px 88px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);

    &--title {
      color: $grey-text;
      font-weight: bold;
      font-size: 22px;
      line-height: 28px;
    }

    .cart-btn {
      position: relative;
      width: 34px;
      height: 33px;
      border: none;
      background: none;
      &:focus {
        outline: none;
      }

      .count {
        width: 12px;
        height: 12px;
        color: #FFF;
        background: $count-background;
        position: absolute;
        border-radius: 50%;
        right: -5px;
        top: 1px;
        z-index: 100;
        font-family: PT Sans;
        font-style: normal;
        font-weight: bold;
        padding-top: 2px;
        font-size: 8px;
        line-height: 10px;
      }
    }
  }
</style>

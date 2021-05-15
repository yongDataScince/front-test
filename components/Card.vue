<template>
  <div class="product-card">
    <div class="product-card--content">
      <span class="rating">
        <i class="icon icon-star" />
        {{data.rating}}
      </span>
      <img :src="'https://frontend-test.idaproject.com'+this.data.photo" alt="">
      <i class="icon icon-card-cart" :class="{ incart : data.inCart }" @click="add"/>
    </div>
    <div class="product-card--footer">
      <div class="name">{{data.name}}</div>
      <div class="price">{{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} ₽</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    inCart: false,
    show: false
  }),

  computed: {
    ...mapState({
      products: state => state.cart.products
    })
  },

  methods: {
    ...mapActions({
      addProduct: 'cart/addProduct'
    }),

    add () {
      if (this.data.inCart) {
        console.log("ERR", this.data.inCart)
      } else {
        this.addProduct(this.data)
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/colors.scss";
  .product-card {
    background: #FFFFFF;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 16px;
    transition: .2s;
    perspective: 100px;

    &--content {
      width: 100%;
      display: flex;
      height: 180px;
      margin-bottom: 16px;

      .rating {
        width: 30px;
        height: 20px;
        display: flex;
        color: $yellow-text;
        font-size: 10px;
        line-height: 13px;
        align-items: center;
      }

      .icon-card-cart.incart {
        background: #000;
      }

      .icon-card-cart:hover {
        background: $dark-text;
      }
    }

    &--footer {
      width: 100%;
      height: calc(100%-180px);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      .name {
        color: $hover-text;
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 6px;
      }
      .price {
        color: $dark-text;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
      }
    }

    &:hover {
      transform: scale(1.02) translateZ(1px);
    }

    @media only screen and (max-width: 768px) {
      padding: 16px;
      &--content {
        justify-content: center;
        margin-right: -16px;
        height: 100px;
      }

      &--footer {
        margin-top: 50px;
      }

      .icon-card-cart {
        transform: scale(1.3)
      }
    }
  }
</style>

<template>
  <div class="cart" :class="{ open }">
    <div class="cart--container">
      <div class="cart--container-header">
        <div class="title">Корзина</div>
        <i class="icon icon-close" @click="toggle"/>
      </div>

      <div class="no-products" v-if="count == 0">
        <div class="text">
          Пока что вы ничего не добавили <br>
          в корзину.
        </div>
        <div class="go-btn" @click="toggle">
          Перейти к выбору
        </div>
      </div>

      <div class="cart--container-products" v-else>
        <div class="sub-title">Товары в корзине</div>
          <div class="list-container">
            <ul class="cart--container-products__list">
              <li
                  class="cart--container-products__list-item"
                  v-for="p in products"
                  :key="p.id">
                <img :src="'https://frontend-test.idaproject.com'+p.photo" alt="" class="card-photo">
                <div class="info">
                  <div class="name">{{ p.name }}</div>
                  <div class="price"> {{ p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} ₽ </div>
                  <div class="rating"><i class="icon icon-star" /> {{ p.rating }} </div>
                </div>

                <i class="icon icon-trash" @click="removeProduct(p)"/>
              </li>
            </ul>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      open: state => state.cart.open,
      count: state => state.cart.count,
      products: state => state.cart.products
    })
  },

  methods: {
    ...mapMutations({
      toggle: 'cart/TOGGLE'
    }),
    ...mapActions(['removeProduct'])
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/colors.scss";
  .cart {
    position: fixed;
    z-index: 1000;
    right: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: #ffffff83;
    opacity: 0;
    visibility: hidden;
    transition: .3s;

    &--container {
      height: 100%;
      width: 460px;
      background: #FFFFFF;
      box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
      border-radius: 8px 0px 0px 8px;
      margin-left: auto;
      padding: 52px 48px;
      transition: .5s;
      animation-delay: .3s;
      transform: translateX(100%);
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none !important;
      }

      &-header {
        height: 41px;
        width: 100%;
        display: flex;
        align-items: center;

        .title {
          font-weight: bold;
          font-size: 32px;
          line-height: 41px;
        }

        .icon {
          margin-left: auto;
        }
      }

      &-products {
        margin-top: 24px;

        .list-container {
          min-height: 120px;
          max-height: 480px;
          width: 100%;
        }

        &__list {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: 100%;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 12px;

          &-item {
            width: 100%;
            height: 120px;
            background: #FFFFFF;
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            display: flex;
            align-items: center;
            padding: 12px 16px 12px 25px;

            .card-photo {
              width: 90px;
              height: 90px;
              margin-right: 35px;
            }

            .info {
              width: 140px;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
            }

            .rating {
              width: 30px;
              height: 20px;
              display: flex;
              color: $yellow-text;
              font-size: 10px;
              line-height: 13px;
              align-items: center;
              margin-top: auto;
            }

            .name {
              color: $hover-text;
              font-size: 14px;
              line-height: 18px;
              max-height: 36px;
              margin-bottom: 6px;
            }

            .price {
              color: $dark-text;
              font-weight: bold;
              font-size: 14px;
              line-height: 18px;
              margin-bottom: 16px;
            }

            .icon {
              margin-left: auto;
              &:hover {
                background: $dark-text;
              }
            }
          }
        }

        .sub-title {
          font-size: 18px;
          line-height: 23px;
          color: $hover-text;
          margin-bottom: 16px;
        }
      }
    }

    &.open {
      opacity: 1;
      visibility: visible;
      display: flex;

      .cart--container {
        transform: translateX(0);
      }
    }
  }

  .no-products {
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;

    .text {
      margin: 24px 0;
      font-size: 22px;
      line-height: 28px;
    }

    .go-btn {
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      line-height: 21px;
      color: #fff;
      background: $dark-text;
      border-radius: 8px;
      cursor: pointer;
    }
  }
</style>

<template>
  <div class="product-card">
    <div class="product-card--content">
      <span class="rating">
        <i class="icon icon-star"></i>
        {{data.rating}}
      </span>
      <img :src="'https://frontend-test.idaproject.com'+this.data.photo" alt="">
      <i class="icon icon-card-cart"></i>
    </div>
    <div class="product-card--footer">
      <div class="name">{{data.name}}</div>
      <div class="price">{{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} ₽</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  methods: {
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
  }
</style>

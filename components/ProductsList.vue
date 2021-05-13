<template>
  <div class="main__products">
    <h1 v-if="loading">Loading...</h1>
    <div class="cards" v-else>
      <Card
        v-for="p in products"
        :key="p.id"
        :data="p"/>
      {{ products }}
    </div>
  </div>
</template>

<script>
import Card from './Card'

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },

    products: {
      type: Array,
      required: true
    }
  },

  components: {
    Card
  }
}
</script>

<style lang="scss">
@import "@/assets/css/colors.scss";

.main__products {
  width: 95%;
  min-height: 272px;
  margin-left: auto;

  .cards {
    display: grid;
    grid-template-columns: 264px 264px 264px 264px;
    grid-auto-rows: 272px;
    grid-template-rows: 272px;
    grid-gap: 16px;
  }
}
</style>

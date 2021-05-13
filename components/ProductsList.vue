<template>
  <div class="main__products">
    <h1 class="placeholder" :class="{ loading }">
      <div v-for="i in 12" :key="i" class="placeholder-card"></div>
    </h1>
    <div class="cards" v-if="!loading">
      <Card
        v-for="p in products"
        :key="p.id"
        :data="p"/>
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
    perspective: 1000px;

    @media only screen and (max-width: 768px) {
      height: 400px;
      grid-template-columns: 200px 200px;
      grid-auto-rows: 220px;
      grid-template-rows: 220px;
      grid-gap: 45px;
      img {
        margin-top: 20px;
        width: 110px;
        height: 110px;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
}

.placeholder {
  display: grid;
  grid-template-columns: 264px 264px 264px 264px;
  grid-auto-rows: 272px;
  grid-template-rows: 272px;
  grid-gap: 16px;
  opacity: 0;
  visibility: hidden;
  transition: .3s;
  position: absolute;

  &-card {
    background: $placeholder;
    border-radius: 8px;
    background-size: 500% 500%;
    animation: gradient 2s ease infinite;
  }

  &.loading {
    position: absolute;
    opacity: .7;
    visibility: visible;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 200px 200px;
    grid-auto-rows: 220px;
    grid-template-rows: 220px;
    grid-gap: 45px;
  }
}

@for $i from 1 to 12 {
  .placeholder-card:nth-child(#{$i}) {
    animation-delay: $i * .1s; 
  }
}

@keyframes gradient {
  0%  {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>

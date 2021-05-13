<template>
  <div class="main">
    <Cart />
    <Header />
    <Body />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Body from '@/components/Body'
import Cart from '@/components/Cart'

export default {
  components: {
    Header,
    Body,
    Cart
  }
}
</script>

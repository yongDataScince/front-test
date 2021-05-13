<template>
  <div class="main__body">
    <div class="main__body--header">
      <div class="main__body--header-title">
        Каталог
      </div>

      <div v-click-outside="closeDropdown" class="main__body--header-sort">

        <div
          class="sort-title"
          @click="toggleDrop">
          Сортировать по:
          <span class="sort-text">{{ choiseSort?'цене':'популярности' }}</span>
          <i
            class="icon icon-little-chevron"
            :class=" {'flip-y': openDropdown} " />
        </div>

        <div
            :class="{ open: openDropdown }"
            class="main__body--header-sort--dropdown">
          <ul class="list">
            <li
                :class="{ choised: choiseSort}"
                class="list-item"
                @click="setSort(1)">
              По цене
            </li>

            <li
                :class="{ choised: !choiseSort}"
                class="list-item"
                @click="setSort(0)">
              По популярности
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main__body--content">
      <div class="categories">
        <ul class="list">
          <li
              @click="toggleCategory(c.id)"
              :class="{ choised: c.id==category }"
              class="list-item"
              v-for="c in categories"
              :key="c.id">
            {{ c.name }}
          </li>
        </ul>
      </div>

      <ProductsList :loading="loading" :products="products"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import ProductsList from './ProductsList'

export default {
  data: () => ({
    choiseSort: 0,
    sortList: ['По цене', 'По популярности'],
    openDropdown: false,
    loading: true
  }),

  computed: {
    ...mapState({
      categories: state => state.categories.data,
      category: state => state.category,
      products: state => state.products
    })
  },

  mounted () {
    this.setCategories()
    this.toggleCategory(1)
    this.SET_STORAGE()
  },

  methods: {
    ...mapActions(['setCategories', 'choiseCategory']),
    ...mapMutations({
        FILTER_PRODUCTS: 'FILTER_PRODUCTS', 
        SET_STORAGE: 'cart/SET_STORAGE'
      }),

    setSort (id) {
      this.openDropdown = false
      this.choiseSort = id
      this.FILTER_PRODUCTS(id === 1 ? 'price' : 'rating')
    },

    toggleDrop () {
      this.openDropdown = !this.openDropdown
    },

    toggleCategory (id) {
      this.loading = true
      this.choiseCategory(id)
        .then(() => {
          this.loading = false
          this.FILTER_PRODUCTS('rating')
        })
    },

    closeDropdown () {
      this.openDropdown = false
    }
  },

  components: {
    ProductsList
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/colors.scss";
  .main__body {
    width: 100vw;
    min-height: 100vh;
    padding: 32px 87px 66px 87px;
    &--header {
      height: 41px;
      width: 100%;
      display: flex;
      margin-bottom: 32px;
      align-items: center;
      justify-content: space-between;

      &-title {
        color: $dark-text;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 41px;
      }

      &-sort {
        min-width: 165px;
        height: 21px;
        cursor: pointer;
        position: relative;
        .sort-title {
          font-size: 16px;
          line-height: 21px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .sort-text {
          font-size: 16px;
          line-height: 21px;
          margin: 0 4px 0 6px;
          color: $grey-text;
        }

        &--dropdown {
          position: absolute;
          width: 165px;
          height: 68px;
          right: 0;
          margin-top: 6px;
          transition: .2s;
          transform: translateY(20px);
          opacity: 0;
          visibility: hidden;
          z-index: 1000;
          .list {
            padding: 8px 0;
            margin: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            background: #FFF;
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            &-item {
              width: 100%;
              height: 26px;
              transition: .2s;
              background: #FFF;
              display: flex;
              align-items: center;
              padding-left: 12px;
              color: $disable-test;
              &.choised {
                color: $dark-text;
              }
              &:hover {
                background: #F8F8F8;
              }
            }
          }
          &.open {
            transform: translateY(0px);
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }

    &--content {
      width: 100%;
      min-height: 100%;
      display: flex;
      align-items: flex-start;
      .categories {
        width: 170px;
        min-height: 95px;
        .list {
          margin: 0;
          padding: 0;
          list-style: none;
          &-item {
            cursor: pointer;
            font-size: 16px;
            line-height: 21px;
            height: 21px;
            color: $disable-test;
            position: relative;

            &::before {
              position: absolute;
              content: '';
              width: 0;
              height: 1px;
              background: $disable-test;
              bottom: 2px;
              left: 0;
              transition: .2s;
            }

            &:nth-child(2) {
              margin: 16px 0;
            }

            &:hover {
              color: $hover-text;
              &::before {
                width: 50%;
              }
            }

            &.choised {
              color: $dark-text;
              text-decoration:underline;
              &::before {
                display: none;
              }
            }
          }
        }
      }
    }
  }
</style>

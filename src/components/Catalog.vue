<template>
  <div class="catalog">
    <catalog-item
      v-for="(item, index) in GET_PRODUCTS"
      :key="index"
      :item_data="item"
      @addToCart="addToCart"
    />
  </div>
</template>
<script>
import CatalogItem from "./CatalogItem.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Catalog",
  components: { CatalogItem },
  computed: {
    ...mapGetters(["GET_PRODUCTS"]),
  },
  methods: {
    ...mapActions(["ADD_TO_CART"]),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },
  },
  mounted() {},
};
</script>
<style lang="css">
.catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
}
</style>
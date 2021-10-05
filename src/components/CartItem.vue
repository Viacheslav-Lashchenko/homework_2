<template>
  <div class="cart-item">
    <img :src="cart_item_data.volumeInfo.imageLinks.smallThumbnail" alt="" />
    <p class="mr-3">{{ cart_item_data.volumeInfo.description }}</p>
    <span>{{ cart_item_data.saleInfo.listPrice.amount }}</span>
    <button class="btn btn-danger ml-4" @click="deleteCartItem">Удалить</button>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    deleteCartItem() {
      this.$emit("deleteCartItem");
    },
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 rgb(49, 49, 49);
  padding: 16px;
  margin-bottom: 20px;
}
.cart-item img {
  margin-right: 10px;
}
.cart-item p {
  overflow: hidden;
  line-height: 18px;
  height: 146px;
}
</style>
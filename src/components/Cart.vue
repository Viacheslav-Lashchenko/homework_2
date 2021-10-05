<template>
  <div class="cart">
    <div class="container">
      <div class="row mb-3 mt-3">
        <div class="col-9"><h1>Корзина</h1></div>
        <div class="col-3">
          <router-link
            class="link-to-catalog"
            :to="{
              name: 'catalogWrapper',
            }"
          >
            <div class="link-to-catalog-wrapper">
              <p>Назад в Каталог</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12 cart-catalog">
          <cart-item
            v-for="(item, index) in cart_data"
            :key="index"
            :cart_item_data="item"
            @deleteCartItem="deleteCartItem(index)"
          />
          <p>Общая цена: {{ totalCost }}</p>
          <router-link
            :to="{
              name: 'catalogWrapper',
              params: {
                isInfoPopUpMessageVisible: true,
              },
            }"
            class="btn btn-primary"
          >
            Заказать
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CartItem from "./CartItem.vue";

export default {
  name: "Cart",
  components: {
    CartItem,
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      },
    },
    totalCost: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  methods: {
    ...mapActions(["DELETE_FROM_CART"]),
    deleteCartItem(index) {
      this.DELETE_FROM_CART(index);
    },
  },
};
</script>


<style scoped>
.link-to-catalog {
  color: black;
}
.link-to-catalog:hover {
  color: black;
  text-decoration: none;
}
.link-to-catalog-wrapper {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 5px;
  border: 1px solid rgb(0, 0, 0);
  align-items: center;
}
.link-to-catalog-wrapper p {
  margin: 0;
}
.cart-catalog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
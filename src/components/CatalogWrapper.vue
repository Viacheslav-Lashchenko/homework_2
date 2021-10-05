<template>
  <div class="catalog-wrapper">
    <div class="container">
      <div class="row mb-4">
        <div class="col-8">
          <search />
          <pop-up-message
            v-if="isInfoPopUpMessageVisible"
            :totalCost="totalCost"
            :amountCardItems="CART.length"
            :getNoun="getNoun"
          >
          </pop-up-message>
        </div>
        <div class="col-4">
          <router-link
            :event="handleWhatEverEvent"
            class="link-to-cart"
            :to="{
              name: 'cart',
              params: { cart_data: CART, totalCost: totalCost },
            }"
          >
            <div class="link-to-cart-body mt-3">
              <div>
                <h4>Корзина</h4>
                <b-icon-cart3 style="width: 30px; height: 30px"></b-icon-cart3>
              </div>
              <p>
                Добавлено
                {{ CART.length }}
                {{ getNoun(CART.length, "товар", "товара", "товаров") }} на
                сумму {{ totalCost }} грн.
              </p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <catalog />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Catalog from "./Catalog.vue";
import Search from "./Search.vue";
import PopUpMessage from "../popup/PopUpMessage";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  components: { Search, Catalog, PopUpMessage },
  props: {
    isInfoPopUpMessageVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  watch: {
    isInfoPopUpMessageVisible() {
      clearTimeout(this.myTimeout);
      this.myTimeout = setTimeout(() => {
        this.isInfoPopUpMessageVisible = false;
        for (let i = this.CART.length; i >= 0; i--) {
          this.DELETE_FROM_CART(i);
        }
      }, 5000);
    },
  },
  computed: {
    ...mapGetters(["CART"]),
    handleWhatEverEvent() {
      return this.CART.length != 0 ? "click" : "";
    },
    totalCost() {
      const has = Object.prototype.hasOwnProperty;
      let result = [];
      if (this.CART.length) {
        for (let item of this.CART) {
          if (has.call(item.saleInfo, "listPrice")) {
            result.push(item.saleInfo.listPrice.amount);
          }
        }
        if (result.length) {
          result = result.reduce(function (sum, el) {
            return sum + el;
          });
          return Math.floor(result);
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
  },
  methods: {
    ...mapActions(["DELETE_FROM_CART"]),
    getNoun(number, one, two, five) {
      let n = Math.abs(number);
      n %= 100;
      if (n >= 5 && n <= 20) {
        return five;
      }
      n %= 10;
      if (n === 1) {
        return one;
      }
      if (n >= 2 && n <= 4) {
        return two;
      }
      return five;
    },
  },
};
</script>


<style lang="css">
.catalog-wrapper {
  position: relative;
}
.link-to-cart {
  color: black;
}
.link-to-cart:hover {
  color: black;
  text-decoration: none;
}
.link-to-cart-body {
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(0, 0, 0);
}
.link-to-cart-body div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
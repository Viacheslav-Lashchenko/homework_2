<template>
  <div class="catalog-item">
    <pop-up
      v-if="isInfoPopUpVisible"
      @closePopUp="closePopUpInfo"
      @addToCart="addToCart"
    >
      <div class="pop-up__body-wrap">
        <img
          class="item-img"
          :src="item_data.volumeInfo.imageLinks.smallThumbnail"
          alt=""
        />
        <p>{{ item_data.volumeInfo.description }}</p>
      </div>
    </pop-up>
    <div class="card-block">
      <img
        class="item-img"
        :src="item_data.volumeInfo.imageLinks.smallThumbnail"
        alt=""
      />
      <h5 class="card-title">{{ item_data.volumeInfo.title }}</h5>
      <div class="author-wrap">
        <p
          class="item-author"
          v-for="author in item_data.volumeInfo.authors"
          :key="author"
        >
          {{ author }}
        </p>
      </div>
      <p>
        {{ formatDate(item_data.volumeInfo.publishedDate) }}
      </p>
      <button class="btn btn-primary" @click="showPopUpInfo">Добавить</button>
    </div>
  </div>
</template>


<script>
import PopUp from "../popup/PopUp.vue";
export default {
  name: "CatalogItem",
  components: {
    PopUp,
  },
  props: {
    item_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isInfoPopUpVisible: false,
    };
  },
  methods: {
    showPopUpInfo() {
      this.isInfoPopUpVisible = true;
    },
    closePopUpInfo() {
      this.isInfoPopUpVisible = false;
    },
    addToCart() {
      this.$emit("addToCart", this.item_data);
      this.isInfoPopUpVisible = false;
    },
    formatDate(date) {
      let dateArray = date.split("-");
      let result = dateArray.reverse().join(".");
      return result;
    },
  },
};
</script>


<style scoped>
.catalog-item {
  flex-basis: 30%;
  box-shadow: 0 0 8px 0 rgb(49, 49, 49);
  padding: 16px;
  margin-bottom: 20px;
}
.catalog-item .card-block {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.catalog-item .card-block .item-img {
  height: 150px;
  margin-bottom: 6px;
}
.catalog-item .card-block .card-title {
  font-size: 16px;
  text-align: center;
}
.catalog-item .card-block .item-author {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  margin-bottom: 5px !important;
}
</style>
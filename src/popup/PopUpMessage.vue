<template>
  <div class="pop-up-message__wrapper">
    <div class="pop-up-message">
      <p>
        Добавлено {{ amountCardItems }}
        {{ getNoun(amountCardItems, "товар", "товара", "товаров") }} на сумму
        {{ totalCost }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUpMessage",
  props: {
    totalCost: {
      type: Number,
      default() {
        return 0;
      },
    },
    amountCardItems: {
      type: Number,
      default() {
        return 0;
      },
    },
    getNoun: {
      type: String,
      default() {
        return "товаров";
      },
    },
  },
};
</script>

<style scoped>
.pop-up-message__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #474747b5;
  z-index: 10;
}
.pop-up-message {
  position: fixed;
  top: 200px;
  width: 400px;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 8px 0 rgb(121 125 255);
  background: white;
  padding: 16px;
}
.pop-up-message p {
  margin: 0;
}
</style>
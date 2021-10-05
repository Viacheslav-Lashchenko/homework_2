<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <b-form
          @submit.prevent="onSubmit"
          @reset="onReset"
          v-if="show"
          class="mt-3"
        >
          <b-form-group
            id="input-group-1"
            label="Поиск книг"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.text"
              type="text"
              placeholder="Введите запрос"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Отправить</b-button>
        </b-form>
      </div>
      <div class="col-4">
        <b-card no-body class="mt-3">
          <b-card-body>
            <b-title>
              <span>Корзина</span>
            </b-title>
            <pre class="m-0">{{ form.text }}</pre>
          </b-card-body>
        </b-card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <Item v-for="(item, index) in items" :item="item" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
export default {
  components: {
    Item,
  },
  data() {
    return {
      form: {
        text: "",
      },
      show: true,
      items: {},
    };
  },
  methods: {
    onSubmit() {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.form.text}`, {
        method: "GET",
      }).then((response) =>
        response.json().then((json) => (this.items = json.items))
      );
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.text = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<template>
  <div>
    <b-form @submit.prevent="onSubmit" class="mt-3">
      <b-form-group id="input-group-1" label="Поиск книг" label-for="input-1">
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
</template>


<script>
import { mapActions } from "vuex";

export default {
  name: "Search",
  props: {},
  components: {},
  data() {
    return {
      form: {
        text: "",
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions(["LOAD_PRODUCTS"]),
    onSubmit() {
      this.LOAD_PRODUCTS(
        `https://www.googleapis.com/books/v1/volumes?q=${this.form.text}&maxResults=40`
      );
    },
  },
};
</script>


<style lang="">
</style>
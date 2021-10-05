<template>
  <div class="pop-up-wrapper" ref="pop-up-wrapper">
    <div class="pop-up">
      <div class="pop-up__header">
        <b-icon-x
          style="width: 30px; height: 30px"
          @click="closePopUp"
        ></b-icon-x>
      </div>
      <div class="pop-up__body">
        <slot></slot>
        <form class="auth-card" @submit.prevent="addToCart">
          <div class="card-content">
            <div class="input-field">
              <div>
                <label for="name">Имя</label>
                <input
                  id="name"
                  type="text"
                  v-model.trim="name"
                  :class="{
                    invalid:
                      ($v.name.$dirty && !$v.name.required) ||
                      ($v.name.$dirty && !$v.name.minLength),
                  }"
                />
              </div>
              <small
                class="helper-text invalid"
                v-if="$v.name.$dirty && !$v.name.required"
                >Поле Имя не должно быть пустым</small
              >
              <small
                class="helper-text invalid"
                v-else-if="$v.name.$dirty && !$v.name.minLength"
                >Введите корректное Имя</small
              >
            </div>
            <div class="input-field">
              <div>
                <label for="email">Email</label>
                <input
                  id="email"
                  type="text"
                  v-model.trim="email"
                  :class="{
                    invalid:
                      ($v.email.$dirty && !$v.email.required) ||
                      ($v.email.$dirty && !$v.email.email),
                  }"
                />
              </div>
              <small
                class="helper-text invalid"
                v-if="$v.email.$dirty && !$v.email.required"
                >Поле Email не должно быть пустым</small
              >
              <small
                class="helper-text invalid"
                v-else-if="$v.email.$dirty && !$v.email.email"
                >Введите корректный Email</small
              >
            </div>
            <div class="input-field">
              <div>
                <label for="phone">Телефон</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+380"
                  v-model.trim="phone"
                  @input="onlyNumbers"
                  :class="{
                    invalid:
                      ($v.phone.$dirty && !$v.phone.required) ||
                      ($v.phone.$dirty && isInvalidPhone),
                  }"
                />
              </div>
              <small
                class="helper-text invalid"
                v-if="$v.phone.$dirty && !$v.phone.required"
                >Поле Телефон не должно быть пустым</small
              >
              <small
                class="helper-text invalid"
                v-else-if="$v.phone.$dirty && isInvalidPhone"
                >Введите корректный Телефон</small
              >
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary waves-effect waves-light auth-submit"
          >
            Заказать
          </button>
        </form>
      </div>
      <div class="pop-up__footer">
        <button class="btn btn-danger" @click="closePopUp">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import validators from "@/validators";

export default {
  name: "PopUp",
  data: () => ({
    name: "",
    email: "",
    phone: "",
  }),
  validations: {
    name: { required, minLength: minLength(2) },
    email: { email, required },
    phone: { required, minLength: minLength(6) },
  },
  computed: {
    isInvalidPhone() {
      return validators.validatePhone(this.phone);
    },
  },
  methods: {
    closePopUp() {
      this.$emit("closePopUp");
    },
    addToCart() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.$emit("addToCart");
    },
  },
  mounted() {
    let vm = this;
    document.addEventListener("click", function (item) {
      if (item.target === vm.$refs["pop-up-wrapper"]) {
        vm.closePopUp();
      }
    });
  },
};
</script>

<style scoped>
.pop-up-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #474747b5;
}
.pop-up {
  position: fixed;
  top: 200px;
  width: 600px;
  box-shadow: 0 0 8px 0 rgb(121 125 255);
  background: white;
  padding: 16px;
}
.pop-up__header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.pop-up__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pop-up__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pop-up__body-wrap {
  display: flex;
}
.pop-up__body img {
  height: 144;
  margin-right: 10px;
}
.pop-up__body p {
  overflow: hidden;
  line-height: 18px;
  height: 146px;
}
form {
  display: flex;
  flex-direction: column;
}
.card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.input-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.input-field input {
  border-radius: 4px;
}
.input-field .invalid {
  border-color: red;
}
.input-field div {
  display: flex;
  justify-content: center;
}
.input-field div label {
  margin: 0 5px 0 0;
}
.input-field small {
  color: red;
}
</style>
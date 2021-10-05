export default {
  validatePhone: (value) => {
    let numb = !/^\+[\d]{12}$/.test(value)
      ? true
      : false;
    return numb
  }
}
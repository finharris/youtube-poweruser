export const settings = {
  maxScrolls: {
    value: 5,
    get getValue() {
      return this.value;
    },
    set setValue(v) {
      this.value = parseInt(v);
    },
  },
};

// TODO - change to local storage

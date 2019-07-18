const vm = new Vue({
  el: "#app",
  data: {
    products: []
  },
  methods: {
    fetchProducts() {
      fetch("./api/produtos.json")
        .then(res => res.json())
        .then(json => (this.products = json));
    }
  },
  filters: {
    currencySymbol(value) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }
  },
  created() {
    this.fetchProducts();
  }
});

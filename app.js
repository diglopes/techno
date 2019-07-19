const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    product: false
  },
  methods: {
    fetchProducts() {
      fetch("./api/produtos.json")
        .then(res => res.json())
        .then(json => (this.products = json));
    },
    fetchProductDetails(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(res => res.json())
        .then(json => (this.product = json));
    },
    openModal(id) {
      this.fetchProductDetails(id);
      window.scrollTo({
        top: 0
      });
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) this.product = false;
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

const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    product: false,
    shoppingCart: [],
    showShoppingCart: false,
    notificationMessage: "",
    notificationActive: false
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
    router() {
      const hash = document.location.hash.replace("#", "");
      if (hash) this.fetchProductDetails(hash);
    },
    openModal(id) {
      this.fetchProductDetails(id);
      window.scrollTo({
        top: 0
      });
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) this.product = false;
    },
    addToCart() {
      const { id, nome, preco } = this.product;
      this.product.estoque--;
      this.shoppingCart.push({ id, nome, preco });
      this.toggleNotification(`${nome} adicionado ao carrinho`);
    },
    removeItemFromCart(index, nome) {
      this.shoppingCart.splice(index, 1);
      this.toggleNotification(`${nome} removido do carrinho`);
    },
    checkLocalStorage() {
      const { shoppingCart } = window.localStorage;
      if (shoppingCart) {
        this.shoppingCart = JSON.parse(shoppingCart);
      }
    },
    toggleNotification(message) {
      this.notificationMessage = message;
      this.notificationActive = true;
      setTimeout(() => {
        this.notificationActive = false;
      }, 1200);
    },
    closeModalCart({ target, currentTarget }) {
      if (target === currentTarget) this.showShoppingCart = false;
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
  computed: {
    shoppingCartOverall() {
      let total = 0;
      if (this.shoppingCart.length) {
        total = this.shoppingCart.reduce((acc, cur) => {
          return acc + cur.preco;
        }, 0);
      }
      return total;
    }
  },
  watch: {
    product() {
      const { nome, id } = this.product;
      const title = nome ? `Techno - ${nome}` : null;
      const hash = id || "";

      document.title = title || "Techno";
      history.pushState(null, null, `#${hash}`);
    },
    shoppingCart() {
      window.localStorage.shoppingCart = JSON.stringify(this.shoppingCart);
    }
  },
  created() {
    this.fetchProducts();
    this.checkLocalStorage();
    this.router();
  }
});

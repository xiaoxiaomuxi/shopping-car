var vm = new Vue({
  el: "#app",
  data: {
    totalMoney: 0,
    productList: [],
    checkAllFalg: false,
    delFlag: false,
    curProduct: ''
  },
  filters: {
    formatMoney: function (value) {
      return "￥" + value.toFixed(2);
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.cartView();
    });
  },
  methods: {
    cartView: function () {
      var _this = this;
      this.$http.get("data/cartData.json").then(function (res) {
        _this.productList = res.data.result.list;
      });
    },
    changeMoney: function (product, way) {
      if (way > 0) {
        product.productQuantity++;

      } else {
        if (product.productQuantity > 1) {
          product.productQuantity--;
        }
      }
      this.clatotalMoney();
    },
    ischeck: function (item) {
      if (!item.check) {
        this.$set(item, "check", true)
      } else {
        item.check = !item.check;
      }
      this.clatotalMoney();
    },
    checkAll: function (flag) {
      this.checkAllFalg = flag;
      var _this = this;
      this.productList.forEach(function (item, index) {
        if (!item.check) {
          _this.$set(item, "check", _this.checkAllFalg);
        } else {
          item.check = _this.checkAllFalg;
        }

      });
      this.clatotalMoney();
    },
    clatotalMoney: function () {
      var _this = this;
      this.totalMoney = 0;
      this.productList.forEach(function (item, index) {
        if (item.check) {
          _this.totalMoney += item.productPrice * item.productQuantity;
        }
      })

    },
    delConfirm: function (item) {
      this.delFlag = true;
      this.curProduct = item;
    },
    delProduct: function () {
      var index = this.productList.indexOf(this.curProduct);
      this.productList.splice(index, 1);
      this.delFlag = false;
      this.clatotalMoney();
    }
  }
});


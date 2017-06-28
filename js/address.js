/**
 * Created by Administrator on 2017/6/19.
 */
new Vue({
  el: ".container",

  data: {
    limitNum:3,
    addressList: [],
    curIndex:0,
    shippingMethod:1
  },

  mounted: function () {
    this.$nextTick(function () {
        this.getAddressList();
    });
  },
  computed:{
    filterAddress:function(){
      return this.addressList.slice(0,this.limitNum);
    }
  },
  methods: {
    getAddressList: function () {
      this.$http.get("data/address.json").then(function (response) {
        var _this=this;
        var res = response.data;
        if (res.status == "0") {
          _this.addressList = res.result;
        }
      });
    },
    loadMore:function(){
      this.limitNum=this.addressList.length;
    },
    setDefault:function(addressId){
      this.addressList.forEach(function(address,index){
        console.log(1)
        if(address.addressId==addressId){
          address.isDefault=true;
        }else{
          address.isDefault=false;
        }
      });
    },
  }
})

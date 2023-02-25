<template>
  <div class="tokenAdmin">
    <h2>Adjust Tax Free</h2>
    <div class="panel-box">

      <h3>
        1. Transfer Tax：3.5%
      </h3>
      <div class="inline-input-box">
        <div class="name">
          Burn Tax
        </div>
        <input type="text"  v-model="tokenParams.burn_tax">
      </div>
      <div class="inline-input-box">
        <div class="name">
          Marketing Tax
        </div>
        <input type="text"  v-model="tokenParams.marketing_tax">
      </div>
      <h3>
        2. Marketing Wallet
      </h3>
      <div class="inline-input-box">
        <div class="name">
          Address
        </div>
        <input type="text" v-model="tokenParams.marketing_address">
      </div>
    </div>
    <div class="mangobox-button" @click="setConfigure">
      SUBMIT
    </div>
  </div>
</template>

<script>
import abiMap from "../api/apiMap";

export default {
  name: "TokenAdmin",
  data(){
    return {
      tokenParams:{
        erc20_code_hash: abiMap.Erc20Hash.address,
        version:0,
        initial_supply: 100000000,
        name:"TT",
        symbol:"T",
        decimals:10,
        owner:"",
        burn_tax:0,
        marketing_tax:0,
        marketing_address:"",
        transfer_limit:0,
        wallet_limit:0
      }
    }
  },
  methods:{
    setConfigure(){
      this.$store.dispatch("erc20/setConfigure",this.tokenParams)
    }
  },
  created() {
    console.log(this.$route.params)
    this.tokenParams = this.$route.params
  }
}
</script>

<style lang="scss" scoped>
.tokenAdmin {
  width: 1200px;
  margin: 20px auto;

  h3 {
    padding: 0.5em 0;
    font-size: 20px;
  }

  .mangobox-button {
    width: 240px;
    height: 50px;
    background: linear-gradient(225deg, #54D500 0%, #2AAA00 100%);
    border-radius: 25px;
  }
}
</style>

<template>
  <div class="createLock">
    <h1>Lock</h1>
    <div class="panel-box">
      <div class="title">
        Create Lock
      </div>
      <div class="input-box">
        <div class="name">
          Token Address
        </div>
        <input type="text" v-model="token">
      </div>
      <div class="info-list">
        <div class="row">
          <div class="name">
            Token Name
          </div>
          <div class="value">
            {{coinInfo.name}}
          </div>
        </div>
        <div class="row">
          <div class="name">
            Symbol
          </div>
          <div class="value">
            {{coinInfo.symbol}}
          </div>
        </div>
        <div class="row">
          <div class="name">
            Decimal
          </div>
          <div class="value">
            {{coinInfo.decimals}}
          </div>
        </div>
        <div class="row">
          <div class="name">
            Balance
          </div>
          <div class="value">
            {{coinInfo.balance}}
          </div>
        </div>
      </div>
    </div>
    <div class="panel-box">
      <div class="input-box">
        <div class="name" >
          Amounts
        </div>
        <div class="input">
          <input type="number" placeholder="Amounts" v-model="lockParams.amount" >
          <div class="mangobox-button">
            MAX
          </div>
        </div>
      </div>
      <div class="time-box">
        <div class="name">
          End Date ( UTC Time )
        </div>
        <el-date-picker
            class="pickerDate"
            v-model="pickerDate"
            type="datetime"
            placeholder="Choose Date">
        </el-date-picker>

      </div>
    </div>
    <div class="mangobox-button" @click="approve">
      Approve
    </div>
    <div class="mangobox-button" @click="createLock">
      CREAT
    </div>
  </div>
</template>

<script>
import abiMap from "../api/apiMap";
export default {
  name: "createLock",
  data(){
    return {
      pickerDate:"",
      //5HXnPJkxsdZKuXbiB36EpsYPNrxdgiRETsFmUZSasCkKU8pr
      token:undefined,
      endDate:{},
      coinInfo:{},
      lockParams:{
        //5HXnPJkxsdZKuXbiB36EpsYPNrxdgiRETsFmUZSasCkKU8pr
        contract:"",
        amount:undefined,
        end_time:undefined
      }
    }
  },
  computed:{
    account() {
      return this.$store.state.app.account
    }
  },
  watch:{
    token(value){
      this.getCoinInfo(value)
    },
    account(){
      this.getCoinInfo(this.token)
    }
  },
  methods: {
    async getCoinInfo(address){
      if(address.length==48){
        let coin =  await this.$store.dispatch("erc20/queryInfo", address)
        let balance =  await this.$store.dispatch("erc20/balanceOf", {address,owner:this.$store.state.app.account})
        this.coinInfo = {...coin,balance}
      }

    },
    approve(){
      if(!this.$store.state.app.account){
        this.$eventBus.$emit('message', {
          message: "Please connect  ",
          type: "error"
        })
        return
      }
      if(!this.token){
        this.$eventBus.$emit('message', {
          message: "Please input token  ",
          type: "error"
        })
        return
      }
      this.$store.dispatch("erc20/approve", {
        spender: abiMap.mangoLock.address,
        value:"100000000000000000000000000",
        address: this.token ,
      })
    },
    async createLock() {
      // let now= new Date()
      // now.setFullYear(this.endDate.year)
      // now.setMonth(this.endDate.month)
      // now.setDate(this.endDate.day)
      if(!this.$store.state.app.account){
        this.$eventBus.$emit('message', {
          message: "Please connect  ",
          type: "error"
        })
        return
      }
      if(!this.token){
        this.$eventBus.$emit('message', {
          message: "Please input token  ",
          type: "error"
        })
        return
      }
      if(!this.pickerDate){
        this.$eventBus.$emit('message', {
          message: "Please picker date ",
          type: "error"
        })
        return
      }
      this.lockParams.contract = this.token
      this.lockParams.version = 7
      this.lockParams.end_time = new Date(this.pickerDate).getTime()
      this.lockParams.owner = this.$store.state.app.account
      await this.$store.dispatch("mangoLock/lock", this.lockParams)
      this.$router.push("Lock")
    }
  }
}
</script>

<style lang="scss" scoped>
.createLock {
  width: 1200px;
  margin: 20px auto;
  .info-list{
    margin: 1em 0;
    padding: 0 20px;

    .row{
      display: flex;
      padding: 1em 0;
      width: 600px;
      justify-content: space-between;

      .name{
        font-size: 20px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #ADADAD;
        line-height: 24px;
      }
      .value{
        font-size: 20px;
        font-family: Roboto-Bold, Roboto;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 24px
      }
    }
  }
  ::v-deep .pickerDate{
    background: #0D1319;
    border-radius: 10px;
    border: 1px solid #515151;
    margin-top: 2em;
    input{
      background: #0D1319;
      border-radius: 10px;
      color: #fff;
    }
  }
  .time-box{
    width: 700px;
    .name{
      font-size: 20px;
      font-family: Roboto-Bold, Roboto;
      font-weight: bold;
      color: #ADADAD;
      line-height: 24px;
    }
    input{
      margin-top: 20px;
      width: 130px;
      height: 50px;
      background: #0D1319;
      border-radius: 10px;
      border: 1px solid #515151;
      padding: 0 10px;
      font-size: 20px;
    }
    span{
      margin: 0 20px;
      font-size: 20px;
      font-family: Roboto-Bold, Roboto;
      font-weight: bold;
      color: #707070;
      line-height: 24px;
    }
  }
  .input{
    position: relative;
    .mangobox-button{
      width: 60px;
      height: 30px;
      position: absolute;
      left: 560px;
      top: -40px;
      margin: 0!important;
      border-radius: 5px!important;
    }
  }
  .mangobox-button{
    width: 240px;
    height: 50px;
    margin-top: 2em;
  }

}
</style>

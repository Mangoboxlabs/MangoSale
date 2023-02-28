<template>
  <div class="CreateAirdrop">
    <h1>Airdrop</h1>
    <div class="panel-box">
      <div class="title">
        Create Airdrop
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
      <div class="input-box">
        <div class="name">
          Airdrop Title
        </div>
        <input type="text" v-model="airdropParams.title">
      </div>
      <div class="time-box">
        <div class="name">
          Airdrop Start Time(UTC)
        </div>
        <el-date-picker
            class="pickerDate"
            v-model="pickerDate"
            type="datetime"
            placeholder="Choose Date">
        </el-date-picker>

      </div>
      <div class="input-box">
        <div class="name">
          Logo Link
        </div>
        <input type="text" v-model="ipfsObj.LogoLink">
      </div>
      <div class="input-box">
        <div class="name">
          Website
        </div>
        <input type="text" v-model="ipfsObj.Website">
      </div>
      <div class="input-box">
        <div class="name">
          Facebook
        </div>
        <input type="text" v-model="ipfsObj.Facebook">
      </div>
      <div class="input-box">
        <div class="name">
          Twitter
        </div>
        <input type="text" v-model="ipfsObj.Twitter">
      </div>
      <div class="input-box">
        <div class="name">
          Telegram
        </div>
        <input type="text" v-model="ipfsObj.Telegram">
      </div>
      <div class="input-box">
        <div class="name">
          Discord
        </div>
        <input type="text" v-model="ipfsObj.Discord">
      </div>
      <div class="input-box">
        <div class="name">
          Instagram
        </div>
        <input type="text" v-model="ipfsObj.Instagram">
      </div>
      <div class="input-box">
        <div class="name">
          Github
        </div>
        <input type="text" v-model="ipfsObj.Github">
      </div>
      <div class="input-box">
        <div class="name">
          Description
        </div>
        <input type="text" v-model="ipfsObj.Description">
      </div>
    </div>

    <div class="mangobox-button" @click="approve">
      Approve
    </div>
    <div class="mangobox-button" @click="CreateAirdrop">
      CREAT
    </div>
  </div>
</template>

<script>
import abiMap from "../api/apiMap";
import {uploadJson} from "../utils/ipfsApi";

export default {
  name: "CreateAirdrop",
  data() {
    return {
      //5HXnPJkxsdZKuXbiB36EpsYPNrxdgiRETsFmUZSasCkKU8pr
      token: "",
      coinInfo:{},
      pickerDate: new Date(),
      airdropParams: {
        start_time: 0,
        title: undefined,
        information: "",
        description: "",
      },
      ipfsObj:{
        LogoLink:"",
        Website:"",
        Facebook:"",
        Twitter:"",
        Telegram:"",
        Discord:"",
        Instagram:"",
        Github:"",
        Description:""
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
      this.getCoinInfo(this.token.trim())
    }
  },
  methods: {
    approve() {
      this.$store.dispatch("erc20/approve", {
        spender: abiMap.mangoAirdrop.address,
        value: "10000000000000000000000",
        address: "5GgWfjQGcCqiQrjQE7pzhw7x5q5eAhhGgnxqFnT8X7ZUEjQU",
      })
    },
    async getCoinInfo(address){
      if(address.length==48){
        let coin =  await this.$store.dispatch("erc20/queryInfo", address)
        let balance =  await this.$store.dispatch("erc20/balanceOf", {address,owner:this.$store.state.app.account})
        this.coinInfo = {...coin,balance}
      }

    },
    async CreateAirdrop() {
      if(!this.pickerDate){
        this.$eventBus.$emit('message', {
          message: "Please picker date ",
          type: "error"
        })
        return
      }
      if(!this.airdropParams.title){
        this.$eventBus.$emit('message', {
          message: "Please airdrop title ",
          type: "error"
        })
        return
      }
      this.airdropParams.start_time = new Date(this.pickerDate).getTime()
      const ipfsRes = await uploadJson(this.ipfsObj)
      this.airdropParams.information = ipfsRes.data.IpfsHash
      await this.$store.dispatch("mangoAirdrop/newAirdrop", {token:this.token.trim(), ...this.airdropParams})
      this.$router.push("/Airdrop")
    }
  }
}
</script>

<style lang="scss" scoped>
.CreateAirdrop {
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
  .time-box {
    width: 700px;

    .name {
      font-size: 20px;
      font-family: Roboto-Bold, Roboto;
      font-weight: bold;
      color: #ADADAD;
      line-height: 24px;
    }

    input {
      margin-top: 20px;
      width: 130px;
      height: 50px;
      background: #0D1319;
      border-radius: 10px;
      border: 1px solid #515151;
      padding: 0 10px;
      font-size: 20px;
    }

    span {
      margin: 0 20px;
      font-size: 20px;
      font-family: Roboto-Bold, Roboto;
      font-weight: bold;
      color: #707070;
      line-height: 24px;
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
  .input {
    position: relative;

    .mangobox-button {
      width: 60px;
      height: 30px;
      position: absolute;
      left: 560px;
      top: -40px;
      margin: 0 !important;
      border-radius: 5px !important;
    }
  }

  .mangobox-button {
    width: 240px;
    height: 50px;
    margin-top: 2em;
  }

}
</style>

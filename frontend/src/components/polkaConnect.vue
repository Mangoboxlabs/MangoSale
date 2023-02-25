<template>
  <div class="polkaConnect ">
    <button @click="showWallet" v-show="account.length>1" class=" button-connect">
      {{ account.substr(0, 6) + '...' + account.substr(account.length-3, 3) }}
    </button>

    <button size="mini" @click="showWallet" v-show="account.length<1" class="sub-connect button-connect">
      connect
    </button>
    <div v-show="isShowConnectStatus" class="connect-panel " @click="isShowConnectStatus=false;$emit('changeState')">
      <div class="mask"></div>
      <div class="connect-status-box animate__animated  animate__backInDown" @click.stop>
        Connected
      </div>
    </div>

    <div class="connect-panel" v-show="isShowConnect" @click="isShowConnect=false;$emit('changeState')">
      <div class="mask"></div>
      <div class="content  animate__animated  animate__bounceInLeft" @click.stop>
        <h2 class="title">
          Choose Wallet
        </h2>
        <div class="item" :class="{'active': item.address==account}" @click="polkaConnect(item.address)" v-for="(item,index) in accountList" :key="index">
          <div class="address">{{item.address}}</div>
          <div class="name">({{item.meta.name}})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accounts from "../api/Account";
export default {
  name: "polkaConnect",
  props:['changeState','getWeb3'],
  data() {
    return {

      chooseIndex:0,
      isShowConnectStatus: false,
      isLoading: false,
      isShowConnect: false,
      accountList:[],

    }
  },
  computed: {
    account(){
      return this.$store.state.app.account
    }
  },
  async created() {

    // let accountList = await Accounts.accountList();
    // this.accountList = accountList.allAccounts
    // if(accountList.allAccounts&&accountList.allAccounts.length>0){
    //   this.$store.commit("app/SET_ACCOUNT", accountList.allAccounts[0].address)
    //   sessionStorage.setItem('currentAccount', accountList.allAccounts[0].address);
    // }else{
    //   this.$store.commit("app/SET_ACCOUNT", "")
    //   sessionStorage.setItem('currentAccount', "");
    // }
  },
  methods: {
    loginOut() {
      this.$store.dispatch('app/loginOutWeb3')
    },
    async polkaConnect(address) {
      sessionStorage.setItem('account', JSON.stringify(this.accountList));
      if(address){
        sessionStorage.setItem('currentAccount', address);
        this.$store.commit("app/SET_ACCOUNT", address)
         this.$store.dispatch("app/getBalance", address).then(res=>{
           console.log(res)
         })
        this.isShowConnect = false
      }
    },
    async showWallet() {
      let accountList = await Accounts.accountList();
      this.accountList = accountList.allAccounts
      this.$emit('changeState',true)
      if (this.isConnected) {
        this.isShowConnectStatus = true
      } else {
        this.isShowConnect = true
      }
    },
    disConnect() {
      if (this.connectIdx != 1) {
        if (this.provider) this.provider.disconnect()
        this.isShowConnectStatus = false
        this.connectIdx = 0
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.polkaConnect {
  color: #2c3e50;
  display: flex;

  .button-connect {
    cursor: pointer;
    line-height: 0;
    height: 36px;
    padding: 10px 20px;
    background: #1D2833;
    border-radius: 20px;
    border: 1px solid #515151;
    color:#fff;
  }

  .connect {
    height: 200px;
    margin-top: 25%;
  }

  .connect-panel {
    z-index: 1000;
    text-align: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    margin-left: -50vw;
    top: 0px;
    left: 50%;
    will-change: opacity;

    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.1s ease-in-out 0s;
    .title{
      font-size: 2em;
    }
    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .content {
      z-index: 2000;
      position: relative;
      background-color: rgb(255, 255, 255);
      width: 800px;
      padding: 50px;
      max-height: 600px;
      border-radius: 1em;
      margin: 10px;
      overflow: auto;

      .item {
        width: 600px;
        cursor: pointer;
        border: 1px solid #eee;
        margin: 10px auto;
        display: flex;
        align-items: center;
        justify-content: space-around;
        &.active{
          border: 1px solid;
          border-image:  var(--primary-bg-color);
          border-radius: 0px;
          box-shadow: 0px 0px 1px 1px var(--primary)
        }
        .name{
          font-size: 16px;
          line-height: 30px;
        }
        .address{
          font-size: 12px;
          color: #999;
        }
      }
    }

    .connect-status-box {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 2000;
      width: 500px;
      border-radius: 10px;
      min-height: 200px;
      background: white;
    }
  }

  .myButton {
    box-shadow: 0px 1px 0px 0px #f0f7fa;
    background: linear-gradient(to bottom, #33bdef 5%, #019ad2 100%);
    background-color: #33bdef;
    border-radius: 6px;
    border: 1px solid #057fd0;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 24px;
    text-decoration: none;
    text-shadow: 0px -1px 0px #5b6178;
  }

  .myButton:hover {
    background: linear-gradient(to bottom, #019ad2 5%, #33bdef 100%);
    background-color: #019ad2;
  }

  .myButton:active {
    position: relative;
    top: 1px;
  }

  .connect-status {
    box-shadow: inset 0px 1px 0px 0px #ffffff;
    background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
    background-color: #ffffff;
    border-radius: 6px;
    border: 1px solid #dcdcdc;
    display: inline-block;
    cursor: pointer;
    color: #666666;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #ffffff;

    &:hover {
      background: linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
      background-color: #f6f6f6;
    }

    &:active {
      position: relative;
      top: 1px;
    }

  }
}
</style>

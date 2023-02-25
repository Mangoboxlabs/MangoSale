<template>
  <div class="DetailsView">
    <detailHeader :projectObj="project"></detailHeader>
    <div class="DetailsView-content">
      <div class="left-content">
        <div class="row">
          <div class="name">
            VOLUME
          </div>
          <div class="value">
            {{ volume }}
          </div>
        </div>
        <div class="row">
          <div class="name">
            IN TREASURY
          </div>
          <div class="value">
            {{ volume }}
          </div>
        </div>
        <div class="row">
          <div class="name">
            DISTRIBUTED
          </div>
          <div class="value">
            100% OVERFLOW
          </div>
        </div>
        <!--      <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>-->
        <div class="row">
          <div>
            IN WALLET
          </div>
          <strong >
            {{myTokenBalance}}
          </strong>
        </div>
        <!--        <div id="coin-chart"></div>-->
        <div v-show="!tokenAddress && tokenOwner==$store.state.app.account" class="mangobox-button"
             @click="isShowCreate=true" style="margin-top: 30px;padding: 10px 0">
          Create Token
        </div>
        <h2 class="not-begun" v-show="!tokenAddress && tokenOwner!=$store.state.app.account">
          Fund-raising has not begun
        </h2>
        <div class="token-panel" v-show="tokenAddress">
          <h4 class="sub-title">
            Tokens

            <!--            <div class="mangobox-button" @click="isShowMint = true">-->
            <!--              mintFor-->
            <!--            </div>-->
          </h4>
          <div class="row">
            <div class="name">
              Total supply
            </div>
            <div class="value">
              {{ tokenSupply }}tokens
            </div>
          </div>
          <div class="row">
            <div class="name">
              Your balance
            </div>
            <div class="value">
              {{ myBalance }} tokens
            </div>
            <div class="mangobox-button" style="padding:6px 10px" @click="isShowManageToken = true">
              Manage Token
            </div>
          </div>
          <h4 class="sub-title">
            Funding cycle #{{parseInt(currentCycleInfo.number)  +1}}
          </h4>
          <div class="row">
            <div class="name">
              Distribution limit
            </div>
            <div class="value">
              {{currentCycleInfo.baseOn?currentCycleInfo.baseOn:"Zero"}}
            </div>
          </div>
          <div class="row">
            <div class="name">
              Duration
            </div>
            <div class="value">
              {{currentCycleInfo.duration==0?"Not set":currentCycleInfo.duration}}
            </div>
          </div>
<!--          <div class="row">-->
<!--            <div class="name">-->
<!--              discountRate-->
<!--            </div>-->
<!--            <div class="value">-->
<!--              {{currentCycleInfo.discountRate}}-->
<!--            </div>-->
<!--          </div>-->
          <div class="row">
            <div class="name">
              weight
            </div>
            <div class="value">
              {{weight}}
            </div>
          </div>
        </div>

      </div>
      <div class="right-content" v-show="tokenAddress">
        <div class="row" style="position: relative">
          <div class="input-box">
            <input type="text" v-model="amount">
          </div>
          <strong style="position: absolute;left: 270px;top: 8px">USDT</strong>
          <div class="mangobox-button" @click="pay" style="padding: 0 30px">
            PAY
          </div>

        </div>
        <div>
          Receive
          <strong> {{distributeAmountNumber}}{{coinInfo.name}}/1USDT</strong>
        </div>
        <h3 class="sub-title">
          Activity
        </h3>
        <div class="paid-list">
          <div class="paid-item" v-for="(item,index) in PayRecord" :key="index">
            <div class="row paid-item-header">
              <div>
                Paid
              </div>
              <div>
                {{ item.time }}
              </div>
            </div>
            <div class="row paid-item-content">
              <div class="value">
                ${{ item.value }}
              </div>
              <div>
                {{ item.payer.substr(0, 6) + '...' + item.payer.substr(item.payer.length - 5, item.payer.length) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="create-token-dialog" v-show="isShowCreate">
      <div class="mask"></div>
      <div class="content  animate__animated  animate__bounceInLeft" @click.stop>
        <h1>Create Token</h1>
        <h3>Token Name</h3>
        <input type="text" v-model="tokenName" placeholder="Token Name">
        <h3>Token Symbol</h3>
        <input type="text" v-model="tokenSymbol" placeholder="Token Symbol">
        <div class="operate-btns">
          <div class="mangobox-button" @click="issueTokenFor">
            Create
          </div>
          <div class="mangobox-button" @click="isShowCreate=false">
            Cancel
          </div>
        </div>

      </div>
    </div>
    <div class="create-token-dialog" v-show="isShowMint">
      <div class="mask"></div>
      <div class="content  animate__animated  animate__bounceInLeft" @click.stop>
        <h1>Mint Token</h1>
        <h3>Mint Amount</h3>
        <input type="text" v-model="mintAmount" placeholder="amount">
        <div class="operate-btns">
          <div class="mangobox-button" @click="mintFor">
            Mint
          </div>
          <div class="mangobox-button" @click="isShowMint=false">
            Cancel
          </div>
        </div>

      </div>
    </div>
    <div class="create-token-dialog" v-show="isShowManageToken">
      <div class="mask"></div>
      <div class="content">
        <div class="close" @click="isShowManageToken=false">
          x
        </div>
        <h1> Manage your token</h1>
        <div class="operate-box" @click="isShowBurn=true">
          <h3 class="title">
            Burn Token
          </h3>
          <div class="info">
            Burn your Token. You won't receive USDT in return because this project has no overflow.
          </div>
          <div class="icon">
            <img src="../imgs/caret-right.webp" alt="">
          </div>
        </div>
        <div class="operate-box"  @click="isShowClaim=true">
          <h3 class="title">
            Claim Token as ERC-20
          </h3>
          <div class="info">
            Move your Token from the Mangobox contract to your wallet.
          </div>
          <div class="icon">
            <img src="../imgs/caret-right.webp" alt="">
          </div>
        </div>
        <div class="operate-btns">
          <div class="mangobox-button" @click="isShowManageToken = false">
            Cancel
          </div>
        </div>
      </div>
    </div>
    <div class="create-token-dialog" v-show="isShowBurn">
      <div class="mask"></div>
      <div class="content  animate__animated  animate__bounceInLeft" @click.stop>
        <h1>Burn Token</h1>
        <h3>Mint Amount</h3>
        <input type="text" v-model="burnAmount" placeholder="burn amount">
        <input type="text" v-model="burnMemo" placeholder="Memo(optional)">
        <div class="operate-btns">
          <div class="mangobox-button" @click="redeemTokensOf">
            Burn
          </div>
          <div class="mangobox-button" @click="isShowBurn=false">
            Cancel
          </div>
        </div>

      </div>
    </div>
    <div class="create-token-dialog" v-show="isShowClaim">
      <div class="mask"></div>
      <div class="content  animate__animated  animate__bounceInLeft" @click.stop>
        <h1>Claim Token</h1>
        <h3>Mint Amount</h3>
        <input type="text" v-model="claimAmount" placeholder="Claim amount">
        <div class="operate-btns">
          <div class="mangobox-button" @click="claimFor">
            Claim
          </div>
          <div class="mangobox-button" @click="isShowClaim=false">
            Cancel
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import detailHeader from "../components/detail-header"
import moment from "moment"
import abiMap from "../api/apiMap";


export default {
  name: "DetailsView",
  components: {
    detailHeader
  },
  data() {
    return {
      moment,
      tokenOwner: "",
      mintAmount: undefined,
      project: {},
      isShowManageToken: false,
      isShowCreate: false,
      isShowMint: false,
      isShowBurn: false,
      isShowClaim:false,
      burnAmount: undefined,
      burnMemo: undefined,
      claimAmount:undefined,
      volume: 0,
      myBalance:0,
      tokenSupply: 0,
      projectId: null,
      tokenName: undefined,
      tokenSymbol: undefined,
      amount: undefined,
      PayRecord: [],
      tokenAddress: undefined,
      myTokenBalance:0,
      currentCycleInfo:{},
      weight:0,
      distributeAmountNumber:0,
      coinInfo:{}
    }
  },
  methods: {
    queryCoinInfo(){
      this.$store.dispatch("MBToken/queryInfo",
          this.tokenAddress,
      ).then((res) => {
        this.coinInfo = res
      })
    },
    distributeAmount(){
      this.$store.dispatch("MBERC20PaymentTerminal/distributeAmount",
       this.projectId,
      ).then((res) => {
        this.distributeAmountNumber =res
      })
    },
    tokenBalanceOf(){
      this.$store.dispatch("MBToken/balanceOf", {
        coinAddr:this.tokenAddress, owner:this.$store.state.app.account
      }).then((res) => {
        this.myTokenBalance =res
        this.isShowBurn = false
      })
    },
    redeemTokensOf() {
      this.$store.dispatch("MBERC20PaymentTerminal/redeemTokensOf", {
        _holder: this.$store.state.app.account,
        _projectId: this.projectId,
        _tokenCount: this.burnAmount,
        _token: this.tokenAddress,
        _minReturnedTokens:0,
        _beneficiary:this.$store.state.app.account,
        _memo:this.burnMemo
      }).then(() => {
        this.isShowBurn = false
        this.balanceOf(this.$store.state.app.account).then(res=>{
          this.myBalance = res
        })
      })
    },
    claimFor(){
      this.$store.dispatch("MBTokenStore/claimFor", {
        _projectId:this.projectId, _holder:this.$store.state.app.account, _amount:this.claimAmount
      }).then(() => {
        this.isShowClaim = false
        this.tokenBalanceOf()

      })
    },
    getProjectsWeight(){
      this.$store.dispatch("MBFundingCycleStore/getProjectsWeight", this.projectId).then(res => {
        if(res){
          this.weight = res.replace(/,/g,'')
        }
        if(this.weight > 0){
          this.weight = parseInt(this.weight)/(10**18)
        }
      })
    },
    currentOf(){
      this.$store.dispatch("MBFundingCycleStore/currentOf", this.projectId).then(res => {
        this.currentCycleInfo = res
      })
    },
    getProjectTokenAddress() {
      this.$store.dispatch("MBTokenStore/getProjectTokenAddress", this.projectId).then(res => {
        this.tokenAddress = res
        if(res){
          this.tokenBalanceOf()
          this.queryCoinInfo()
        }
      })
    },
    tokenOwnerOf() {
      this.$store.dispatch("MBProjects/ownerOf", this.projectId).then(res => {
        this.tokenOwner = res
      })
    },
    pay() {
      this.$store.dispatch("MBERC20PaymentTerminal/pay", {
        _projectId: this.projectId,
        _amount: this.amount,
        _token: this.$store.state.app.account,
        _beneficiary: this.$store.state.app.account,
        _minReturnedTokens: 0,
        _preferClaimedTokens: false,
        _memo: "",
        _metadata: ""
      }).then(() => {
        this.getPayRecords()
        this.balanceOf(this.$store.state.app.account).then(res=>{
          this.myBalance = res
        })
      })
    },
    getPayRecords() {
      this.$store.dispatch("MBERC20PaymentTerminal/getPayRecords", this.projectId).then(res => {
        this.PayRecord = res
        this.PayRecord.forEach(item => {
          const timestr = item.time.replace(/,/g, '').trim()
          item.time = this.moment(new Date(parseInt(timestr))).format('MMMM Do YYYY, h:mm:ss a')
        })
        this.PayRecord.reverse()
      })
    },
    getBalanceOf(id) {
      return this.$store.dispatch("MBSingleTokenPaymentTerminalStore/getBalanceOf", {
        _account: abiMap["MBERC20PaymentTerminal"].address,
        _projectId: id
      })
    },
    balanceOf(address) {
      if(!address){
        address="5DyQtzR89WGjAchokxH5Ntc2mxC9ruaUGi4nKYZCSq6VUMg1"
      }
      return this.$store.dispatch("MBTokenStore/balanceOf", {
        _holder: address, _projectId: this.projectId
      })
    },

    issueTokenFor() {
      if (this.tokenName && this.tokenSymbol && this.tokenName.length > 0 && this.tokenSymbol.length > 0) {
        return this.$store.dispatch("MBController/issueTokenFor", {
          _projectId: this.projectId, _name: this.tokenName, _symbol: this.tokenSymbol
        }).then(() => {
          this.isShowCreate = false
          setTimeout(()=>{
            this.getProjectTokenAddress()
            this.currentOf()
          },500)
        })

      } else {
        this.$eventBus.$emit('message', {
          message: "Please Input tokenName && tokenSymbol",
          type: "error"
        })
      }

    },
    mintFor() {
      if (this.mintAmount > 0) {
        this.$store.dispatch("MBTokenStore/mintFor", {
          _holder: this.$store.state.app.account,
          _projectId: this.projectId,
          _amount: this.mintAmount,
          _preferClaimedTokens: false
        }).then(() => {
          this.isShowMint = false
        })

      } else {
        this.$eventBus.$emit('message', {
          message: "Please Input Mint Amount",
          type: "error"
        })
      }

    },

  },
  created() {
    this.projectId = this.$route.query.id
    this.project = this.$route.query
    this.getBalanceOf(this.projectId).then(res => {
      this.volume = res
    })
    this.balanceOf().then(res=>{
      this.volume = res
    })
    this.balanceOf(this.$store.state.app.account).then(res=>{
      this.myBalance = res
    })
    this.getPayRecords()
    this.getProjectTokenAddress()
    this.tokenOwnerOf()
    this.currentOf()
    this.distributeAmount()
    this.getProjectsWeight()
  },
  mounted() {
    // this.initChart()
  }
}
</script>

<style lang="scss" scoped>
.DetailsView {
  background: #F8F8F8;

  #coin-chart {
  }

  .DetailsView-content {
    width: 1000px;
    margin: 30px auto;
    display: flex;
    justify-content: space-between;

    .sub-title {
      display: flex;
      justify-content: space-between;
      margin: 30px 0;
      font-size: 1.3em;
      font-family: Roboto-Bold, Roboto;
      font-weight: bold;
      color: #2AAB00;
      line-height: 24px;

      .mangobox-button {
        padding: 6px 20px;
      }
    }
    .not-begun{
      font-size: 26px;
      text-align: center;
      padding: 10px 0;
    }
    .left-content, .right-content {
      width: 45%;


      .input-box {
        input {
          width: 320px;
          height: 36px;
          background: #F8F8F8;
          border-radius: 10px;
          border: 1px solid #D8D8D8;
        }
      }

      .row {
        justify-content: space-between;
        margin: 10px 0;

        .name {
          color: #999;
        }

        .value {
          font-weight: bold;
        }

      }
    }

    .right-content {
      .input-box input {
        padding: 0 60px 0 10px;
      }

      .paid-list {
        max-height: 600px;
        overflow: auto;
        padding: 0 10px;
        &::-webkit-scrollbar {
          width: 10px;
          height: 4px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 5px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background-color: #99a9bf;
        }


        .paid-item {
          padding: 6px 0;
          color: #CCCCCC;

          .paid-item-content {
            .value {
              color: #111;
              font-weight: bold;
            }
          }
        }
      }
    }
  }

  .create-token-dialog {
    z-index: 1000;
    text-align: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    margin-left: -50vw;
    top: 0px;
    left: 50%;
    will-change: opacity;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.1s ease-in-out 0s;

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

      .close {
        position: absolute;
        right: 20px;
        top: 0px;
        font-size: 32px !important;
        cursor: pointer;
      }

      input {
        width: 460px;
        height: 50px;
        background: #F8F8F8;
        border-radius: 10px;
        border: 1px solid #D8D8D8;
        padding: 0 10px;
      }

      .operate-box {
        margin-top: 20px;
        border: 1px solid #2AAA00;
        text-align: left;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        position: relative;

        .icon {
          position: absolute;
          right: 10px;
          top: 28px;

          img {
            width: 20px;
          }
        }
      }

      .operate-btns {
        margin: 20px;
        display: flex;
        justify-content: center;

        .mangobox-button {
          padding: 10px 30px;
          margin-right: 30px;
        }
      }
    }

    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>

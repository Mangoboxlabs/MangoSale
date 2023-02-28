<template>
  <div class="airdrop-detail">
    <div class="panel-box">
      <div class="title">
        Airdrop Address
      </div>
      <div class="info-list">
        <div class="row">
          <div class="name">
            Token Address
          </div>
          <div class="value">
            {{ queryParams.token }}
          </div>
        </div>
        <div class="row">
          <div class="name">
            Token Name
          </div>
          <div class="value">
            {{ coinInfo.name }}
          </div>
        </div>
        <div class="row">
          <div class="name">
            Symbol
          </div>
          <div class="value">
            {{ coinInfo.symbol }}
          </div>
        </div>
        <div class="row">
          <div class="name">
            Decimal
          </div>
          <div class="value">
            {{ coinInfo.decimals }}
          </div>
        </div>
        <div class="row">
          <div class="name">
            Balance
          </div>
          <div class="value">
            {{ balance }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex-box claim-panel" style="display: flex;justify-content: space-between">
      <div class="panel-box part2" style="width: 48%">
        <div class="live">

        </div>
        <div class="start-time">
        <span>
          Start Time(UTC)
        </span>
          <span>
          {{
              moment(new Date(queryParams.startTime.replace(new RegExp(',', 'g'), ''))).format('MMMM Do YYYY, h:mm:ss a')
            }}
        </span>
        </div>
        <div class="start-time">
        <span>
          Your Allocation
        </span>
          <span>
          {{ queryParams.userCollect.isExtract.toString() == "false" ? queryParams.userCollect.amount : 0 }}
        </span>
        </div>

        <div class="mangobox-button" @click="collect" v-show="queryParams.userCollect.amount>0">
          Claim
        </div>

      </div>
      <div class="panel-box admin-panel" style="width: 48%"
           v-show="queryParams.owner.toLowerCase() == account.toLowerCase()">
        <div class="distribution-member" v-for="(item,index) in disArr" :key="index">
          <div class="input-box">
            <div class="name">
              member{{ index + 1 }}.Distribution Account
            </div>
            <input type="text" v-model="item.account">
          </div>
          <div class="input-box">
            <div class="name">
              member{{ index + 1 }}.Distribution Number
            </div>
            <input type="number" v-model="item.amount">
          </div>
        </div>
        <div class="flex-box" style="display: flex;justify-content: space-between;width: 100%">
          <svg @click="disArr.push({})" class="add-btn icon" t="1677570644221" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="4067" width="48" height="48">
            <path
                d="M512 1024C229.229714 1024 0 794.770286 0 512S229.229714 0 512 0s512 229.229714 512 512-229.229714 512-512 512z m0-928C282.258286 96 96 282.258286 96 512S282.258286 928 512 928 928 741.741714 928 512 741.741714 96 512 96z m208.018286 463.981714h-160v160.036572a48.018286 48.018286 0 0 1-96.036572 0v-160.036572H303.981714a47.981714 47.981714 0 0 1 0-95.963428h160V304.018286a48.018286 48.018286 0 0 1 96.036572 0v160h160a47.981714 47.981714 0 0 1 0 95.963428z"
                fill="#ffffff" p-id="4068"></path>
          </svg>
          <svg @click="disArr.pop()" t="1677570833662" class="add-btn icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="5089" width="48" height="48">
            <path
                d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m0-896C299.968 128 128 299.968 128 512s171.968 384 384 384 384-171.968 384-384S724.032 128 512 128z m192 448H320a64 64 0 1 1 0-128h384a64 64 0 0 1 64 64c0 35.392-28.608 64-64 64z"
                fill="#ffffff" p-id="5090"></path>
          </svg>
        </div>
        <div class="mangobox-button" @click="approve">
          approve
        </div>
        <div class="mangobox-button" @click="distribution">
          distribution
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import moment from "moment"
import abiMap from "../api/apiMap";

export default {
  name: "AirdropDetail",
  data() {
    return {
      moment,
      dAmount: undefined,
      coinInfo: {
        decimals: 0,
        balance: 0,
        name: "",
        symbol: ""
      },
      balance: 0,
      queryParams: {},
      disArr: [{
        account: this.$store.state.app.account,
        amount: undefined,
        isExtract: false
      }]
    }
  },
  computed: {
    account() {
      return this.$store.state.app.account
    }
  },
  watch: {
    account() {
      this.getData()
    }
  },
  methods: {
    approve() {
      this.$store.dispatch("erc20/approve", {
        spender: abiMap.mangoAirdrop.address,
        value: "100000000000000000000000000000",
        address: this.queryParams.token,
      })
    },
    async collect() {
      if (this.queryParams.userCollect.amount <= 0) {
        this.$eventBus.$emit('message', {
          message: "do not have Allocation ",
          type: "error"
        })
        return
      }
      await this.$store.dispatch("mangoAirdrop/collect", this.queryParams.id)
      setTimeout(() => {
        this.userCollect()
      }, 1000)
    },
    async distribution() {
      try {

        await this.$store.dispatch("mangoAirdrop/distribution", {
          id: this.queryParams.id,
          information:this.disArr
        })
        setTimeout(() => {
          this.userCollect()
        }, 1000)
      } catch (e) {
        console.log(e)
      }
    },
    async userCollect() {
      let userCollect = await this.$store.dispatch("mangoAirdrop/getUserCollect", this.queryParams.id)
      userCollect.amount = userCollect.amount.replace(new RegExp(',', 'g'), '')
      this.queryParams.userCollect = userCollect

    },
    async getData() {
      let queryParams = this.$route.query
      console.log(queryParams)

      this.queryParams = queryParams
      queryParams.userCollect.amount = queryParams.userCollect.amount.replace(new RegExp(',', 'g'), '')
      if (queryParams && queryParams.tokenInfo) {
        this.coinInfo = queryParams.tokenInfo
        let balance = await this.$store.dispatch("erc20/balanceOf", {
          address: queryParams.token,
          owner: this.$store.state.app.account
        })
        this.balance = balance
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.airdrop-detail {
  width: 1200px;
  margin: 20px auto;

  .input-box {
    width: 90%;

    input {
      width: 100% !important;
    }
  }

  .add-btn {
    margin: 10px auto;
    cursor: pointer;
  }

  .panel-box {
    .mangobox-button {
      height: 50px;
      margin-top: 2em;
    }

    .start-time {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      padding: 10px 0;
    }
  }

  .mangobox-button {
    width: 80%;
    margin: 0 auto;
  }

  .info-list {
    margin: 1em 0;
    padding: 0 20px;

    .row {
      display: flex;
      padding: 1em 0;
      width: 800px;
      justify-content: space-between;

      .name {
        font-size: 20px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #ADADAD;
        line-height: 24px;
      }

      .value {
        font-size: 20px;
        font-family: Roboto-Bold, Roboto;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 24px
      }
    }
  }
}
</style>

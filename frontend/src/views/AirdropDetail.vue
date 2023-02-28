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
      <div class="panel-box admin-panel" style="width: 48%"  v-show="queryParams.owner.toLowerCase() == account.toLowerCase()">
        <div class="input-box">
          <div class="name">
            Distribution Number
          </div>
          <input type="number" v-model="dAmount">
        </div>
        <div class="mangobox-button" @click="approve">
          approve
        </div>
        <div class="mangobox-button" @click="distribution"
            >
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
      queryParams: {}
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
        if (!this.dAmount) {
          this.dAmount = 100
        }
        await this.$store.dispatch("mangoAirdrop/distribution", {
          id: this.queryParams.id,
          information: [{
            account: this.account,
            amount: this.dAmount,
            isExtract: false
          }]
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
      userCollect.amount = userCollect.amount.replace(new RegExp(',','g'),'')
      this.queryParams.userCollect = userCollect

    },
    async getData() {
      let queryParams = this.$route.query
      console.log(queryParams)

      this.queryParams = queryParams
      queryParams.userCollect.amount = queryParams.userCollect.amount.replace(new RegExp(',','g'),'')
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

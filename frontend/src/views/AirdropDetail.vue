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
    <div class="panel-box part2">
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
          {{ queryParams.userCollect.isExtract.toString()=="false" ? queryParams.userCollect.amount : 0 }}
        </span>
      </div>

      <div class="mangobox-button" @click="collect">
        Claim
      </div>
      <div class="mangobox-button" @click="approve">
        approve
      </div>
      <div class="mangobox-button" @click="distribution">
        distribution
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
      if(this.queryParams.userCollect.amount<=0){
        this.$eventBus.$emit('message', {
          message: "do not have Allocation ",
          type: "error"
        })
        return
      }
      await this.$store.dispatch("mangoAirdrop/collect", this.queryParams.id)
      setTimeout(()=>{
        this.userCollect()
      },1000)
    },
    async distribution() {
      try {
        await this.$store.dispatch("mangoAirdrop/distribution", {
          id: this.queryParams.id,
          information: [{
            account: this.account,
            amount: 100,
            isExtract: false
          }]
        })
        setTimeout(()=>{
          this.userCollect()
        },1000)
      }catch (e) {
        console.log(e)
      }
    },
    async userCollect(){
      let userCollect = await this.$store.dispatch("mangoAirdrop/getUserCollect", this.queryParams.id)
      this.queryParams.userCollect =userCollect
    },
    async getData() {
      let queryParams = this.$route.query
      console.log(queryParams)

      this.queryParams = queryParams
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

  .part2 {
    .mangobox-button {
      height: 50px;
      margin-top: 2em;
    }
    .start-time{
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      padding: 10px 0;
    }
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

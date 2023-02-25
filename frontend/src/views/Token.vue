<template>
  <div class="token">
    <div class="panel-box">
      <div class="token-list">
        <div class="list-header">
          <div class="col">
            Contract Address
          </div>
          <div class="col">
            Name
          </div>
          <div class="col">
            Symbol
          </div>
          <div class="col">
            Owner
          </div>
          <div class="col">
            Total Supply
          </div>
        </div>
        <div class="row" v-for="(item,index) in list" :key="index" @click="goAdmin(item)">
          <div class="col">
            {{ item.address ? item.address.substr(0, 5) + "..." + item.address.substr(item.address.length - 4, item.address.length) : "" }}
          </div>
          <div class="col">
            {{ item.name }}
          </div>
          <div class="col">
            {{ item.symbol }}
          </div>


          <div class="col">
            {{ item.owner ? item.owner.substr(0, 5) + "..." + item.owner.substr(item.owner.length - 4, item.owner.length) : "" }}
          </div>
          <div class="col">
            {{ item.totalSupply }}
          </div>
        </div>
        <el-pagination
            class="pagination"
            layout="prev, pager, next"

            :total="list.length">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "tokenView",
  data() {
    return {
      loading: false,
      list: []
    }
  },
  computed: {
    account() {
      return this.$store.state.app.account
    }
  },
  watch: {
    account() {
      this.getUserTokens()
    }
  },
  methods: {
    goAdmin(item){
      console.log(item)
      if(item.owner == this.$store.state.app.account){
        this.$router.push({name:"TokenAdmin",params:item})
      }

    },
    async getUserTokens() {
      let res = await this.$store.dispatch("tokenFactory/getUserTokens", this.$store.state.app.account)
      let tempList = []
      if (res && res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          let coin = await this.$store.dispatch("erc20/queryInfo", res[i])
          tempList.push({...coin, address: res[i]})
        }
      }
      this.list = tempList
      console.log(tempList)
    }
  },
  created() {
    this.getUserTokens()
  }
}
</script>

<style lang="scss" scoped>
.token {
  width: 1200px;
  margin: 0 auto;
  color: #fff;

  .panel-box {
    margin-top: 2em;

  }

  ::v-deep .number, ::v-deep .more, ::v-deep .btn-next, ::v-deep .btn-prev {
    background: #0D1319;
    color: #fff;
  }

  .pagination {
    margin: 10px auto;
    text-align: center;
  }

  .token-list {
    min-height: 500px;

    .col {
      width: 20%;
    }

    .list-header {
      background: #0D1319;
      border-radius: 10px;
      width: 100%;
      display: flex;
      height: 60px;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      font-family: Roboto-Medium, Roboto;
      font-weight: 500;
      color: #ADADAD;
      line-height: 21px;
      padding: 0 20px;
    }

    .row {
      display: flex;
      justify-content: space-between;
      height: 66px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
      align-items: center;
      padding: 0 20px;

      .col:nth-child(1) {

      }
    }
  }
}
</style>

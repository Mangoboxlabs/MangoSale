<template>
  <div class="Lock">
    <div class="panel-box">
      <div class="token-list">
        <div class="list-header">
          <div class="col">
            Token/LP Token
          </div>
          <div class="col">
            Unlock Time
          </div>
          <div class="col">
            Amount
          </div>
          <div class="col">
            Owner
          </div>

          <div class="col">
            View
          </div>
        </div>
        <div class="row" v-for="(item,index) in list" :key="index">
          <div class="col">
            {{item.coinInfo?item.coinInfo.name:""}}
          </div>
<!--          <div class="col">-->
<!--            {{ item.contract ? item.contract.substr(0, 5) + "..." + item.contract.substr(item.contract.length - 4, item.contract.length) : "" }}-->
<!--          </div>-->
          <div class="col">
              {{ moment(new Date(parseInt(item.endTime)) ).format('MMMM Do YYYY, h:mm:ss a') }}
          </div>
          <div class="col">
            {{ item.amount }}
          </div>


          <div class="col">
            {{ item.owner ? item.owner.substr(0, 5) + "..." + item.owner.substr(item.owner.length - 4, item.owner.length) : "" }}
          </div>

          <div class="col ">
            <div class="mangobox-button" @click="$router.push({path:'/LockDetail',params:item})">
              View
            </div>
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
import moment from "moment";

export default {
  name: "lockView",
  data() {
    return {
      moment,
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
      this.getUserLocks()
    }
  },
  methods: {
    async getUserLocks() {
      let res = await this.$store.dispatch("mangoLock/getUserLocks", this.$store.state.app.account)
      let tempArr = []
     for (let i=0;i<res.length;i++){
       res[i].endTime = res[i].endTime.replace(new RegExp(',', 'g'), '')
       let coinInfo = await this.$store.dispatch("erc20/queryInfo", res[i].contract)
       tempArr.push({
         coinInfo,
         ...res[i]
       })
       console.log(coinInfo)
     }
      console.log(tempArr)
      this.list = tempArr
    }
  },
  created() {
    setTimeout(()=>{
      this.getUserLocks()
    },1500)
  }
}
</script>

<style lang="scss" scoped>
.Lock {
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
    .col:nth-child(1){
      width: 20%;
    }
    .col:nth-child(2){
      width: 35%;
    }
    .col:nth-child(3){
      width: 20%;
    }
    .col:nth-child(4){
      width: 20%;
    }
    .col:nth-child(5){
      width: 20%;
    }
    .row {
      display: flex;
      justify-content: space-between;
      height: 66px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
      align-items: center;
      padding: 0 20px;

      .mangobox-button {
        width: 100px;
        height: 40px;
        background: #063E2E !important;
        border-radius: 20px;
        border: 1px solid #00C289 !important;
      }

      .col:nth-child(1) {

      }
    }
  }
}
</style>

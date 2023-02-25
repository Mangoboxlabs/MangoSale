<template>
  <div class="lock-detail">
    <h1>
      Lock View
    </h1>
    <div class="panel-box">
      <div class="title">
        Lock Info
      </div>
      <div class="info-list">
        <div class="row">
          <div class="name">
            Current Locked Amount
          </div>
          <div class="value">
            1,000 DAI
          </div>
        </div>
        <div class="row">
          <div class="name">
            Current Values Locked
          </div>
          <div class="value">
            $ 1,000
          </div>
        </div>
        <div class="row">
          <div class="name">
            Token Address
          </div>
          <div class="value">
            0x442…5fF7
          </div>
        </div>
        <div class="row">
          <div class="name">
            Token Name
          </div>
          <div class="value">
            DAI Stablecoin
          </div>
        </div>
        <div class="row">
          <div class="name">
            Token Sumbol
          </div>
          <div class="value">
            DAI
          </div>
        </div>
        <div class="row">
          <div class="name">
            Token Decimals
          </div>
          <div class="value">
            18
          </div>
        </div>
      </div>
    </div>
    <div class="panel-box">
      <div class="title">
        Lock Records
      </div>
      <div class="token-list">
        <div class="list-header">
          <div class="col">
            Token Address
          </div>
          <div class="col">
            EndTime
          </div>
          <div class="col">
            Amount
          </div>
          <div class="col">
            Owner
          </div>
          <div class="col">
            Countdown
          </div>

        </div>
        <div class="row" v-for="(item,index) in list" :key="index">
          <div class="col">
            {{ item.contract ? item.contract.substr(0, 5) + "..." + item.contract.substr(item.contract.length - 4, item.contract.length) : "" }}
          </div>
          <div class="col">
            {{ moment(new Date(parseInt(item.endTime)) ).format('MMMM Do YYYY, h:mm:ss a') }}
          </div>
          <div class="col">
            {{ item.amount }}
          </div>


          <div class="col">
            {{ item.owner ? item.owner.substr(0, 5) + "..." + item.owner.substr(item.owner.length - 4, item.owner.length) : "" }}
          </div>
          <div class="col">
            {{ item.countDown }}
          </div>

        </div>
        <el-pagination
            class="pagination"
            layout="prev, pager, next"
            page-size=10

            :total="list.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "LockDetail",
  data(){
    return{
      moment,
      list:[]
    }
  },
  methods:{
    async getUserLocks() {
      let res = await this.$store.dispatch("mangoLock/getUserLocks", this.$store.state.app.account)
      console.log(res)
      res.forEach(item=>{
        item.endTime = item.endTime.replace(new RegExp(',', 'g'), '')
        item.countDown = 0
        let end = new Date(parseInt(item.endTime)),now = new Date()
        if(end.getTime()>now.getTime()){
          let differTime = ((end.getTime() - now.getTime())/1000)
          item.countDown = parseInt(differTime/(60*60*24)) + "days " + parseInt(differTime%(60*60*24)/3600) + "hours "+parseInt(differTime%(60*60*24)%3600/60) + "mins "
          +parseInt(differTime%(60*60*24)%3600%60) + "secs"
        }
      })
      this.list = res
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
.lock-detail {
  width: 1200px;
  margin: 0 auto;
  ::v-deep .number ,::v-deep .more,::v-deep .btn-next,::v-deep .btn-prev{
    background: #0D1319;
    color: #fff;
  }
  h1{
    padding: 1em 0;
  }
  .title{
    padding: 1em 0;
  }
  .info-list{
    .row{
      display: flex;
      padding: 1em 0;
      width: 500px;
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
  .token-list{
    min-height: 500px;
    .col:nth-child(1){
      width: 10%;
    }
    .col:nth-child(2){
      width: 25%;
    }
    .col:nth-child(3){
      width: 10%;
    }
    .col:nth-child(4){
      width: 20%;
    }
    .col:nth-child(5){
      width: 20%;
    }
    .list-header{
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
    .row{
      display: flex;
      justify-content: space-between;
      height: 66px;
      border-bottom: 1px solid rgba(255,255,255,0.25);
      align-items: center;
      padding: 0 20px ;
      .col:nth-child(1){

      }
    }
  }
}
</style>

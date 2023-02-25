<template>
  <div class="home">
    <div class="home-content">
      <h2>Airdrop List</h2>
      <div class="info-list">
        <div class="info-item">
          <div class="name">
            Airdrop Launched
          </div>
          <div class="value">
            4,000
          </div>
        </div>
        <div class="info-item">
          <div class="name">
            Participants
          </div>
          <div class="value">
            4,000,000
          </div>
        </div>
      </div>
      <div class="nav-list">
        <div class="nav-item" @click="activeIndex=1" :class="{'active':activeIndex==1}">
          All Airdrop
        </div>
        <div class="nav-item" @click="activeIndex=2" :class="{'active':activeIndex==2}">
          My Airdrop
        </div>
        <div class="nav-item" @click="activeIndex=3" :class="{'active':activeIndex==3}">
          Created By You
        </div>
      </div>
      <div class="dao-list">

        <div v-show ="item&&item.name&&item.name.length>0 " class="dao-item" @click="$router.push({path:'/Details',query:item})" v-for="(item,index) in homeArr" :key="index">
          <div class="logo">
            <img :src="item.icon" alt=""/>
          </div>
          <div class="right">
            <div class="name">
              {{item.name}}
            </div>
            <div class="time">
              {{ moment(item.createTime).format('MMMM Do YYYY, h:mm:ss a')}}
            </div>
          </div>
        </div>
        <img style="margin: 10px auto" src="../imgs/no-data.webp" alt="" v-show="homeArr.length==0">
      </div>

<!--      <div class="more mangobox-button" @click="homeArr>maxCount?maxCount+=12:''">-->
<!--        More trending projects-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>

import {getIpfs} from "../utils/ipfsApi"
import moment from "moment"
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      moment:moment,
      maxCount:12,
      THomeArr:[],
      activeIndex:1
    }
  },
  computed:{
    isConnected(){
      return this.$store.state.app.isConnected
    },
    homeArr(){
      return this.$store.state.app.homeArr
    }
  },
  watch:{
    isConnected(){
      this.getData()
    }
  },
  methods: {
    getMetaContent(id) {
      return this.$store.dispatch("MBProjects/getMetaContent", id)
    },
    getData(){
      // get IdArr => get hash => get json
      this.$store.dispatch("MBProjects/getProjectCount", this.$store.state.app.account).then(length => {
        let tempArr = []
        for(let i=1;i<=length;i++){
          this.getMetaContent(i).then(async res => {
            const jsonRes = await getIpfs(res)
            tempArr.push({
              id:i,
              ...jsonRes.data
            })
            if(i >= length){
              tempArr.sort((a,b)=>{
                return (parseInt(b.id) - parseInt(a.id))
              })
              this.$store.commit("app/SET_HOMEARR",tempArr)
              setTimeout(()=>{
                tempArr.sort((a,b)=>{
                  return (parseInt(b.id) - parseInt(a.id))
                })
                this.$store.commit("app/SET_HOMEARR",tempArr)
              },2000)
            }
          })
        }

      })
    }
  },
  created() {
    this.$store.dispatch("app/getWeb3").catch(()=>{
      this.$eventBus.$emit('message', {
        message: "Please Connect",
        type: "error"
      })
    }).then(()=>{
      this.getData()
    })
    setTimeout(()=>{
      if(this.homeArr.length<=0){
        this.getData()
      }
    },3000)

  }
}
</script>
<style lang="scss">
.home {
  overflow: hidden;

  .home-content {
    width: 1200px;
    margin: 20px auto;
    .info-list{
      margin: 10px 0;
      display: flex;
      .info-item{
        margin-right: 30px;
        font-family: Roboto-Bold, Roboto,sans-serif;

        .name{
          font-size: 20px;
          font-weight: bold;
          color: #00C289;
          line-height: 24px
        }
        .value{
          font-size: 40px;
          font-weight: bold;
          color: #FFFFFF;
          line-height: 58px;
          margin-top: 20px;
        }
      }
    }
    .nav-list {
      display: flex;
      user-select: none;
      width: 430px;
      height: 60px;
      background: #1D2833;
      border-radius: 30px;
      border: 1px solid #515151;
      .nav-item {
        width: 33.3%;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
        font-family: Roboto-Bold, Roboto,sans-serif;
        font-weight: bold;
        color: #999999;
        cursor: pointer;
        position: relative;

        &.active {
          color: #fff;
          background: linear-gradient(225deg, #54D500 0%, #2AAA00 100%);
          box-shadow: 0px 3px 6px 0px rgba(128,4,149,0.3);
          border-radius: 25px;

        }
      }
    }
    .dao-list {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 50px;
      .dao-item {
        display: flex;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.05);
        padding: 10px;
        cursor: pointer;
        margin-right: 20px;
        margin-top: 20px;
        .logo {
          width: 70px;
          img{
            width: 90%;
          }
        }

        .right {
          width: 160px;

          .payments, .time {
            margin-top: 6px;
            color: #999;

            span {
              color: #FF7237;
            }
          }
        }
      }
    }

    .more {
      padding: 10px;
      width: 260px;
      margin: 15px auto;
    }
  }
}
</style>

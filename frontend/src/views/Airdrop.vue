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
            {{ distribution }}
          </div>
        </div>
<!--        <div class="info-item">-->
<!--          <div class="name">-->
<!--            Participants-->
<!--          </div>-->
<!--          <div class="value">-->
<!--            4,000,000-->
<!--          </div>-->
<!--        </div>-->
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
      <div class="airdrop-list" v-if="activeIndex==1">
        <!--v-show ="item&&item.title&&item.title.length>0 " -->
        <div class="airdrop-item"  v-for="(item,index) in list"
             :key="index">


          <div class="title">
            {{ item.title }}
          </div>
          <div class="time">

            {{ moment(new Date(parseInt(item.startTime.replace(new RegExp(',','g'),'')))).format('MMMM Do YYYY, h:mm:ss a') }}
          </div>
          <div class="token-info">
            <div class="row">
              <div class="name">
                Token
              </div>
              <div class="value">
                {{ item.tokenInfo.name }}
              </div>
            </div>
            <div class="row">
              <div class="name">
                Total Token
              </div>
              <div class="value">
                {{ item.distribution }}
              </div>
            </div>
<!--            <div class="row">-->
<!--              <div class="name">-->
<!--                Participants-->
<!--              </div>-->
<!--              <div class="value">-->
<!--                {{ item.userCollect.amount }}-->
<!--              </div>-->
<!--            </div>-->
            <div class="mangobox-button" @click="$router.push({path:'/AirdropDetail',query:item})">
              View Airdrop
            </div>
          </div>

        </div>
        <img style="margin: 10px auto" src="../imgs/no-data.webp" alt="" v-show="list.length==0">
      </div>
      <div class="airdrop-list" v-if="activeIndex==2">
        <!--v-show ="item&&item.title&&item.title.length>0 " -->
        <div class="airdrop-item" @click="$router.push({path:'/Details',query:item})" v-for="(item,index) in ownerList"
             :key="index">


          <div class="title">
            {{ item.title }}
          </div>
          <div class="time">

            {{ moment(new Date(parseInt(item.startTime.replace(new RegExp(',','g'),'')))).format('MMMM Do YYYY, h:mm:ss a') }}
          </div>
          <div class="token-info">
            <div class="row">
              <div class="name">
                Token
              </div>
              <div class="value">
                {{ item.tokenInfo ? item.tokenInfo.name : "" }}
              </div>
            </div>
            <div class="row">
              <div class="name">
                Total Token
              </div>
              <div class="value">
                {{ item.distribution }}
              </div>
            </div>
            <!--            <div class="row">-->
            <!--              <div class="name">-->
            <!--                Participants-->
            <!--              </div>-->
            <!--              <div class="value">-->
            <!--                {{ item.userCollect.amount }}-->
            <!--              </div>-->
            <!--            </div>-->
            <div class="mangobox-button">
              View Airdrop
            </div>
          </div>

        </div>
        <img style="margin: 10px auto" src="../imgs/no-data.webp" alt="" v-show="list.length==0">
      </div>
      <div class="airdrop-list" v-if="activeIndex==3">
        <!--v-show ="item&&item.title&&item.title.length>0 " -->
        <div class="airdrop-item" @click="$router.push({path:'/Details',query:item})" v-for="(item,index) in myList"
             :key="index">


          <div class="title">
            {{ item.title }}
          </div>
          <div class="time">

            {{ moment(new Date(parseInt(item.startTime.replace(new RegExp(',','g'),'')))).format('MMMM Do YYYY, h:mm:ss a') }}
          </div>
          <div class="token-info">
            <div class="row">
              <div class="name">
                Token
              </div>
              <div class="value">
                {{ item.tokenInfo ? item.tokenInfo.name : "" }}
              </div>
            </div>
            <div class="row">
              <div class="name">
                Total Token
              </div>
              <div class="value">
                {{ item.distribution }}
              </div>
            </div>
<!--            <div class="row">-->
<!--              <div class="name">-->
<!--                Participants-->
<!--              </div>-->
<!--              <div class="value">-->
<!--                {{ item.userCollect.amount }}-->
<!--              </div>-->
<!--            </div>-->
            <div class="mangobox-button">
              View Airdrop
            </div>
          </div>

        </div>
        <img style="margin: 10px auto" src="../imgs/no-data.webp" alt="" v-show="list.length==0">
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
      moment: moment,
      maxCount: 12,
      activeIndex: 1,
      myList: [],
      list: [],
      ownerList:[],
      distribution:0
    }
  },
  computed: {
    account() {
      return this.$store.state.app.account
    }
  },
  watch: {
    account() {
      this.getAirdrops()
      this.getMyAridrops()
    }
  },
  methods: {
    async getMyAridrops() {
      try{
        let res = await this.$store.dispatch("mangoAirdrop/getUserAirdrops", this.$store.state.app.account)

        let tempList2 = []
        if (res && res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            let distribution = await this.$store.dispatch("mangoAirdrop/getIdDistribution", res[i].id)
            let userCollect = await this.$store.dispatch("mangoAirdrop/getUserCollect", res[i].id)
            // let allCollect =  await this.$store.dispatch("mangoAirdrop/getIdCollect", res[i].id)
            let coin = await this.$store.dispatch("erc20/queryInfo", res[i].token)
            this.distribution += parseInt(distribution.replace(new RegExp(',','g'),''))
            tempList2.push({...res[i], tokenInfo: coin, ipfsInfo: (await getIpfs(res[i].information)).data,userCollect,distribution})
          }
        }
        this.myList = tempList2
      }catch (e) {
        console.log(e)
      }
    },
    async getAirdrops() {
      try{
        this.ownerList = []
        let res = await this.$store.dispatch("mangoAirdrop/getAllAirdrops")
        let tempList = []
        if (res && res.length > 0) {
          this.distribution=0
          for (let i = 0; i < res.length; i++) {

            let distribution = await this.$store.dispatch("mangoAirdrop/getIdDistribution", res[i].id)
            let userCollect = await this.$store.dispatch("mangoAirdrop/getUserCollect", res[i].id)
            // let allCollect =  await this.$store.dispatch("mangoAirdrop/getIdCollect", res[i].id)
            let coin = await this.$store.dispatch("erc20/queryInfo", res[i].token)
            this.distribution += parseInt(distribution.replace(new RegExp(',','g'),''))
            tempList.push({...res[i], tokenInfo: coin, userCollect,distribution})
          }
        }
        this.list = tempList
        let tempList2 = []
        if (res && res.length > 0) {
          this.distribution=0
          for (let i = 0; i < res.length; i++) {
            let distribution = await this.$store.dispatch("mangoAirdrop/getIdDistribution", res[i].id)
            let userCollect = await this.$store.dispatch("mangoAirdrop/getUserCollect", res[i].id)
            // let allCollect =  await this.$store.dispatch("mangoAirdrop/getIdCollect", res[i].id)
            let coin = await this.$store.dispatch("erc20/queryInfo", res[i].token)
            this.distribution += parseInt(distribution.replace(new RegExp(',','g'),''))
            tempList2.push({...res[i], tokenInfo: coin, ipfsInfo: (await getIpfs(res[i].information)).data,userCollect,distribution})
            if(res[i].owner==this.account){
              this.ownerList.push({...res[i], tokenInfo: coin, ipfsInfo: (await getIpfs(res[i].information)).data,userCollect,distribution})
            }
          }
        }
        console.log(tempList2)
        this.list = tempList2
      }catch (e){
        console.log(e)
      }
    }
  },
  created() {
    this.$store.dispatch("app/getWeb3").catch(()=>{
      this.$eventBus.$emit('message', {
        message: "Please Connect",
        type: "error"
      })
    }).then(()=>{
      this.getAirdrops()
      this.getMyAridrops()
    })
  }
}
</script>
<style lang="scss">
.home {
  overflow: hidden;

  .home-content {
    width: 1200px;
    margin: 20px auto;

    .info-list {
      margin: 10px 0;
      display: flex;

      .info-item {
        margin-right: 30px;
        font-family: Roboto-Bold, Roboto, sans-serif;

        .name {
          font-size: 20px;
          font-weight: bold;
          color: #00C289;
          line-height: 24px
        }

        .value {
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
        font-family: Roboto-Bold, Roboto, sans-serif;
        font-weight: bold;
        color: #999999;
        cursor: pointer;
        position: relative;

        &.active {
          color: #fff;
          background: linear-gradient(225deg, #54D500 0%, #2AAA00 100%);
          box-shadow: 0px 3px 6px 0px rgba(128, 4, 149, 0.3);
          border-radius: 25px;

        }
      }
    }

    .airdrop-list {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 50px;
      margin-top: 30px;

      .airdrop-item {
        background: #1D2833;
        border-radius: 10px;
        box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.05);
        padding: 20px;
        cursor: pointer;
        margin-right: 20px;
        margin-top: 20px;
        width: 360px;

        .title {
          font-size: 30px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          color: #FFFFFF;
          line-height: 35px;
        }

        .token-info {

          padding: 10px 0;

          .row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;

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
              line-height: 24px;
            }
          }

          .mangobox-button {
            margin-top: 20px;
            height: 40px;
          }
        }

        .logo {
          width: 70px;

          img {
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

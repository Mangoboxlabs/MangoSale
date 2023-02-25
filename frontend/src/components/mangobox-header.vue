<template>
  <div class="mongobox-header">
    <div class="mask" v-show="isShowNav1||isShowNav2||isShowNav3" @click="isShowNav3=false,isShowNav1=false,isShowNav2=false">

    </div>
    <div class="nav-box">
      <div class="left">
        <img @click="$router.push('/')" class="logo" src="../assets/logo.webp" alt=""/>
        <ul>
          <li @click="isShowNav1=true">
            <div class="w-font" :class="{'active': $route.path  === '/CreateToken'||$route.path  === '/Token'}">
              Token
              <div class="nav-list" v-show="isShowNav1">
                <div class="nav-item" @click="$router.push('/CreateToken');isShowNav1=false" @click.stop>
                  Create Token
                </div>
<!--                <div class="nav-item"  @click="$router.push('/TokenAdmin');isShowNav1=false"  @click.stop>-->
<!--                  Admin-->
<!--                </div>-->
                <div class="nav-item"  @click="$router.push('/Token');isShowNav1=false"  @click.stop>
                  Token List
                </div>
              </div>
            </div>
          </li>
          <li @click="isShowNav2=true" @click.stop>
            <div class="w-font" :class="{'active': $route.path  == '/CreateLock'||$route.path  === '/Lock'||$route.path  === '/LockDetail' }">Lock
              <div class="nav-list" v-show="isShowNav2">
                <div class="nav-item" @click="$router.push('/CreateLock');isShowNav2=false"  @click.stop>
                  Create Lock
                </div>
                <div class="nav-item"  @click="$router.push('/Lock');isShowNav2=false"  @click.stop>
                  Lock List
                </div>
              </div>
            </div>

          </li>
          <li @click="isShowNav3=true">
            <div class="w-font" :class="{'active': $route.path  == '/Airdrop'||$route.path  == '/CreateAirdrop'||$route.path  == '/AirdropDetail'}">Airdrop
                <div class="nav-list" v-show="isShowNav3">
                  <div class="nav-item" @click="$router.push('/CreateAirdrop');isShowNav3=false"  @click.stop>
                    Create Airdrop
                  </div>
                  <div class="nav-item"  @click="$router.push('/Airdrop');isShowNav3=false"  @click.stop>
                    Airdrop List
                  </div>
                </div>
            </div>
          </li>
          <li>

          </li>
        </ul>
      </div>
      <polkaConnect/>
    </div>

  </div>
</template>

<script>
import polkaConnect from "@/components/polkaConnect";

export default {
  name: "mangobox-header",
  components: {
    polkaConnect
  },
  data() {
    return {
      activeNav: 1,
      isShowNav1: false,
      isShowNav2: false,
      isShowNav3:false
    }
  },
  computed: {
    headerHeight() {
      return this.$route.path === '/' ? 300 : 60
    }
  },

}
</script>

<style lang="scss" scoped>
.mongobox-header {
padding-top: 10px;
  font-weight: bold;
  position: relative;
  width: 100%;
  z-index: 1;
  .mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }

  .nav-box {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    margin: 0 auto;

    .left {
      display: flex;
      align-items: center;
    }

    .logo {
      width: 140px;
      height: 26px;
    }

    ul {
      display: flex;
      height: 100%;
      align-items: center;

      li {
        height: 100%;
        position: relative;
        cursor: pointer;
        margin: 10px 40px;
        display: block;
        &:nth-child(3){
          .nav-list{
            width: 150px!important;
          }
        }
        .w-font {
          height: 34px;
          position: relative;
          top: 0;
          left: 0;
          transition: 0s;
          padding: 6px 20px;
          border: 1px;

          .nav-list {
            width: 130px;
            padding: 10px 20px;
            background: #1D2833;
            box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            position: absolute;
            top: 40px;
            left: -20px;

            .nav-item {
              margin-top: 20px;

            }
          }
        }

        .active {
          background: #063E2E;
          border-radius: 20px;
          border: 1px solid #00C289;
        }


      }

    }
  }

}
</style>

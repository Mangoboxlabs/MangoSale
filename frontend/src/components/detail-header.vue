<template>
  <div class="detail-header" :style="'height:' + headerHeight + 'px;!important'">
    <div class="nav-box">
      <img @click="$router.push('/')" class="logo" src="../imgs/logo.webp" alt=""/>
      <ul>
        <li @click="$router.push('/projects')">
          <span class="w-font">Projects</span>
          <span class="re-active">Projects</span>
        </li>
        <li>
          <span class="w-font">FAQ</span>
          <span class="re-active">FAQ</span>
        </li>
        <li>
          <polkaConnect/>
        </li>
      </ul>
    </div>
    <div class="detail-content">
      <img class="icon" :src="projectObj.icon" alt="">
      <div class="right-content">
        <h1 class="name">
          {{ projectObj.name }}
        </h1>
        <div class="row">
          <div class="id">
            <strong>Project</strong>
            <strong>#{{ projectObj.id }}</strong>
          </div>
          <div class="webside">
            <a :href="projectObj.webside " target="_blank">
              {{ projectObj.webside }}
            </a>
          </div>
          <div class="twitter" v-show="projectObj.twitter">
            <a :href="projectObj.twitter" target="_blank"> <img src="../imgs/twitter.webp" alt="">
            {{ projectObj.twitter ? projectObj.twitter.replace("https://twitter.com/", "") : "" }}</a>
          </div>
        </div>
        <div class="description">
          {{ projectObj.description }}
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import polkaConnect from "@/components/polkaConnect";

export default {
  name: "detail-header",
  props: {
    "projectObj": Object
  },
  components: {
    polkaConnect
  },
  data() {
    return {}
  },
  computed: {
    headerHeight() {
      return this.$route.path === '/' ? 300 : 300
    }
  },

}
</script>

<style lang="scss" scoped>
.detail-header {
  background: url("../imgs/detail_header_bg.webp");
  background-size: 100%;
  font-weight: bold;
  position: relative;
  width: 100%;
  overflow: hidden;

  .navbar-box-bg {
    width: 1920px;
    height: 60px;
    opacity: 0.1;
    background: #ffffff;
    position: absolute;
  }

  .nav-box {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    margin: 0 auto;

    .logo {
      width: 140px;
      height: 26px;
    }

    ul {
      display: flex;
      height: 42px;

      li {
        height: 100%;
        line-height: 50px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        color: #111;
        margin: 0 30px;

        .w-font {
          position: relative;
          top: 0;
          left: 0;
          transition: 0.2s;
        }

        .re-active {
          position: absolute;
          top: 40px;
          left: 0;
          transition: 0.2s;
          background-image: linear-gradient(225deg, #54D500 0%, #2AAA00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        &:hover {
          .re-active {
            top: 0 !important;
          }

          .w-font {
            top: -40px;
          }
        }
      }

    }
  }

  .detail-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;

    .right-content {
      padding: 10px 0 0 20px;

      .id {
        color: #666;
      }

      .webside {
        padding: 0 10px;
        color: #FF7238;

        a {
          color: #FF7238 !important;
        }
        margin: 0 10px;
      }

      .twitter {
        padding: 0 10px;

        margin: 0 10px;
        display: flex;
        align-items: center;

        a {
          color: #2aaa00 !important;
        }

        img {
          margin-right: 10px;
          width: 20px;
          height: 20px;
        }
      }

      .description {
        padding: 10px 0;
      }
    }

    .icon {
      width: 180px;
      margin-top: 10px;
    }

  }
}
</style>

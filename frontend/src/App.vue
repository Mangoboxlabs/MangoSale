<template>
  <div id="app">
    <!--   Global message box -->
    <div class="message-box">
      <div v-for="(item,index)  in messageList" :class="{'error': item.type=='error','success':item.type=='success'}"
           :key="index" class="message animate__animated  animate__backInRight">
        <img v-show="item.type=='success'" src="./imgs/success.webp" alt="">
        <img v-show="item.type=='error'" src="./imgs/error.webp" alt="">
        <p>
          {{ item.message }}
        </p>
      </div>
    </div>
    <!-- Header component   -->
    <MangoboxReader v-show="$route.path!='/Details'"></MangoboxReader>
    <div class="loading" v-show="isLoading">
      <div class="mask"></div>
      <div class="loader-wrap">
        <div class="loader">
          <div class="circle-1 circle">
            <div class="circle-2 circle">
              <div class="circle-3 circle">
                <div class="circle-4 circle">
                </div>
              </div>
            </div>
          </div>
          <p class="loading-text">Loading ...</p>
        </div>
      </div>
    </div>
    <!--  Body of page  -->
    <router-view class="main-content"/>
    <!--  Bottom assembly  -->
    <MangoboxFooter></MangoboxFooter>
  </div>
</template>
<script>
import MangoboxReader from "./components/mangobox-header"
import MangoboxFooter from "./components/mangobox-footer"

export default {
  components: {
    MangoboxReader,
    MangoboxFooter
  },
  data() {
    return {
      messageList: []
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.app.isLoading
    }
  },
  mounted() {
    let _this = this
    //Start the project to establish a connection to the wallet
    this.$store.dispatch("app/getWeb3").catch(() => {
      // this.$eventBus.$emit('message', {
      //   message: "Please Connect",
      //   type: "error"
      // })
    })
    //
    this.$eventBus.$on('message', (message) => {
      _this.messageList.push(message)
      setTimeout(() => {
        _this.messageList.shift()
      }, 5000)
    })

  }
}
</script>
<style lang="scss">
.el-tooltip__popper {
  max-width: 500px !important;
}

.tip {
  width: 16px;
  height: 16px;
  margin-left: 10px;
}

.tip-box {
  max-width: 400px;
}

.message-box {
  position: fixed;
  right: 20px;
  top: 60px;
  z-index: 10;

  .message {

    width: 300px;
    padding: 10px 10px 0 40px;
    min-height: 60px;
    word-break: break-word;
    color: #999;
    box-shadow: 0 0 3px #eee;
    overflow: hidden;
    background: #fff;
    font-size: 16px;
    position: relative;

    img {
      width: 20px;
      position: absolute;
      left: 10px;
      top: 10px;
    }

    &.error {
      background: #f66b2f;
      color: #fff;
    }

    &.success {
      background: #2AAA00;
      color: #fff;
    }
  }
}

#app {
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  background: #0D1319;
  color: #fff;
  min-height: 100%;
  --primary-bg-color: linear-gradient(225deg, #54D500 0%, #2AAA00 100%);
  --primary-light: #8abdff;
  --primary: #54D500;
  --primary-dark: #2AAA00;

  --white: #FFFFFF;
  --greyLight-1: #E4EBF5;
  --greyLight-2: #c8d0e7;
  --greyLight-3: #bec8e4;
  --greyDark: #9baacf;

  h1, h2, h3, h4, h5, h6 {
    color:#fff;
  }
  ::v-deep .number ,::v-deep .more,::v-deep .btn-next,::v-deep .btn-prev{
    background: #0D1319;
    color: #fff;
  }
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
  ::v-deep el-radio {
    .intro {
      opacity: 0.5;
      margin: 10px 0;
    }
  }

  .main-content {
    flex-grow: 5;
  }

  .loading {
    height: 100vh;
    top: 50px;
    position: fixed;
    width: 100%;

    .mask {
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.3;
      position: absolute;

    }

    body {
      background: black;
    }

    .loader-wrap {
      margin-top: 20%;
    }

    .loading-text {
      font-family: 'Oswald', sans-serif;
      font-weight: 200;
      font-size: 38px;
      text-align: center;
      color: #eee;
      margin-top: 150px;
    }

    .circle-1 {
      margin: 0 auto;
      width: 100px;
      height: 50px;
      border-radius: 100px 100px 0 0;
      border-top: 2px solid #DEA568;
      border-left: 2px solid #DEA568;
      border-right: 2px solid #DEA568;
      animation: 2s loader linear infinite;
      transform-origin: 50% 100%;
    }

    .circle-2 {
      width: 80px;
      height: 40px;
      margin: 50px auto;
      border-radius: 0 0 80px 80px;
      border-bottom: 4px solid #416A8A;
      border-left: 4px solid #416A8A;
      border-right: 4px solid #416A8A;
      animation: 2s loader-reverse linear infinite;
      transform-origin: 50% 0%;
    }

    .circle-3 {
      width: 60px;
      height: 30px;
      margin: 50px auto;
      border-radius: 0 0 80px 80px;
      border-bottom: 2px solid #7C2A6C;
      border-left: 2px solid #7C2A6C;
      border-right: 2px solid #7C2A6C;
      animation: 1s loader linear infinite;
      transform-origin: 50% 0%;
    }

    .circle-4 {
      width: 40px;
      height: 20px;
      margin: 50px auto;
      border-radius: 0 0 80px 80px;
      border-bottom: 5px solid #56916C;
      border-left: 5px solid #56916C;
      border-right: 5px solid #56916C;
      animation: 1.5s loader-reverse linear infinite;
      transform-origin: 50% 0%;
    }

    @keyframes loader {
      from {
        transform: rotate(0deg)
      }
      to {
        transform: rotate(360deg)
      }
    }

    @keyframes loader-reverse {
      from {
        transform: rotate(360deg)
      }
      to {
        transform: rotate(-360deg)
      }
    }
  }

  .row {
    display: flex;
  }

  div {
    box-sizing: border-box;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  }

  .daoContentBg {
    flex: 1;
  }

  .content-box {
    box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.05);

    border-radius: 20px;
    width: 1200px;
    margin: 10px auto;
    background: #fff;
    padding-bottom: 20px;
  }

  .box-nav {
    display: flex;
    padding: 0 20px;
    border-bottom: 1px solid #eee;

    .item {
      user-select: none;
      width: 150px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      cursor: pointer;

      &.active {
        color: #F96AAF;
        border-bottom: 1px solid #F96AAF;
      }
    }
  }
  .panel-box {
    background: #1D2833;
    padding: 30px;
    border-radius: 10px;
    margin-bottom: 30px;
    .title {
      font-size: 24px;
      font-family: Roboto-Bold, Roboto;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 28px;
    }

    .input-box ,.inline-input-box{
      .name {
        font-size: 20px;
        font-family: Roboto-Bold, Roboto, sans-serif;
        font-weight: bold;
        color: #ADADAD;
        line-height: 24px;
        padding: 20px 0;
      }

      input {
        width: 630px;
        height: 50px;
        background: #0D1319;
        border-radius: 10px;
        border: 1px solid #515151;
        font-size: 18px;
        font-family: Roboto-Bold, Roboto, sans-serif;
        font-weight: bold;
        color: #fff;
        line-height: 21px;
        padding: 0 10px;
      }
    }
    .inline-input-box{
      display: flex;
      align-items: center;
      .name{
        width: 200px;
      }
      input{
        margin-left: 20px;
        width: 410px;
      }
    }
  }
  .mangobox-button {
    background: var(--primary-bg-color);
    border-radius: 25px;
    cursor: pointer;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    color: #fff;
    font-size: 18px;
    position: relative;
    background-size: 200%;
    transition: 0.3s;

    &:active {
      transform: translate(2px, 2px);
    }

    &:hover {
      background-position: 100%;
    }
  }

  .switch {
    grid-column: 1/2;
    display: grid;
    grid-template-columns: repeat(2, min-content);
    grid-gap: 3rem;
    justify-self: center;
  }

  .switch input {
    display: none;
  }

  .switch__1, .switch__2 {
    width: 5rem;
  }

  .switch__1 label, .switch__2 label {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2rem;
    box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
    background: rgba(255, 255, 255, 0);
    position: relative;
    cursor: pointer;
    border-radius: 1.2rem;
  }

  .flex-box {
    display: flex;
    margin: 10px 0;
  }

  .switch__1 label::after, .switch__2 label::after {
    content: "";
    position: absolute;
    left: 0.4rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: var(--greyDark);
    transition: all 0.4s ease;
  }

  .switch__1 label::before, .switch__2 label::before {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(330deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%);
    opacity: 0;
    transition: all 0.4s ease;
  }

  .switch input:checked ~ label::before {
    opacity: 1;
  }

  .switch input:checked ~ label::after {
    left: 57%;
    background: var(--greyLight-1);
  }

}

</style>

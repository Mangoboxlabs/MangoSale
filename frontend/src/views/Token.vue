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
          <div class="col">
            Admin
          </div>
        </div>
        <div class="row" v-for="(item,index) in list" :key="index">
          <div class="col">
            <div class=" btn" :data-clipboard-text="item.address" style="display: flex;align-items: center">
              {{
                item.address ? item.address.substr(0, 5) + "..." + item.address.substr(item.address.length - 4, item.address.length) : ""
              }}
              <span class="address" v-show="false">
              {{
                  item.address
                }}
            </span>
              <svg t="1677551780319" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="2726" width="20" height="20">
                <path
                    d="M672 832 224 832c-52.928 0-96-43.072-96-96L128 160c0-52.928 43.072-96 96-96l448 0c52.928 0 96 43.072 96 96l0 576C768 788.928 724.928 832 672 832zM224 128C206.368 128 192 142.368 192 160l0 576c0 17.664 14.368 32 32 32l448 0c17.664 0 32-14.336 32-32L704 160c0-17.632-14.336-32-32-32L224 128z"
                    fill="#ffffff" p-id="2727"></path>
                <path
                    d="M800 960 320 960c-17.664 0-32-14.304-32-32s14.336-32 32-32l480 0c17.664 0 32-14.336 32-32L832 256c0-17.664 14.304-32 32-32s32 14.336 32 32l0 608C896 916.928 852.928 960 800 960z"
                    fill="#ffffff" p-id="2728"></path>
                <path
                    d="M544 320 288 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l256 0c17.696 0 32 14.336 32 32S561.696 320 544 320z"
                    fill="#ffffff" p-id="2729"></path>
                <path
                    d="M608 480 288.032 480c-17.664 0-32-14.336-32-32s14.336-32 32-32L608 416c17.696 0 32 14.336 32 32S625.696 480 608 480z"
                    fill="#ffffff" p-id="2730"></path>
                <path
                    d="M608 640 288 640c-17.664 0-32-14.304-32-32s14.336-32 32-32l320 0c17.696 0 32 14.304 32 32S625.696 640 608 640z"
                    fill="#ffffff" p-id="2731"></path>
              </svg>
            </div>

          </div>
          <div class="col">
            {{ item.name }}
          </div>
          <div class="col">
            {{ item.symbol }}
          </div>


          <div class="col">
            {{
              item.owner ? item.owner.substr(0, 5) + "..." + item.owner.substr(item.owner.length - 4, item.owner.length) : ""
            }}
          </div>
          <div class="col">
            {{ item.totalSupply }}
          </div>
          <div class="col">
            <div class="mangobox-button" v-show="item.owner.toLowerCase()==account.toLowerCase()" @click="goAdmin(item)"
                 style="height: 40px">
              goAdmin
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
import Clipboard from 'clipboard'

export default {
  name: "tokenView",
  data() {
    return {
      loading: false,
      list: [],
      clipboard: {}
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
  mounted() {
    this.clipboard = new Clipboard('.btn')
    this.clipboard.on('success', e => {
      e.clearSelection()
      this.$eventBus.$emit('message', {
        message: "copy success  ",
        type: "success"
      })
    })

  },
  destroyed() {
    this.clipboard.destroy()
  },
  methods: {
    goAdmin(item) {
      if (item.owner == this.$store.state.app.account) {
        this.$router.push({name: "TokenAdmin", params: item})
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
      tempList.reverse()
      this.list = tempList
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

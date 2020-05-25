<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="3">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <Menu-item name="1" @click.native="paycheck">
          <Icon type="ios-navigate"></Icon>
          检查处置单缴费
        </Menu-item>
        <Menu-item name="2" @click.native="payprescption">
          <Icon type="ios-navigate"></Icon>
          处方缴费
        </Menu-item>
        <Menu-item name="3" @click.native="getcost">
          <Icon type="ios-navigate"></Icon>
          处方缴费
        </Menu-item>
      </div>
    </Menu>
    <div class="layout-content">
      <Card class="card" v-for="(item,i) in registerList" v-bind:key="i">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          挂号信息
        </p>
        <ul>
          <li class="li">
            真实姓名:{{item.realname}}
          </li>
          <li class="li">
            性别:{{item.gender}}
          </li>
          <li class="li">
            家庭住址:{{item.homeaddress}}
          </li>
          <li class="li">
            {{item.isbook}}
          </li>
          <Button type="primary" @click="admit(i)" class="button" >继续看诊</Button>
        </ul>
      </Card>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return{

      }
    },
    created() {
      this.userId = window.localStorage.getItem("userID")
      getcost()
    },
    methods:{
      //跳转缴费
      paycheck(){
        this.$router.push("/pay")
      },
      //处方缴费
      payprescption(){
        this.$router.push("/payprescption")
      },
      //开出发票
      getcost(){
        this.$router.push("/getcost")
      }

    }
  }
</script>

<style scoped>

</style>

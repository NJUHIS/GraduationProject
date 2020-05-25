<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="2">
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
      <div style="margin-top: 1%;margin-left: 3%">
        <label>挂号编号：</label>
        <i-input  type="text" v-model="registerId" style="width: 250px;margin-left: 1%" ></i-input>
      </div>
      <Button type="success" style="margin-left: 3%;margin-top: 1%" @click="getcheck">搜索</Button>
      <br>
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
        registerId:"",//挂号Id
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

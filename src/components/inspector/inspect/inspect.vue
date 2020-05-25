<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1">
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
          查看发票
        </Menu-item>
      </div>
    </Menu>
    <div class="layout-content">
      <div style="margin-top: 1%;margin-left: 3%">
        <label>挂号编号：</label>
        <i-input  type="text" v-model="registerId" style="width: 250px;margin-left: 1%" ></i-input>
      </div>
      <Button type="success" style="margin-left: 3%;margin-top: 1%" @click="getcheck">搜索检查处置单</Button>
      <br>
      <Card class="card" v-for="(item,i) in checkapply" v-bind:key="i">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          检查处置单
        </p>
        <ul>
          <li class="li">
            编号:{{item.id}}
          </li>
          <li class="li">
            价格:{{item.totalSum}}
          </li>
          <li class="li">
            状态:"已开立并发出，未收费"
          </li>
          <Button type="primary" @click="pay(i)" class="button" style="margin-top: 3%">缴费</Button>
        </ul>
      </Card>
    </div>
  </div>
</template>
<script>

  import {getcheck} from "./inspect";
  import {pay} from "./inspect"

  export default {
    data(){
      return{
        registerId:"",//挂号Id
        checkapply:[],//检查处置单
      }
    },
    created() {
      this.userId = window.localStorage.getItem("userID")
    },
    methods:{
      //根据挂号Id获取检查处置单
      getcheck(){
        getcheck(this)
      },
      //缴费检查处置单
      pay(i){
        pay(i,this)
      },
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
  @import "inspect.css";
</style>

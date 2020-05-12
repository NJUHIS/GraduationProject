<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="3">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <Menu-item name="1" @click.native="register">
          <Icon type="ios-navigate"></Icon>
          接受挂号
        </Menu-item>
        <Menu-item name="2" @click.native="personinformation">
          <Icon type="ios-keypad"></Icon>
          个人信息
        </Menu-item>
        <Menu-item name="3" @click.native="during">
          <Icon type="ios-analytics"></Icon>
          正在看诊中
        </Menu-item>
      </div>
    </Menu>
    <div class="layout-content">
      <Card class="card" v-for="(item,i) in registerList" :key="i">
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
  import {register} from "./cases";
  import {personinformation} from "./cases"
  import {getRegister} from "./cases";
  import {during} from "./cases";
  import {admit} from "./cases";

  export default {
    data(){
      return{
        userId:0,
        registerList:[],//挂号列表
      }
    },
    created() {
      this.userId = window.localStorage.getItem("userID")
      getRegister(this.userId,this)
    },
    methods:{
      //跳专到接受挂号
      register(){
        register(this.$router)
      },
      //跳转到医生个人信息界面
      personinformation(){
        personinformation(this.$router)
      },
      //进行看诊
      admit(i){
        admit(this.registerList[i].id,this.$router)
      },
      //跳转到正在看诊界面
      during(){
        during(this.$router)
      },
    },
  }
</script>

<style scoped>
  @import "cases.css";
</style>

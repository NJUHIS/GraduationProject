<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="2">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <Menu-item name="1" @click.native="register">
          <Icon type="ios-navigate"></Icon>
          挂号
        </Menu-item>
        <Menu-item name="2" @click.native="checkperson">
          <Icon type="ios-keypad"></Icon>
          个人信息
        </Menu-item>
        <Menu-item name="3" @click.native="checkcases">
          <Icon type="ios-analytics"></Icon>
          历史病例
        </Menu-item>
      </div>
    </Menu>
    <div class="layout-content">
      <label class="label">
        登录名: {{loginname}}
      </label>
      <br>
      <label class="label">
        患者姓名: {{username}}
      </label>
      <br>
      <label class="label">
        性别: {{gender}}
      </label>
      <br>
      <label class="label">
        出生日期: {{birthday}}
      </label>
      <br>
      <label class="label">
        患者电话: {{phonenumber}}
      </label>
      <br>
      <label class="label">
        身份证号: {{idnumber}}
      </label>
      <br>
      <label class="label">
        家庭住址: {{homeaddress}}
      </label>
    </div>
  </div>
</template>
<script>
  import {register} from './personinformation'
  import {getPersonInformation} from "./personinformation";
  import {checkperson} from "./personinformation";
  import {checkcases} from "./personinformation";

  export default {
    data(){
      return{
        birthday:"",//出生日期
        gender:"",//性别
        userId:0,//患者的id
        username:"",//患者姓名
        idnumber:"",//身份证号
        phonenumber:"",//电话
        loginname:"",//登录名
        homeaddress: "",//家庭住址
      }
    },
    created() {
      this.userId = window.localStorage.getItem("patientID")
      getPersonInformation(this.userId,this)
    },
    methods:{
      register(){//挂号
        register(this.$router)
      },
      checkperson(){//个人信息
        checkperson(this.$router)
      },
      checkcases(){//查看历史病例
        checkcases(this.$router)
      }
    },
  }
</script>

<style scoped>
@import "personinformation.css";
</style>

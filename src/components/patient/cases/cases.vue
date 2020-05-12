<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="3">
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
      <i-table :columns="columns1" :data="data1"></i-table>
    </div>
  </div>
</template>
<script>
  import {register} from './cases'
  import {checkperson} from "./cases";
  import {checkcases} from "./cases";

  export default {
    data(){
      return{
        userId:0,//患者的id
      }
    },
    created() {
      this.userId = window.localStorage.getItem("patientID")
    },
    methods:{
      register(){//挂号
        register(this.$router)
      },
      checkperson(){//查看个人信息
        checkperson(this.$router)
      },
      checkcases(){//查看病例
        checkcases(this.$router)
      }
    },
  }
</script>

<style scoped>
  @import "cases.css";
</style>

<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <Menu-item name="1" @click.native="register">
          <Icon type="ios-navigate"></Icon>
          个人信息
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
      <label class="label">
        真实姓名: {{doctorCustom.realname}}
      </label>
      <br>
      <label class="label">
        医生卡号: {{doctorCustom.idnumber}}
      </label>
      <br>
      <label class="label">
        隶属科室: {{doctorCustom.deptname}}
      </label>
      <br>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        userId:0,
        doctorCustom:{
          realname:"",
          idnumber:"",
          deptname:""
        }
      }
    },
    mounted() {
      this.userId = window.localStorage.getItem("userID")
      getPersonInformation(this.userId,this)
    },
    methods:{

    },
  }
</script>

<style scoped>
</style>

<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="3">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <Menu-item name="1" @click.native="diagnose">
          <Icon type="ios-navigate"></Icon>
          病人病情诊断
        </Menu-item>
        <Menu-item name="2" @click.native="checkapply">
          <Icon type="ios-keypad"></Icon>
          病人检查方法
        </Menu-item>
        <Menu-item name="3" @click.native="prescption">
          <Icon type="ios-analytics"></Icon>
          病人具体用药
        </Menu-item>
      </div>
    </Menu>
    <div class="layout-content">

    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return{
        userId:0,
        medicalrecordid:0,//病例Id
      }
    },
    created() {
      this.userId = window.localStorage.getItem("userID")
      //通过挂号id找到病例id
      this.medicalrecordid = window.localStorage.getItem("medicalrecordid")
    },
    methods:{
      //跳转到诊断界面
      diagnose(){
        this.$router.push("/diagnose")
      },
      //跳转到病人检查界面
      checkapply(){
        this.$router.push("/checkapply")
      },
      //跳转到病人用药界面
      prescption(){
        this.$router.push("/prescption")
      }
    },
  }
</script>

<style scoped>

</style>

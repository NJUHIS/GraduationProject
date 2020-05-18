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
      <Select v-model="tmpdrug" class="Select">
        <Option v-for="item in drugs" :value="item.id" :key="item.id">{{ item.drugsName }}</Option>
      </Select>
      <i-input type="text" v-model="tmpnum" class="input" ></i-input>
      <Button type="primary" @click="adddiagnose" class="Button" >添加处方列表</Button>
      <Table border class="table" :columns="existcolumns" :data="existdrugs"></Table>
    </div>
  </div>
</template>
<script>
  import {getalldrugs} from "./prescption";
  import {adddrugs} from "./prescption";

  export default {
    data(){
      return{
        userId:0,
        medicalrecordid:0,//病例Id
        drugs:[],//所有药品列表
        tmpdrug:0,//已经选择的药品id保存
        tmpnum:'',//已经选择的药品的数量
        existcolumns: [{
          title:'药品名称',
          key:'drugsName'
        },{
          title:'使用规格',
          key:'drugsFormat'
        },{
          title:'药品数量',
          key:'drugsnum'
        },{
          title:'保质期',
          key:'drugsDosage'
        }],//已经存在的处方列表
        existdrugs:[],//已经存在的药品
      }
    },
    created() {
      this.userId = window.localStorage.getItem("userID")
      //通过挂号id找到病例id
      this.medicalrecordid = window.localStorage.getItem("medicalrecordid")
      getalldrugs(this)
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
      },
      //添加处方列表
      adddiagnose(){
        adddrugs(this)
      }
    },
  }
</script>

<style scoped>
  @import "prescption.css";
</style>

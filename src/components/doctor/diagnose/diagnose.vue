<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1">
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
      <Form>
        <FormItem class="doctorFormItem" label="诊断结论：" prop="diseaseId">
          <Select v-model="diseaseId" style="width:250px">
            <Option v-for="item in diseaseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="adddiagnose"  style="margin-left: 2%">确认添加</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import {getMedicalrecord} from "./diagnose";
  import {getAlldisease} from "./diagnose";
  import {adddiagnose} from "./diagnose";

  export default {
    data(){
      return{
        userId:0,
        registerId:0,//挂号Id
        medicalrecordid:0,//病例Id
        diseaseId:0,//诊断结论Id
        diseaseList:[],//诊断列表
      }
    },
    created() {
      this.userId = window.localStorage.getItem("userID")
      //通过挂号id找到病例id
      this.registerId = window.localStorage.getItem("registrationId")
      getMedicalrecord(this)
      getAlldisease(this)
    },
    methods:{
      //确认添加诊断
      adddiagnose(){
        adddiagnose(this)
      },
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
  @import "diagnose.css";
</style>

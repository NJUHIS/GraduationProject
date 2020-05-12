<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="2">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <Menu-item name="1" @click.native="diagnose">
          <Icon type="ios-navigate"></Icon>
          病人病情诊断
        </Menu-item>
        <Menu-item name="2" @click.native="checkapp">
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
        <FormItem class="doctorFormItem" label="检查目的：" prop="objective">
          <i-input type="text" v-model="checkapplyCustom.objective" style="width: 250px" >
          </i-input>
        </FormItem>
        <FormItem class="doctorFormItem">
          <Card class="card" v-for="(item,i) in checkapplydetail" :key="i">
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              挂号信息
            </p>
            <ul>
              <li class="li">
                项目名称:{{item.itemname}}
              </li>
              <li class="li">
                执行科室:{{item.deptid}}
              </li>
              <li class="li">
                价格:{{item.price}}
              </li>
              <Button type="primary" @click="del(i)" class="button" >删除</Button>
            </ul>
          </Card>
        </FormItem>
        <FormItem class="doctorFormItem">
          <Button type="primary" @click="addcheckdetail"  style="margin-left: 2%">添加检查明细</Button>
          <Button type="primary" @click="addcheck"  style="margin-left: 2%">确认添加</Button>
        </FormItem>
      </Form>
    </div>
    <!--添加检查明细-->
    <Modal title="添加检查明细" v-model="detailmodal" class-name="vertical-center-modal" footer-hide>
      <Select v-model="tmpdetailid" style="width:250px">
        <Option v-for="item in checkprojectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button type="primary" @click="adddetail">确认</Button>
    </Modal>
  </div>
</template>
<script>
  import {getAllFmedItems} from "./checkapply";
  import {addcheck} from "./checkapply";
  import {adddetail} from "./checkapply";

  export default {
    data(){
      return{
        detailmodal:false,//检查明细modal
        userId:0,//医生的id
        medicalrecordid:0,//病例Id
        checkprojectList:[],//检查列表
        checkapplydetail:[],//详细检查列表
        tmpdetailid:0,//暂时保存的详细的id
        checkapplyCustom:{
          id:"",//checkapplyCustom的id
          objective:"",//检查目的
        },//检查
      }
    },
    created() {
      this.userId = window.localStorage.getItem("userID")
      this.medicalrecordid = window.localStorage.getItem("medicalrecordid")
      getAllFmedItems(this)
    },
    methods:{
      //添加checkapply以及checkappdetail
      addcheck(){
        addcheck(this)
      },
      //添加检查明细
      addcheckdetail(){
        this.detailmodal=true
      },
      //确认添加检查明细
      adddetail(){
        adddetail(this)
      },
      //跳转到诊断界面
      diagnose(){
        this.$router.push("/diagnose")
      },
      //跳转到病人检查界面
      checkapp(){
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
  @import "checkapply.css";
</style>

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
        <Menu-item name="4" @click.native="writecase">
          <Icon type="ios-analytics"></Icon>
          填写病例
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
          <Card class="existcard" v-for="(item,i) in existapply" :key="i">
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              检查单
            </p>
            <ul>
              <li class="li">
                检查单编号:{{item.id}}
              </li>
              <li class="li">
                检查目的:{{item.objective}}
              </li>
              <li class="li">
                执行状态:{{item.state}}
              </li>
              <Button type="primary" @click="read(i)" class="button" >查看详情</Button>
              <Button type="primary" @click="ensure(i)" class="button1">开出检查</Button>
            </ul>
          </Card>
        </FormItem>
        <FormItem class="doctorFormItem">
          <Card class="card" v-for="(item,i) in checkapplydetail" :key="i">
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              新增检查信息
            </p>
            <ul>
              <li class="li">
                项目名称:{{item.label}}
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
    <!--查看检查单详情-->
    <Modal title="检查单明细" v-model="checkmodal" class="modal" footer-hide>
      <Card class="card" v-for="(item,i) in existcheck" :key="i">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          检查项目
        </p>
        <ul>
          <li class="li">
            项目名称:{{item.label}}
          </li>
          <li class="li">
            执行科室:{{item.deptid}}
          </li>
          <li class="li">
            价格:{{item.price}}
          </li>
          <li class="li">
            执行状态:{{item.state}}
          </li>
          <li class="li">
            执行结果:{{item.result}}
          </li>
        </ul>
      </Card>
    </Modal>
  </div>
</template>
<script>
  import {getAllFmedItems} from "./checkapply";
  import {addcheck} from "./checkapply";
  import {adddetail} from "./checkapply";
  import {getexistdetail} from "./checkapply";
  import {read} from "./checkapply";
  import {ensure} from "./checkapply";

  export default {
    data(){
      return{
        checkmodal:false,//查看已存在的详细
        detailmodal:false,//检查明细modal
        userId:0,//医生的id
        registerId:0,
        medicalrecordid:0,//病例Id
        checkprojectList:[],//检查列表
        checkapplydetail:[],//详细检查列表
        tmpdetailid:0,//暂时保存的详细的id
        checkapplyCustom:{
          id:"",//checkapplyCustom的id
          objective:"",//检查目的
        },//检查
        existdetail:[],//已经存在的详细检查全部含由checkapply+checkdetaillist
        existapply:[],//可以显示的checkapply
        existcheck:[],//可以显示的详细信息
      }
    },
    mounted() {
      this.existdetail.splice(0,this.existdetail.length)
      this.checkapplydetail.splice(0,this.checkapplydetail.length)
      this.checkprojectList.splice(0,this.checkprojectList.length)
      this.userId = window.localStorage.getItem("userID")
      this.medicalrecordid = window.localStorage.getItem("medicalrecordid")
      this.registerId = window.localStorage.getItem("registrationId")
      getAllFmedItems(this)
      getexistdetail(this)
    },
    methods:{
      //添加checkapply以及checkappdetail
      addcheck(){
        addcheck(this)
      },
      //删除
      del(i){
        this.checkapplydetail.splice(i,i+1)
      },
      //添加检查明细
      addcheckdetail(){
        this.detailmodal=true
      },
      //确认添加检查明细
      adddetail(){
        adddetail(this)
      },
      //查看存在的详情信息
      read(i){
        read(i,this)
      },
      //开出检查单
      ensure(i){
        ensure(i,this)
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
      },
      //跳转到填写病例界面
      writecase(){
        this.$router.push("/writecase")
      }
    },
  }
</script>

<style scoped>
  @import "checkapply.css";
</style>

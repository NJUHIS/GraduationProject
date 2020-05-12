<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <Menu-item name="1" @click.native="adduser">
          <Icon type="ios-navigate"></Icon>
          增加医院工作人员
        </Menu-item>
        <Menu-item name="2" @click.native="adddept">
          <Icon type="ios-keypad"></Icon>
          添加科室信息
        </Menu-item>
        <Menu-item name="3" @click.native="addschedul">
          <Icon type="ios-analytics"></Icon>
          添加排班信息
        </Menu-item>
        <Menu-item name="4" @click.native="adddisease">
          <Icon type="ios-analytics"></Icon>
          添加疾病诊断
        </Menu-item>
        <Menu-item name="5" @click.native="addregisterlevel">
          <Icon type="ios-analytics"></Icon>
          添加挂号类型
        </Menu-item>
        <Menu-item name="6" @click.native="addsettlecategory">
          <Icon type="ios-analytics"></Icon>
          添加结算类型
        </Menu-item>
      </div>
    </Menu>
    <div class="layout-content">
      <Form class="doctorCustom" ref="doctorCustom" :model="doctorCustom" :label-width="80">
        <FormItem class="doctorFormItem" label="登录名：" prop="username" >
          <i-input type="text" v-model="doctorCustom.username" style="width: 250px" >
          </i-input>
        </FormItem>
        <FormItem class="doctorFormItem" label="密码：" prop="password">
          <i-input type="text" v-model="doctorCustom.password" style="width: 250px" >
          </i-input>
        </FormItem>
        <FormItem class="doctorFormItem" label="真实姓名：" prop="realname">
          <i-input type="text" v-model="doctorCustom.realname" style="width: 250px" >
          </i-input>
        </FormItem>
        <FormItem class="doctorFormItem" label="身份证号：" prop="idnumber">
          <i-input type="text" v-model="doctorCustom.idnumber" style="width: 250px" >
          </i-input>
        </FormItem>
        <FormItem class="doctorFormItem" label="用户类型：" prop="usertypeid">
          <Select v-model="doctorCustom.usertypeid" style="width:250px">
            <Option v-for="item in userTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem class="doctorFormItem" label="医生类型：" prop="doctitleid">
          <Select v-model="doctorCustom.doctitleid" style="width:250px">
            <Option v-for="item in doctorlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem class="doctorFormItem" label="隶属科室：" prop="deptid">
          <Select v-model="doctorCustom.deptid" style="width:250px">
            <Option v-for="item in departmentlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem class="doctorFormItem" label="挂号类型：" prop="registerLevel">
          <Select v-model="doctorCustom.registerLevelId" style="width:250px">
            <Option v-for="item in registerlevellist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem >
          <Button type="primary" @click="adddoctor"  style="margin-left: 2%">确认添加</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import {getDepartment} from "./adddoctor";
  import {getRegisterLevel} from "./adddoctor";
  import {adddoctor} from "./adddoctor";

  export default {
    data(){
      return{
        //医生信息列表
        doctorCustom: {
          username:"",//登录名
          password:"",//密码
          realname:"",//真实姓名
          idnumber:"",//身份证号
          usertypeid:"",//用户类型id
          doctitleid:"",//医生类型id
          deptid:"",//科室id
          registerLevelId:"",//挂号类型Id
        },
        //用户类型选择列表
        userTypeList:[{
          label:"挂号人员",
          value:"1"
        },{
          label:"门诊医生",
          value:"2"
        },{
          label:"医技医生",
          value:"3"
        },{
          label:"药房人员",
          value:"4"
        },{
          label:"财务人员",
          value:"5"
        },{
          label:"行政人员",
          value:"6"
        },{
          label:"管理员",
          value:"7"
        },{
          label:"检查人员",
          value:"8"
        },{
          label:"处置人员",
          value:"9"
        }
        ],
        //医生类型列表
        doctorlist:[{
          label:"主任医师",
          value:"1"
        },{
          label:"副主任医师",
          value:"2"
        },{
          label:"主治医师",
          value:"3"
        },{
          label:"住院医师",
          value:"4"
        }],
        //科室列表
        departmentlist:[],
        //挂号类型列表
        registerlevellist:[],

      }
    },
    created() {
      getRegisterLevel(this)
      getDepartment(this)
    },
    methods:{
      //确认添加医生
      adddoctor(){
        adddoctor(this)
      },
      //跳专添加医院工作人员
      adduser(){
        this.$router.push("/adddoctor")
      },
      //跳转到添加科室
      adddept(){
        this.$router.push("/adddept")
      },
      //跳转到添加排班
      addschedul(){
        this.$router.push("/addschedule")
      },
      //跳转到添加疾病诊断
      adddisease(){
        this.$router.push("/adddisease")
      },
      //跳转到添加挂号类型
      addregisterlevel(){
        this.$router.push("/addregisterlevel")
      },
      //跳转到添加结算类型
      addsettlecategory(){
        this.$router.push("/addsettlecategory")
      }
    },
  }
</script>

<style scoped>
  @import "adddoctor.css";
</style>

<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1">
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
      <Form class="registerform" ref="registerCustom" :model="registerCustom" :label-width="80">
        <FormItem label="看诊日期：" prop="visitdate">
          <DatePicker :options="dataoption" type="date" placeholder="Select date" format="yyyy年MM月dd日" style="width: 250px" v-model="registerCustom.visitdate"></DatePicker>
        </FormItem>
        <FormItem label="看诊时间：" prop="noon" style="margin-top: 20px">
          <Select v-model="registerCustom.noon" style="width:250px">
            <Option v-for="item in noonlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="挂号级别：" prop="registerLevel" style="margin-top: 20px">
          <Select v-model="registerCustom.registerLevel" style="width:250px">
            <Option v-for="item in registerLevel" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="看诊科室：" prop="department" style="margin-top: 20px">
          <Select v-model="registerCustom.department" style="width:250px">
            <Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="病历本：" prop="cases" style="margin-top: 20px">
          <Select v-model="registerCustom.cases" style="width:250px">
            <Option v-for="item in cases" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="医生：" prop="cases" style="margin-top: 20px">
          <i-input @click.native="getDoctor" type="text" v-model="registerCustom.doctorname" readonly="true" style="width: 250px" >
          </i-input>
        </FormItem>
        <FormItem label="结算方式：" prop="settleCategory" style="margin-top: 20px">
          <Select v-model="registerCustom.settleCategory" style="width:250px">
            <Option v-for="item in settleCategorylist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem >
          <Button type="primary" @click="regist"  style="margin-left: 2%">挂号</Button>
        </FormItem>
      </Form>
    </div>

    <!--选择医生弹窗-->
    <Modal title="选择医生" v-model="doctormodal" class-name="vertical-center-modal" footer-hide>
      <Button style="margin-left: 10px;margin-top: 10px" type="dashed" @click="choosedoctor(i)"
              v-for="(item,i) in doctorlist" :key="i">{{item.realname}}</Button>
    </Modal>

  </div>
</template>
<script>
  import {register} from './register'
  import {checkperson} from "./register";
  import {checkcases} from "./register";
  import {getRegisterLevel} from "./register";
  import {getDepartment} from "./register";
  import {regist} from "./register";
  import {getDoctor} from "./register";
  import {getSettleCategories} from "./register";

  export default {
    data(){
      return{
        doctormodal:false,//用来显示选择医生的对话框
        userId:0,//患者的id
        dataoption: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          },

        },
        list: [//选择内容
          {
            value: '1',
            label: '男'
          },
          {
            value:'2',
            label:'女'
          },
        ],
        noonlist: [//选择看诊午别内容
          {
            value: '1',
            label: '凌晨'
          },
          {
            value:'2',
            label:'早上'
          },
          {
            value:'3',
            label:'下午'
          },
          {
            value:'4',
            label:'晚上'
          }
        ],
        registerLevel:[],//选择看诊级别
        department:[],//选择科室
        cases:[{
          value:'1',
          label:"需要"
        },
          {
            value:'0',
            label:"不需要"
          }],//病历本携带
        doctorlist:[],//选择医生的列表
        settleCategorylist:[],//结算类型列表
        registerCustom:{
          visitdate:"",//看诊日期
          noon:"",//看诊午别
          registerLevel:"",//挂号级别
          department:"",//科室
          cases:"",//病历本携带
          doctorname:"",//医生姓名
          scheduledid:"",//排班id
          settleCategory:"",//结算类型id
        }
      }
    },
    created() {
      this.userId = window.localStorage.getItem("patientID")
      getRegisterLevel(this)
      getDepartment(this)
      getSettleCategories(this)
    },
    methods:{
      regist(){//进行挂号操作
        regist(this)
        this.registerCustom = ""
      },
      register(){//跳专挂号
        register(this.$router)
      },
      checkperson(){//查看个人信息
        checkperson(this.$router)
      },
      checkcases(){//查看病例
        checkcases(this.$router)
      },
      getDoctor(){//获取符合预约条件的医生
        this.registerCustom.doctorname=''
        this.registerCustom.doctorid=''
        if (this.registerCustom.visitdate==""||this.registerCustom.noon==""||this.registerCustom.registerLevel==""
        ||this.registerCustom.department==""){
          this.$Message.warning("请先将上述信息填写完整在选择医生")
        }else{
          this.doctorlist.splice(0,this.doctorlist.length)
          getDoctor(this)
        }
      },
      choosedoctor(i){//选择医生
        this.registerCustom.doctorname=this.doctorlist[i].realname
        this.registerCustom.doctorid=this.doctorlist[i].id
        this.doctormodal=false
      }
    },
  }
</script>

<style scoped>
  @import "register.css";
</style>

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
        <Menu-item name="4" @click.native="writecase">
          <Icon type="ios-analytics"></Icon>
          填写病例
        </Menu-item>
      </div>
    </Menu>
    <div class="layout-content">
      <Form :label-width="80">
        <FormItem label="选择药品：" prop="userID" style="margin-top: 20px">
          <Select v-model="tmpdrug" class="Select">
            <Option v-for="item in drugs" :value="item.id" :key="item.id">{{ item.drugsName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="药品数量：" prop="tmpnum">
          <i-input type="text" v-model="tmpnum" class="input" ></i-input>
        </FormItem>
        <FormItem label="用法：" prop="usage">
          <i-input type="text" v-model="tmpusage" class="input" ></i-input>
        </FormItem>
        <FormItem label="频率：" prop="tmpfrequency">
          <i-input type="text" v-model="tmpfrequency" class="input" ></i-input>
        </FormItem>
      </Form>
      <Button type="primary" @click="adddiagnose" class="Button" >添加处方列表</Button>
      <Table border class="table" :columns="existcolumns" :data="existdrugs"></Table>
      <Button type="primary" @click="addprescption" class="Button" >添加处方</Button>
      <Button type="primary" @click="ensure" class="Button" >确认开出</Button>
    </div>
  </div>
</template>
<script>
  import {addprescption, getalldrugs} from "./prescption";
  import {adddrugs} from "./prescption";
  import {getprescptionBymedicalId} from "./prescption";
  import {ensure} from './prescption';

  export default {
    data(){
      return{
        prescriptionState:0,//是否可以添加
        userId:0,
        medicalrecordid:0,//病例Id
        prescptionid:'',//是否存在药方ID，如果不存在则新建一个
        drugs:[],//所有药品列表
        tmpdrug:0,//已经选择的药品id保存
        tmpusage:'',//用法
        tmpfrequency:'',//频率
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
        },{
          title: '用法',
          key:'usage'
        },{
          title:'频率',
          key:'tmpfrequency'
        }],//已经存在的处方列表
        existdrugs:[],//已经存在的药品
        waittoadd:[],//等待添加的药品
      }
    },
    created() {
      this.userId = window.localStorage.getItem("userID")
      //通过挂号id找到病例id
      this.medicalrecordid = window.localStorage.getItem("medicalrecordid")
      getalldrugs(this)
      getprescptionBymedicalId(this)
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
      //跳转到填写病例界面
      writecase(){
        this.$router.push("/writecase")
      },
      //添加处方列表
      adddiagnose(){
        adddrugs(this)
      },
      //添加处方
      addprescption(){
        addprescption(this)
      },
      //确认开出
      ensure(){
        ensure(this)
      }
    },
  }
</script>

<style scoped>
  @import "prescption.css";
</style>

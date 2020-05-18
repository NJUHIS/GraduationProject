<template>
<div>
  <GungWorkflowNavigation v-bind:activeName=this.$options.name v-bind:workflowId="$route.query.prescriptionId"></GungWorkflowNavigation>
  <div class="content">
<!--  <Button :to="'/gung-registration?registrationId='+$route.query.prescriptionId">返回挂号</Button>-->
    <br><br>
  <strong class="idTitle">处方主键 ID : {{prescription.id}}</strong>

    <br><br>

  <p>处方名称：</p>
  <Input :disabled="(prescription.id==null||prescription.prescriptionState!==1)" v-model="prescription.prescriptionName" type="text"  placeholder="请输入..."></Input>

    <br><br>
    <p>处方状态：{{translatePrescriptionState(prescription.prescriptionState)}}</p>

  <br><br>
    <p>处方明细：</p>
  <i-table :columns="prescriptionDetailedColumns" :data="prescription.prescriptionDetailedList"></i-table>
  <Form v-show="!(prescription.id==null||prescription.prescriptionState!==1)&&(registration.visitstate!==2)" >
    <FormItem label="添加药品：">
      <Select v-model="prescriptionDetailed.drugsid">
        <Option v-for="(item,index) in allDrugs" v-bind:value="item.id" v-bind:key="index">{{ item.drugsName }}</Option>
        <!--          这里 value 对应 上面的 v-model-->
      </Select>
    </FormItem>
    <FormItem  label="药品数量">
      <Input v-model="prescriptionDetailed.quantity" type="number" placeholder="请输入..."></Input>
    </FormItem>
    <FormItem label="用法">
      <Input  v-model="prescriptionDetailed.useage" type="text" placeholder="请输入..."></Input>
    </FormItem>
    <FormItem label="频次">
      <Input  v-model="prescriptionDetailed.frequency" type="text" placeholder="请输入..."></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" :disabled="prescription.id==null||prescription.prescriptionState!==1" @click="addPrescriptionDetailed">确认添加</Button>
    </FormItem>

  </Form>

  <Button v-show="!(prescription.id==null||prescription.prescriptionState!==1)&&(registration.visitstate!==2)" type="primary" @click="updatePrescription">保存</Button>
  <Button v-show="!(prescription.id==null||prescription.prescriptionState!==1)&&(registration.visitstate!==2)"  type="primary" @click="confirmPrescription">开出</Button>
  </div>
</div>
</template>

<script>
    import * as GungRegistrationCommunicator from "../gung_communicators/GungRegistrationCommunicator";
    import * as GungUtilities from "../GungUtilities";
    import * as GungPersonalInformationCommunicator from "../gung_communicators/GungPersonalInformationCommunicator";
    import * as GungDoctorCommunicator from "../gung_communicators/GungDoctorCommunicator"
    import * as GungBasicInformationCommunicator from "../gung_communicators/GungBasicInformationCommunicator"
    import {addPrescriptionDetailed} from "../gung_communicators/GungDoctorCommunicator";
    import GungWorkflowNavigation from "./GungWorkflowNavigation";

    export default {
      name: "GungPrescription",
      mounted() {
          this.init();
      },
      components:{
        GungWorkflowNavigation
      },
      data() {
        return {
          registration:{},
          prescriptionDetailed:{
            id:null,
            prescriptionid: null,
            drugsid: null,
            useage: null,
            dosage: null,
            frequency:null,
            price: null,
            quantity: null,
            drugs: null
          },
          allDrugs:[],
          prescription:{},
          prescriptionDetailedColumns:[
            {
              title: '药品主键 ID',
              render:(h,params) => {
                return h('p',params.row.drugs.id.toString())
              }
            },
            {
              title: '药品名称',
              render:(h,params) => {
                return h('p',params.row.drugs.drugsName)
              }
            },
            {
              title: '用法',
              render:(h,params) => {
                return h('p',params.row.useage)
              }
            },
            {
              title: '频次',
              render:(h,params) => {
                return h('p',params.row.frequency)
              }
            },
            {
              title: '数量',
              render:(h,params) => {
                return h('p',params.row.quantity)
              }
            }
          ],
        }
      },
      methods:{
          async init() {
            let registrationId = this.$route.query.prescriptionId;

            try {
              let response = await GungRegistrationCommunicator.getRegistrationById(registrationId);
              GungUtilities.showSuccessMessage("掛號加載成功", response,this);
              this.registration = response.data;
            } catch (error) {
              GungUtilities.showErrorMessage("掛號加載失敗",error, this);

            }

            let prescriptionId = this.$route.query.prescriptionId;
            try {
              let response = await GungDoctorCommunicator.getPrescriptionById(prescriptionId);
              GungUtilities.showSuccessMessage("處方加載成功", response, this);
              this.prescription = response.data;
            } catch (error) {
              //GungUtilities.showErrorMessage("處方加載失敗",error, this);
              this.prescription.medicalId = this.$route.query.prescriptionId;
              try {
                let response = await GungDoctorCommunicator.addPrescription(this.prescription);
                GungUtilities.showSuccessMessage("處方添加成功", response, this);
                this.prescription = response.data;
              } catch (error) {
                GungUtilities.showErrorMessage("處方添加失敗", error, this);
              }
            }

            try {
              let response = await GungBasicInformationCommunicator.getAllDrugs();
              GungUtilities.showSuccessMessage("獲取所有藥品成功",response,this)
              this.allDrugs = response.data;
            }catch(error){
              GungUtilities.showErrorMessage("獲取所有藥品失敗",error,this);
            }


          },
        async confirmPrescription(){
          try {
            let response = await GungDoctorCommunicator.confirmPrescription(this.prescription.id);
            GungUtilities.showSuccessMessage("處方開出成功", response, this);
            this.prescription = response.data;
          } catch (error) {
            GungUtilities.showErrorMessage("處方開出失敗",error, this);

          }
        },
        async updatePrescription(){
          try {
            let response = await GungDoctorCommunicator.updatePrescription(this.prescription);
            GungUtilities.showSuccessMessage("處方更新成功", response, this);
            this.prescription = response.data;
          } catch (error) {
            GungUtilities.showErrorMessage("處方更新失敗", error, this);
          }
        }
        ,async addPrescriptionDetailed(){
            this.prescriptionDetailed.prescriptionid=this.prescription.id;
          try {
            let response = await GungDoctorCommunicator.addPrescriptionDetailed(this.prescriptionDetailed);
            GungUtilities.showSuccessMessage("處方明細添加成功", response, this);
            this.init();
          } catch (error) {
            GungUtilities.showErrorMessage("處方明細添加失敗", error, this);
          }

        },
        translatePrescriptionState(stateNumber){
          switch (stateNumber) {
            case 1:return "编辑中";
            case 2:return "已确认并发出，未收费";
            case 3:return "已收费，未取药";
            case 4:return "已取药";
            case 5:return "已退药";
            default:return "ERROR";
          }
        }

      },
      watch: {
        // // 如果路由有变化，会再次执行该方法
        "$route": "init"
      }
    }
</script>

<style scoped>

  .idTitle{
    font-size: large;
  }

  .content{
    margin: 0 20%;

  }

</style>

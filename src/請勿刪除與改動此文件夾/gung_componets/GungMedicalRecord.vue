<template>
  <div>
    <GungWorkflowNavigation v-bind:activeName=this.$options.name v-bind:workflowId="$route.query.medicalRecordId"></GungWorkflowNavigation>
<!--    <Button :to="'/gung-registration?registrationId='+medicalRecord.id">返回挂号</Button>-->
    <div class="content">
      <br><br>
      <strong class="idTitle">病历主键 ID : {{medicalRecord.id}}</strong>
      <br><br>
    <p>主诉：</p>
    <Input v-model="medicalRecord.medicalReadme" type="textarea" :rows="3" placeholder="请输入..."></Input>  <br><br>
    <p>现病史:</p>
    <Input v-model="medicalRecord.medicalPresent" type="textarea" :rows="3" placeholder="请输入..."></Input>      <br><br>
    <p>现病治疗情况:</p>
    <Input v-model="medicalRecord.presentTreat" type="textarea" :rows="3" placeholder="请输入..."></Input>      <br><br>
    <p>既往史:</p>
    <Input v-model="medicalRecord.medicalHistory" type="textarea" :rows="3" placeholder="请输入..."></Input>      <br><br>
    <p>过敏史:</p>
    <Input v-model="medicalRecord.medicalAllergy" type="textarea" :rows="3" placeholder="请输入..."></Input>      <br><br>
    <p>体格检查:</p>
    <Input v-model="medicalRecord.medicalPhysique" type="textarea" :rows="3" placeholder="请输入..."></Input>      <br><br>
    <p>诊断结果:</p>
    <Input v-model="medicalRecord.medicalDiagnosis" type="textarea" :rows="3" placeholder="请输入..."></Input>      <br><br>
    <p>处理意见:</p>
    <Input v-model="medicalRecord.medicalHandling" type="textarea" :rows="3" placeholder="请输入..."></Input>      <br><br>


    <Button v-show="medicalRecord.caseState!==3"type="primary" @click="updateMedicalRecord"> 保存 </Button>      <br><br>

    <i-table :columns="diagnosisColumns" :data="medicalRecord.diagnosisList"></i-table>

    <Form v-show="medicalRecord.caseState!==3" >
      <FormItem label="添加诊断：">
        <Select v-model="selectedNewDiseaseId">
          <Option v-for="(item,index) in allDiseases" v-bind:value="item.id" v-bind:key="index">{{ item.diseasename }}</Option>
<!--          这里 value 对应 上面的 v-model-->
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="addDiagnosis">确认添加</Button>
      </FormItem>
    </Form>

    </div>
  </div>
</template>

<script>
  import * as GungRegistrationCommunicator from "../gung_communicators/GungRegistrationCommunicator";
  import * as GungPersonalInformationCommunicator from "../gung_communicators/GungPersonalInformationCommunicator";
  import * as GungDoctorCommunicator from "../gung_communicators/GungDoctorCommunicator"
  import * as GungUtilities from "../GungUtilities";
  import * as GungBasicInformationCommunicator from "../gung_communicators/GungBasicInformationCommunicator"
  import GungWorkflowNavigation from "./GungWorkflowNavigation";

    export default {
        name: "GungMedicalRecord",
      data(){
        return{
          user:"",
          medicalRecord:"",
          allDiseases:"",
          selectedNewDiseaseId:"",
          diagnosisColumns:[
            {title:"诊断主键 ID",
              key:"id"
            },
            {
              title: '疾病名称',
              render:(h,params) => {
                return h('p',params.row.disease.diseasename)  //parmas.row表示diagnosisList中的一个元素 diagnosis。也就是整个row。不是一个单元格。
               }
            },
            {title:"疾病国际ICD编码",
              render:(h,params) => {
                return h('p',params.row.disease.diseaseicd)  //parmas.row表示diagnosisList中的一个元素 diagnosis。也就是整个row。不是一个单元格。
              }
            }
          ]

        }
      },
      components:{
        GungWorkflowNavigation
      },

      async created() {
        this.init();
      },
      methods:{
          async init(){
            let medicalRecordId = this.$route.query.medicalRecordId;

            try {
              let response = await GungDoctorCommunicator.getMedicalRecordById(medicalRecordId);
              GungUtilities.showSuccessMessage("病歷加載成功",response,this);
              this.medicalRecord = response.data;
            }catch(error){
              GungUtilities.showErrorMessage("病歷加載失敗",error,this);
            }

            let userId=window.localStorage.getItem("userID");
            try {
              let response = await GungPersonalInformationCommunicator.getUserById(userId);
              GungUtilities.showSuccessMessage("醫院員工加載成功",response,this)
              this.user = response.data;
            }catch(error){
              GungUtilities.showErrorMessage("醫院員工加載失敗",error,this);
            }

            try {
              let response = await GungBasicInformationCommunicator.getAllDiseases();
              GungUtilities.showSuccessMessage("獲取所有疾病成功",response,this)
              this.allDiseases = response.data;
            }catch(error){
              GungUtilities.showErrorMessage("獲取所有疾病失敗",error,this);
            }


          },
        async updateMedicalRecord(){
          try {
            let response = await GungDoctorCommunicator.updateMedicalRecord(this.medicalRecord);
            GungUtilities.showSuccessMessage("病歷保存成功",response,this);
            this.medicalRecord = response.data;
          }catch(error){
            GungUtilities.showErrorMessage("病歷保存失敗",error,this);
          }
        },
        async addDiagnosis() {
          console.log(this.selectedNewDiseaseId);
          let newDiagnosis = {};
          newDiagnosis.diseaseid = this.selectedNewDiseaseId;
          newDiagnosis.medicalid = this.medicalRecord.id;
          try {
            let response = await GungBasicInformationCommunicator.addDiagnosis(newDiagnosis);
            GungUtilities.showSuccessMessage("診斷新增成功", response, this);
            newDiagnosis = response.data;
          } catch (error) {
            GungUtilities.showErrorMessage("診斷新增失敗", error, this);
          }
          try {
            let response = await GungDoctorCommunicator.getMedicalRecordById(this.medicalRecord.id);
            GungUtilities.showSuccessMessage("病歷加載成功", response, this);
            this.medicalRecord = response.data;
          } catch (error) {
            GungUtilities.showErrorMessage("病歷加失敗", error, this);
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

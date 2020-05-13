<template>
  <div>
    <Button @click="routeToGungRegistration">返回挂号</Button>
    <p>病历主键 ID :{{medicalRecord.id}}</p>
    <p>主诉：</p>
    <Input v-model="medicalRecord.medicalReadme" type="textarea" :rows="3" placeholder="请输入..."></Input>
    <p>现病史:</p>
    <Input v-model="medicalRecord.medicalPresent" type="textarea" :rows="3" placeholder="请输入..."></Input>
    <p>现病治疗情况:</p>
    <Input v-model="medicalRecord.presentTreat" type="textarea" :rows="3" placeholder="请输入..."></Input>
    <p>既往史:</p>
    <Input v-model="medicalRecord.medicalHistory" type="textarea" :rows="3" placeholder="请输入..."></Input>
    <p>过敏史:</p>
    <Input v-model="medicalRecord.medicalAllergy" type="textarea" :rows="3" placeholder="请输入..."></Input>
    <p>体格检查:</p>
    <Input v-model="medicalRecord.medicalPhysique" type="textarea" :rows="3" placeholder="请输入..."></Input>
    <p>诊断结果:</p>
    <Input v-model="medicalRecord.medicalDiagnosis" type="textarea" :rows="3" placeholder="请输入..."></Input>
    <p>处理意见:</p>
    <Input v-model="medicalRecord.medicalHandling" type="textarea" :rows="3" placeholder="请输入..."></Input>


    <Button type="primary" @click="updateMedicalRecord"> 保存 </Button>

    <i-table :columns="diagnosisColumns" :data="medicalRecord.diagnosisList"></i-table>

    <Form>
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
</template>

<script>
  import * as GungRegistrationCommunicator from "@/gung_commicators/GungRegistrationComminicator";
  import * as GungPersonalInformationCommunicator from "@/gung_commicators/GungPersonalInformationComminicator";
  import * as GungDoctorCommunicator from "@/gung_commicators/GungDoctorComminicator"
  import * as GungUtilities from "@/gung_utilities/GungUtilities";
  import * as GungBasicInformationCommunicator from "@/gung_commicators/GungBasicInformationComminicator"

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

      async created() {
        this.init();
      },
      methods:{
          async init(){
            let medicalRecordId = this.$route.query.medicalRecordId;

            try {
              let response = await GungDoctorCommunicator.getMedicalRecordById(medicalRecordId);
              console.info(response.data);
              GungUtilities.showSuccessMessage("病歷加載成功",this);
              this.medicalRecord = response.data;
            }catch(error){
              console.error(error.response.data.message);
              GungUtilities.showErrorMessage(error.response.data.message,this);
            }

            let userId=window.localStorage.getItem("userID")
            try {
              let response = await GungPersonalInformationCommunicator.getUserById(userId);
              console.info(response.data);
              GungUtilities.showSuccessMessage("醫院員工加載成功！",this)
              this.user = response.data;
            }catch(error){
              GungUtilities.showErrorMessage(error.response.data.message,this);
            }

            try {
              let response = await GungBasicInformationCommunicator.getAllDiseases();
              console.info(response.data);
              this.allDiseases = response.data;
            }catch(error){
              GungUtilities.showErrorMessage(error.response.data.message,this);
            }


          },
        async updateMedicalRecord(){
          try {
            let response = await GungDoctorCommunicator.updateMedicalRecord(this.medicalRecord);
            console.info(response.data);
            GungUtilities.showSuccessMessage("病歷保存成功",this);
            this.medicalRecord = response.data;
          }catch(error){
            console.error(error.response.data.message);
            GungUtilities.showErrorMessage(error.response.data.message,this);
          }
        },
        async addDiagnosis(){
            console.log(this.selectedNewDiseaseId);
            let newDiagnosis={};
            newDiagnosis.diseaseid=this.selectedNewDiseaseId;
            newDiagnosis.medicalid=this.medicalRecord.id;
          try {
            let response = await GungBasicInformationCommunicator.addDiagnosis(newDiagnosis);
            console.info(response.data);
            GungUtilities.showSuccessMessage("診斷新增成功",this);
            newDiagnosis=response.data;
          }catch(error){
            console.error(error.response.data.message);
            GungUtilities.showErrorMessage(error.response.data.message,this);
          }
          try {
            let response = await GungDoctorCommunicator.getMedicalRecordById(this.medicalRecord.id);
            console.info(response.data);
            //GungUtilities.showSuccessMessage("病歷加載成功",this);
            this.medicalRecord = response.data;
          }catch(error){
            console.error(error.response.data.message);
            GungUtilities.showErrorMessage(error.response.data.message,this);
          }


        },
        routeToGungRegistration(registrationId){
          this.$router.push({
            name: "GungRegistrationRoute",
            query: {
              registrationId:this.medicalRecord.registerId,
            }
          })
        }
      },
      watch: {
        // // 如果路由有变化，会再次执行该方法
         "$route": "init"
      }
    }
</script>

<style scoped>

</style>

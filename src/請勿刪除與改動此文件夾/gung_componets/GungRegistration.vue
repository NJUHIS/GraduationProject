<template>
  <div>
    <GungWorkflowNavigation v-bind:activeName=this.$options.name
                            v-bind:workflowId="$route.query.registrationId"></GungWorkflowNavigation>
    <div class="content">
      <div>


      </div>
      <div>
        <br><br>
        <strong class="idTitle">挂号主键 ID : {{registration.id}}</strong><br><br>
        <p>患者真实姓名: {{registration.realname}}</p>
        <p>患者身份证号码: {{registration.idnumber}}</p>
        <p>患者出生日期: {{registration.birthdate}}</p>
        <p>患者家庭住址: {{registration.homeaddress}}</p>
        <p>预约看诊日期: {{registration.visitdate}}</p>
        <p>患者主键ID: {{registration.patientid}}</p>
        <p>排班主键ID: {{registration.scheduleId}}</p>
        <p>问诊状态：{{translateRegistrationState(registration.visitstate)}}</p>
        <br><br>
        <!--      <Button to="/doctor">医生个人主页</Button>-->
        <!--      <Button>接诊</Button>-->
        <!--      <Button :to="'/gung-medical-record?medicalRecordId='+registration.id">病历</Button>-->
        <!--      <Button :to="'/gung-prescription?prescriptionId='+registration.id">处方</Button>-->
        <!--      <Button to="/checkapply">检查检验和处置</Button>-->
        <Button v-show="registration.visitstate===1" @click="finishDiagnosis"> 诊毕</Button>

      </div>
    </div>
  </div>
</template>

<script>
  import GungWorkflowNavigation from "./GungWorkflowNavigation";
  import * as GungRegistrationCommunicator from "../gung_communicators/GungRegistrationCommunicator";
  import * as GungPersonalInformationCommunicator from "../gung_communicators/GungPersonalInformationCommunicator";
  import * as GungDoctorCommunicator from "../gung_communicators/GungDoctorCommunicator"
  import * as GungUtilities from "../GungUtilities";
  import * as GungBasicInformationCommunicator from "../gung_communicators/GungBasicInformationCommunicator"
  import * as GungMedicalTechnologyCommunicator from "../gung_communicators/GungMedicalTechnologyCommunicator";

  export default {
    name: "GungRegistration",

    components: {
      GungWorkflowNavigation
    },
    data() {
      return {
        user: "",
        registration: "",
        testExaminationDisposals: "",
      }
    },


    async created() {
      this.init();
    },
    methods: {
      async init() {
        let registrationId = this.$route.query.registrationId;

        try {
          let response = await GungRegistrationCommunicator.getRegistrationById(registrationId);
          GungUtilities.showSuccessMessage("掛號加載成功", response, this);
          this.registration = response.data;
        } catch (error) {
          GungUtilities.showErrorMessage("掛號加載失敗", error, this);

        }


        let userId = window.localStorage.getItem("userID");
        try {
          let response = await GungPersonalInformationCommunicator.getUserById(userId);
          GungUtilities.showSuccessMessage("醫院員工加載成功", response, this);
          this.user = response.data;
        } catch (error) {
          GungUtilities.showErrorMessage("醫院員工加載失敗", error, this);
        }

      },
      async finishDiagnosis() {
        try {
          let response = await GungDoctorCommunicator.finishDiagnosis(this.registration.id);
          GungUtilities.showSuccessMessage("診畢成功", response, this);
          this.init();
        } catch (error) {
          GungUtilities.showErrorMessage("診畢失敗", error, this);
        }
      },
      translateRegistrationState(stateNumber) {
        console.log(stateNumber);
        switch (stateNumber) {
          case 0:
            return "未看诊";
          case 1:
            return "正在看诊";
          case 2:
            return "诊毕";
          default:
            return "ERROR"
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
  template {
  }

  .idTitle {
    font-size: large;
  }

  .content {
    margin: 0 20%;
  }
</style>

<template>
  <div>
    <div>
      <Button>接诊</Button>
      <Button @click="routeToGungMedicalRecord">查看病历</Button>
      <Button>处方</Button>
      <Button> 诊毕</Button>
    </div>
    <div>
      <p>挂号主键 ID: {{registration.id}}</p>
      <p>患者真实姓名: {{registration.realname}}</p>
      <p>患者身份证号码: {{registration.idnumber}}</p>
      <p>患者出生日期: {{registration.birthdate}}</p>
      <p>患者家庭住址: {{registration.homeaddress}}</p>
      <p>预约看诊日期: {{registration.visitdate}}</p>
      <p>患者主键ID: {{registration.patientid}}</p>
      <p>排班主键ID: {{registration.scheduleId}}</p>

    </div>
  </div>
</template>

<script>
  import * as GungRegistrationCommunicator from "../gung_communicators/GungRegistrationCommunicator";
  import * as GungPersonalInformationCommunicator from "../gung_communicators/GungPersonalInformationCommunicator";
  import * as GungDoctorCommunicator from "../gung_communicators/GungDoctorCommunicator"
  import * as GungUtilities from "../GungUtilities";
  import * as GungBasicInformationCommunicator from "../gung_communicators/GungBasicInformationCommunicator"

    export default {
      name: "GungRegistration",
      data() {
        return {
          user: "",
          registration: "",
          testExaminationDisposals:"",
        }
      },


      async created() {
       this.init();
      },
      methods: {

        routeToGungMedicalRecord() {

          this.$router.push({
            name: "GungMedicalRecordRoute",
            query: {
              medicalRecordId: this.registration.medicalRecordId,
            }
          })
        },
        async init(){
          let registrationId = this.$route.query.registrationId;

          try {
            let response = await GungRegistrationCommunicator.getRegistrationById(registrationId);
            GungUtilities.showSuccessMessage("掛號加載成功", response,this);
            this.registration = response.data;
          } catch (error) {
            GungUtilities.showErrorMessage("掛號加載失敗",error, this);
          }


          let userId = window.localStorage.getItem("userID")
          try {
            let response = await GungPersonalInformationCommunicator.getUserById(userId);
            GungUtilities.showSuccessMessage("醫院員工加載成功",response, this)
            this.user = response.data;
          } catch (error) {
            GungUtilities.showErrorMessage("醫院員工加載失敗",error, this);
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
</style>

<template>
  <div>
    <div>
      <Button>接诊</Button>
      <Button @click="routeToGungMedicalRecord">查看病历</Button>
      <Button>检查和检验</Button>
      <Button>处置</Button>
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
  import * as GungRegistrationCommunicator from "@/gung_commicators/GungRegistrationComminicator";
  import * as GungPersonalInformationCommunicator from "@/gung_commicators/GungPersonalInformationComminicator";
  import * as GungUtilities from "@/gung_utilities/GungUtilities";
    export default {
      name: "GungRegistration",
      data() {
        return {
          user: "",
          registration: "",
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
            console.info(response.data);
            this.registration = response.data;
            GungUtilities.showSuccessMessage("掛號加載成功", this);
          } catch (error) {
            console.error(error.response.data.message);
            GungUtilities.showErrorMessage(error.response.data.message, this);
          }


          let userId = window.localStorage.getItem("userID")
          try {
            let response = await GungPersonalInformationCommunicator.getUserById(userId);
            console.info(response.data);
            GungUtilities.showSuccessMessage("醫院員工加載成功！", this)
            this.user = response.data;
          } catch (error) {
            GungUtilities.showErrorMessage(error.response.data.message, this);
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

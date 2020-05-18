<template>
  <div>
    <GungWorkflowNavigation v-bind:activeName=this.$options.name
                            v-bind:workflowId="$route.query.registrationId"></GungWorkflowNavigation>

    <div>
      <div>
        <div>
          <!--        <p>挂号日期</p>-->
          <!--        <DatePicker type="date" style="width: 200px"></DatePicker>-->
        </div>

        <div class="listPane">
          <p>未问诊</p>
          <i-table :columns="registrationListColumns" :data="registrationListUnvisited"
                   @on-row-click="showRegistration"></i-table>
        </div>
        <div class="listPane">
          <p>正在问诊</p>
          <i-table :columns="registrationListColumns" :data="registrationListVisiting"
                   @on-row-click="showRegistration"></i-table>
        </div>

        <div class="listPane">
          <p>诊毕</p>
          <i-table :columns="registrationListColumns" :data="registrationListVisited"
                   @on-row-click="showRegistration"></i-table>
        </div>
      </div>
      <div class="rightPane">
        <strong class="idTitle"> 挂号主键 ID : {{registration.id}}</strong><br><br>
              <p>患者真实姓名: {{registration.realname}}</p>
              <p>患者身份证号码: {{registration.idnumber}}</p>
              <p>患者出生日期: {{registration.birthdate}}</p>
              <p>患者家庭住址: {{registration.homeaddress}}</p>
              <p>预约看诊日期: {{registration.visitdate}}</p>
              <p>患者主键ID: {{registration.patientid}}</p>
              <p>排班主键ID: {{registration.scheduleId}}</p>
              <p>问诊状态：{{GungUtilities.translateRegistrationState(registration.visitstate)}}</p>
        <Button v-show="registration.visitstate===0"  @click="admit"> 接诊</Button>
        <Button v-show="registration.id!==null&&registration.visitstate!==0" :to="'/gung-registration?registrationId='+registration.id">详情</Button>

        <!--      <br><br>-->
        <!--      <Button to="/doctor">医生个人主页</Button>-->

        <!--      &lt;!&ndash;      <Button :to="'/gung-medical-record?medicalRecordId='+registration.id">病历</Button>&ndash;&gt;-->
        <!--      &lt;!&ndash;      <Button :to="'/gung-prescription?prescriptionId='+registration.id">处方</Button>&ndash;&gt;-->
        <!--      <Button to="/checkapply">检查检验和处置</Button>-->
        <!--      <Button :disabled="registration.visitstate!==1"   @click="finishDiagnosis"> 诊毕</Button>-->

      </div>
    </div>
  </div>
</template>

<script>
  import GungWorkflowNavigation from "./GungWorkflowNavigation";
  import * as GungDoctorCommunicator from "../gung_communicators/GungDoctorCommunicator";
  import * as GungUtilities from "../GungUtilities";
  import * as GungPersonalInformationCommunicator from "../gung_communicators/GungPersonalInformationCommunicator";
  import * as GungBasicInformationCommunicator from "../gung_communicators/GungBasicInformationCommunicator";
  import GungRegistration from "./GungRegistration";
  import * as GungRegistrationCommunicator from "../gung_communicators/GungRegistrationCommunicator";

  export default {

    name: "GungAllRegistrations",
    data() {
      return {
        GungUtilities,
        user: {},
        registrationListColumns: [
          {
            title: '挂号列表',
            render: (h, params) => {
              return h('p', params.row.id)
            }
          }
        ],
        registrationListUnvisited: [],
        registrationListVisiting: [],
        registrationListVisited: [],
        registration: {}
      }
    },

    components: {
      GungWorkflowNavigation
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        let userId = window.localStorage.getItem("userID");
        try {
          let response = await GungPersonalInformationCommunicator.getUserById(userId);
          GungUtilities.showSuccessMessage("醫院員工加載成功", response, this);
          this.user = response.data;
        } catch (error) {
          GungUtilities.showErrorMessage("醫院員工加載失敗", error, this);
          return;
        }


        try {
          let conditions = {
            userId,
            visitState: 0
          };
          let response = await GungRegistrationCommunicator.getRegistrationsByConditions(conditions);
          GungUtilities.showSuccessMessage("未接診掛號列表加載成功", response, this);
          this.registrationListUnvisited = response.data;

          if (this.registration.id == null) {
            if (this.registrationListUnvisited != null && this.registrationListUnvisited.length > 0) {
              this.registration = this.registrationListUnvisited[0];
            }
          } else {
            try {
              let response = await GungRegistrationCommunicator.getRegistrationById(this.registration.id);
              GungUtilities.showSuccessMessage("掛號獲取成功", response, this);
              this.registration = response.data;
            } catch (error) {
              GungUtilities.showErrorMessage("掛號獲取失敗", error, this);
            }
          }
          conditions = {
            userId,
            visitState: 1
          };
          response = await GungRegistrationCommunicator.getRegistrationsByConditions(conditions);
          GungUtilities.showSuccessMessage("正在接診掛號列表加載成功", response, this);
          this.registrationListVisiting = response.data;

          conditions = {
            userId,
            visitState: 2
          };
          response = await GungRegistrationCommunicator.getRegistrationsByConditions(conditions);
          GungUtilities.showSuccessMessage("已接診掛號列表加載成功", response, this);
          this.registrationListVisited = response.data;

        } catch (error) {
          GungUtilities.showErrorMessage("掛號列表加載失敗", error, this);
        }

      },
      showRegistration(data) {
        this.registration = data;
      },
      async admit(){
        try {
          let response = await GungDoctorCommunicator.admit(this.registration.id);
          GungUtilities.showSuccessMessage("接診成功", response, this);
          this.init();
        } catch (error) {
          GungUtilities.showErrorMessage("接診失敗", error, this);
        }
      }
    }
  }
</script>

<style scoped>

  .listPane {
    float: left;
    width: 13%;
    height: 100vh;
    background-color: rgb(235, 235, 235);
    overflow: auto;
  }

  .rightPane {
    margin: 30px 30px;
    float: left;
    width: 52%;
    height: 100vh;
    overflow: auto;
  }

  .idTitle{
    font-size: large;
  }
</style>

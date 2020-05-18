<template>
  <div>
    <Menu mode="horizontal" v-bind:active-name=activeName>
      <MenuItem name="doctor" to="/doctor">
        个人主页
      </MenuItem>
      <MenuItem v-show="workflowId!=null" name="GungAllRegistrations" :to="'/gung-all-registrations?registrationId='+workflowId">
        所有挂号
      </MenuItem>
      <MenuItem v-show="workflowId==null" name="GungAllRegistrations" :to="'/gung-all-registrations'">
        所有挂号
      </MenuItem>
      <MenuItem :to="'/gung-registration?registrationId='+workflowId" name="GungRegistration" v-show="workflowId!=null">
        当前挂号:{{workflowId}}
      </MenuItem>
      <MenuItem :to="'/gung-medical-record?medicalRecordId='+workflowId" name="GungMedicalRecord"
                v-show="workflowId!=null">
        当前病历:{{workflowId}}
      </MenuItem>
      <MenuItem :to="'/gung-test-examination-disposal?registrationId='+workflowId" name="GungTestExaminationDisposal"
                v-show="workflowId!=null">
        当前检查、检验或处置
      </MenuItem>
      <MenuItem :to="'/gung-prescription?prescriptionId='+workflowId" name="GungPrescription" v-show="workflowId!=null">
        当前处方:{{workflowId}}
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: "GungWorkflowNavigation",
    props: {
      workflowId: null,
      activeName: null
    }
  }
</script>

<style scoped>

</style>

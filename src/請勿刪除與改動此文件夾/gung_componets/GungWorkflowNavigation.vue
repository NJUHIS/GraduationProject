<template>
  <div>
  <Menu mode="horizontal"  v-bind:active-name=activeName>
    <MenuItem name="doctor" to="/doctor">
      个人主页
    </MenuItem>
    <MenuItem name="GungAllRegistrations" to="/gung-all-registrations">
      所有挂号
    </MenuItem>
    <MenuItem  v-show="workflowId!=null" name="GungRegistration" :to="'/gung-registration?registrationId='+workflowId">
      挂号
    </MenuItem>
    <MenuItem v-show="workflowId!=null" name="GungMedicalRecord" :to="'/gung-medical-record?medicalRecordId='+workflowId">
      病历
    </MenuItem>
    <MenuItem v-show="workflowId!=null" name="GungPrescription" :to="'/gung-prescription?prescriptionId='+workflowId">
      处方
    </MenuItem>
  </Menu>
  </div>
</template>

<script>
    export default {
      name: "GungWorkflowNavigation",
      props:{
        workflowId:null,
        activeName:null
      }
    }
</script>

<style scoped>

</style>

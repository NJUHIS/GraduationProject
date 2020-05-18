<template>
  <div>
  <Menu mode="horizontal"  v-bind:active-name=activeName>
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

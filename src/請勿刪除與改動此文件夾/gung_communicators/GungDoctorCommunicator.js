'use strict';

import axios from 'axios';
import {domain} from '../GungGlobal';
let axiosInstance=axios.create(
  {baseURL:domain+"his/DoctorController/"}
);

export function getMedicalRecordById(medicalRecordId){
  return axiosInstance.get("/getMedicalRecordById", {
    params:{
      id:medicalRecordId
    }
  })
}

export function updateMedicalRecord(medicalRecord){
  return axiosInstance.post("/updateMedicalRecord",
    medicalRecord
  )
}

export function getCheckAppliesByConditions(userId,state,registrationId){
  return axiosInstance.get("/getCheckAppliesByConditions", {
    params:{
      userId,
      state,
      registrationId
    }
  })
}

export function getPrescriptionsByConditions(userId,prescriptionState){
  return axiosInstance.get("/getPrescriptionsByConditions" , {
    params:{
      userId,
      prescriptionState
    }
  })
}

export function getPrescriptionById(id){
  return axiosInstance.get("/getPrescriptionById" , {
    params:{
      id
    }
  })
}

export function getCheckDetailedById(id){
  return axiosInstance.get("/getCheckDetailedById" , {
    params:{
      id
    }
  })
}

export function getCheckApplyById(id){
  return axiosInstance.get("/getCheckApplyById" , {
    params:{
      id
    }
  })
}


export function addPrescription(prescription){
  return axiosInstance.post("/addPrescription" ,
      prescription
  )
}
export function addPrescriptionDetailed(prescriptionDetailed){
  return axiosInstance.post("/addPrescriptionDetailed" ,
    prescriptionDetailed
  )
}

export function addCheckApply(checkApply){
  return axiosInstance.post("/addCheckApply" ,
    checkApply
  )
}

export function addCheckDetailed(checkDetailed){
  return axiosInstance.post("/addCheckDetailed" ,
    checkDetailed
  )
}

export function updatePrescription(prescription){
  return axiosInstance.post("/updatePrescription" ,
    prescription
  )
}

export function updateCheckDetailed(checkDetailed){
  return axiosInstance.post("/updateCheckDetailed" ,
    checkDetailed
  )
}

export function confirmPrescription(prescriptionId){
  return axiosInstance.post("/confirmPrescription" , {},{
    params:{
      prescriptionId
    }
  })
}

export function confirmCheckApply(checkApplyId){
  return axiosInstance.post("/confirmCheckApply" , {},{
    params:{
      checkApplyId
    }
  })
}


export function finishDiagnosis(medicalRecordId){
  return axiosInstance.post("/finishDiagnosis" , {},{
    params:{
      medicalRecordId
    }
  })
}

export function admit(registrationId){
  return axiosInstance.post("/admit" , {},{
    params:{
      registrationId
    }
  })
}

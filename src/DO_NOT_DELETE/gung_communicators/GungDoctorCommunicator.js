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



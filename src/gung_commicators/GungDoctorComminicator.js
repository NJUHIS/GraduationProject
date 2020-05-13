'use strict';

import axios from 'axios';
import {domain} from '../gung_utilities/GungUtilities';
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




'use strict';

import axios from 'axios';
import {domain} from '../gung_utilities/GungUtilities';
let axiosInstance=axios.create(
  {baseURL:domain+"his/BasicInformationController/"}
);

export function getAllDiseases(){
  return axiosInstance.get("/getAllDiseases"
  )
}



export function addDiagnosis(addDiagnosis){
  console.log("1111",this.name);
  return axiosInstance.post("/addDiagnosis",
    addDiagnosis
  )
}

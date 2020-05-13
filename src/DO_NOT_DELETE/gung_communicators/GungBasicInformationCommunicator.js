'use strict';

import axios from 'axios';
import {domain} from '../GungGlobal';
let axiosInstance=axios.create(
  {baseURL:domain+"his/BasicInformationController/"}
);

export function getAllDiseases(){
  return axiosInstance.get("/getAllDiseases"
  )
}



export function addDiagnosis(addDiagnosis){
  //var fName = arguments.callee.toString().match(/function ([^\(]+)/)[1]
  return axiosInstance.post("/addDiagnosis",
    addDiagnosis
  )
}

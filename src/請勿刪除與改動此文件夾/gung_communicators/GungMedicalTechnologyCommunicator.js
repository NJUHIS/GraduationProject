'use strict';

import axios from 'axios';
import {domain} from '../GungGlobal';
let axiosInstance=axios.create(
  {baseURL:domain+"his/MedicalTechnologyController/"}
);

export function startCheckDetailed(checkDetailedId){
  return axiosInstance.get("/startCheckDetailed", {
    params:{
      checkDetailedId
    }
  })
}

export function finishCheckDetailed(checkDetailedId){
  return axiosInstance.get("/finishCheckDetailed", {
    params:{
      checkDetailedId
    }
  })
}


export function reportCheckDetailed(checkDetailedId){
  return axiosInstance.get("/reportCheckDetailed", {
    params:{
      checkDetailedId
    }
  })
}






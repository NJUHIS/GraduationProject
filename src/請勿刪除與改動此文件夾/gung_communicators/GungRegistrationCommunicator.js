'use strict';

import axios from 'axios';
import {domain} from '../GungGlobal';
let axiosInstance=axios.create(
  {baseURL:domain+"his/RegistrationController/"}
);

export function getRegistrationById(registrationId){
  return axiosInstance.get("/getRegistrationById", {
    params:{
      id:registrationId
    }
  })
}



export function getRegistrationsByConditions(conditions){
  return axiosInstance.get("/getRegistrationsByConditions", {
    params:conditions
  })
}



'use strict';

import axios from 'axios';
import {domain} from '../gung_utilities/GungUtilities';
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




'use strict';

import axios from 'axios';
import {domain} from '../GungGlobal';
let axiosInstance=axios.create(
  {baseURL:domain+"his/PersonalInformationController/"}
);

export function getUserById(userId){
  return axiosInstance.get("/getUserById", {
    params:{
      id:userId
    }
  })
}




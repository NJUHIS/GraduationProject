'use strict';

import axios from 'axios';
import {domain} from '../GungGlobal';
let axiosInstance=axios.create(
  {baseURL:domain+"his/PharmacyController/"}
);

export function dispenseMedicine(prescriptionId){
  return axiosInstance.get("/dispenseMedicine", {
    params:{
      prescriptionId
    }
  })
}




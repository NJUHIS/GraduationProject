import $ from 'jquery';
//得到所有药品
function getalldrugs(self) {
  self.$http.get('api//his/BasicInformationController/getAllDrugs',{

  }).then(function (response) {
    self.drugs = response.data
  })
}

//添加到已存在drugs
function adddrugs(self) {
  var tmp ={}
  for (var i=0;i<self.drugs.length;i++){
    if (self.drugs[i].id == self.tmpdrug){
      tmp = self.drugs[i]
      break
    }
  }
  tmp.drugsnum = self.tmpnum
  tmp.usage = self.tmpusage
  tmp.tmpfrequency = self.tmpfrequency
  self.existdrugs.push(tmp)
  self.waittoadd.push(tmp)
  self.tmpdrug=''
  self.tmpnum=''
}

//查找是否存在药方
function getprescptionBymedicalId(self) {
  self.$http.get('api//his/DoctorController/getPrescriptionById',{
    params:{
      id:self.medicalrecordid
    }
  }).then(function (response) {
    console.log(response.data)
    self.prescptionid = response.data.id
  })
}

//添加药方
function addprescption(self) {
  //不存在已有药方时
  if (self.prescptionid==''){
    self.$http.post('api//his/DoctorController/addPrescription',{
      medicalId:self.medicalrecordid
    }).then(function (response) {
      self.prescptionid = response.data.id
      for (var i =0;i<self.waittoadd.length;i++){
        self.$http.post('api//his/DoctorController/addPrescriptionDetailed',{
          prescriptionid:self.prescptionid,
          drugsid:self.waittoadd[i].id,
          quantity:self.waittoadd[i].drugsnum,
          price:self.waittoadd[i].drugsPrice,
          dosage:self.waittoadd[i].drugsDosage,
          frequency:self.waittoadd[i].frequency,
          useage:self.waittoadd[i].usage
        }).then(function (response) {
          console.log(response.data)
        })
      }
    })
  }else{
    //存在已有药方时
    for (var i =0;i<self.waittoadd.length;i++){
      self.$http.post('api//his/DoctorController/addPrescriptionDetailed',{
        prescriptionid:self.prescptionid,
        drugsid:self.waittoadd[i].id,
        quantity:self.waittoadd[i].drugsnum,
        price:self.waittoadd[i].drugsPrice,
        dosage:self.waittoadd[i].drugsDosage,
        frequency:self.waittoadd[i].frequency,
        useage:self.waittoadd[i].usage
      }).then(function (response) {
        console.log(response.data)
      })
    }
  }
}

export {
  getalldrugs,
  adddrugs,
  getprescptionBymedicalId,
  addprescption
}

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
  self.tmpusage=''
  self.tmpfrequency=''
}

//查找是否存在药方
function getprescptionBymedicalId(self) {
  self.$http.get('api//his/DoctorController/getPrescriptionById',{
    params:{
      id:self.medicalrecordid
    }
  }).then(function (response) {
    self.prescptionid = response.data.id
    self.prescriptionState = response.data.prescriptionState
    for (var i=0;i<response.data.prescriptionDetailedList.length;i++){
      var tmp = {}
      tmp.drugsName = response.data.prescriptionDetailedList[i].drugs.drugsName
      tmp.drugsFormat = response.data.prescriptionDetailedList[i].drugs.drugsFormat
      tmp.drugsnum = response.data.prescriptionDetailedList[i].quantity
      tmp.drugsDosage = response.data.prescriptionDetailedList[i].dosage
      tmp.usage = response.data.prescriptionDetailedList[i].useage
      tmp.tmpfrequency = response.data.prescriptionDetailedList[i].frequency
      self.existdrugs.push(tmp)
    }
    if (self.prescriptionState == 2){
      self.$Message.warning("已经存在药方，不可再次开出")
    }
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
          frequency:self.waittoadd[i].tmpfrequency,
          useage:self.waittoadd[i].usage
        }).then(function (response) {
          self.$Message.success("添加成功")
          self.waittoadd.splice(0,self.waittoadd.length)
          self.prescptionid = response.data.id
        })
      }
    })
  }else if (self.prescriptionState == 1){
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
        self.$Message.success("添加成功")
        self.waittoadd.splice(0,self.waittoadd.length)
      })
    }
  }else{
    self.$Message.warning("你已经确认开出药方不可再次编辑")
  }
}

//确认开出药方
function ensure(self) {
  self.$http.get('api//his/DoctorController/confirmPrescription',{
    params:{
      prescriptionId:self.prescptionid
    }
  }).then(function (response) {
    console.log(response.data)
    self.$Message.success("成功确认开出,此药方不可在修改")
  })
}

export {
  getalldrugs,
  adddrugs,
  getprescptionBymedicalId,
  addprescption,
  ensure
}

import $ from "jquery";
//获取病例id
function getMedicalrecord(self) {
  self.$http.get('api//his/DoctorController/getMedicalRecordsByConditions',{
    params:{
      registrationId:self.registerId
    }
  }).then(function (response) {
    self.medicalrecordid = response.data[0].id
    window.localStorage.setItem("medicalrecordid",self.medicalrecordid)
  }).catch(function (error) {
    self.$Message.warning(error.response.data.message())
  })
}
//获取所有disease
function getAlldisease(self) {
  self.$http.get('api//his/BasicInformationController/getAllDiseases',{
  }).then(function (response) {
    for (var i=0;i<response.data.length;i++){
      var tmp = {}
      tmp.label = response.data[i].diseasename
      tmp.value = response.data[i].id
      self.diseaseList.push(tmp)
    }
  })
}
//确认添加诊断
function adddiagnose(self) {
  self.$http.post('api//his/BasicInformationController/addDiagnosis',{
    medicalid:self.medicalrecordid,
    diseaseid:self.diseaseId
  }).then(function (response) {
    self.diseaseId = ""
    self.$Message.success("添加成功")
    getDiseaseById(self)
  })
}
//添加已有诊断
function getDiseaseById(self) {
  self.$http.get('api//his/DoctorController/getMedicalRecordsByConditions',{
    params:{
      registrationId:self.registerId
    }
  }).then(function (response) {
    self.existdiagnose.splice(0,self.existdiagnose.length)
    for (var i =0;i<response.data[0].diagnosisList.length;i++){
      self.existdiagnose.push(response.data[0].diagnosisList[i].disease)
    }
  })
}
export {
  getMedicalrecord,
  getAlldisease,
  adddiagnose,
  getDiseaseById
}

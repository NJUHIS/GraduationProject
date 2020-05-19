import $ from 'jquery';

//诊毕
function finish(self) {
  console.log(self.medicalrecordid)
  self.$http.post('api//his/DoctorController/finishDiagnosis?medicalRecordId='+self.medicalrecordid,{

  }).then(function (response) {
    console.log(response.data)
    self.$Message.success("已经诊断完毕不可再次修改")
    self.$router.push("/doctor")
  })
}

export {
  finish
}

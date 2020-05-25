import $ from 'jquery';
//搜索处方
function getprescption(self) {
  self.prescption.splice(0,self.prescption.length)
  self.$http.get("api//his/DoctorController/getPrescriptionById",{
    params:{
      id:self.registerId
    }
  }).then(function (response) {
    var tmp = {}
    if (response.data.prescriptionState == 2){
      tmp.state ="已确认并发出，未收费。"
    }else{
      tmp.state = "已经缴费无需再次缴费"
    }
    tmp.id = response.data.id
    var sum=0;
    for (var i=0;i<response.data.prescriptionDetailedList.length;i++){
      sum = sum + response.data.prescriptionDetailedList[i].price
    }
    tmp.sum = sum
    self.prescption.push(tmp)
    console.log(response.data)
  })
}

//缴费
function pay(index,self) {
  if (self.prescption[index].state == "已经缴费无需再次缴费"){
    self.$Message.warning("已经缴费无需再次缴费")
  }else{
    self.$http.post("api//his/RegistrationController/payPrescription?prescriptionId="+self.prescption[index].id,{
    }).then(function (response) {
      self.prescption[0].state = "已经缴费无需再次缴费"
      self.$Message.success("缴费成功")
    })
  }
}

export {
  getprescption,
  pay
}

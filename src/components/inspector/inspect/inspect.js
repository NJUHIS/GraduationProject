import $ from 'jquery';
//根据挂号Id获取检查处置单
function getcheck(self) {
  self.checkapply.splice(0,self.checkapply.length)
  self.$http.get('api//his/DoctorController/getCheckAppliesByConditions',{
    params:{
      state:2,
      registrationId:self.registerId
    }
  }).then(function (response) {
    self.checkapply = response.data
  })
}

//检查处置单缴费
function pay(index,self){
  self.$http.post("api//his/RegistrationController/payCheckApply?checkApplyId="+self.checkapply[index].id,{

  }).then(function (response) {
    self.$Message.success("编号为"+self.checkapply[index].id+"的检查处置单缴费成功")
    self.checkapply.splice(index,index+1)
  })
}

export {
  getcheck,
  pay
}

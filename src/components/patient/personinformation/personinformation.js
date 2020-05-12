import $ from "jquery";
//跳专到挂号
function register(route) {
  route.push("/register")
}
//个人信息
function checkperson(route) {
  route.push("/personinformation")
}

function checkcases(route) {
  route.push("/checkcases")
}

//获取个人信息
function getPersonInformation(id,self) {
  self.$http.get('api//his/PersonalInformationController/getPatientById', {
    params: {
      id:id
    }
  }).then(function (response) {
    self.username=response.data.name
    self.idnumber=response.data.idnumber
    self.phonenumber=response.data.phone
    self.loginname=response.data.loginname
    self.homeaddress=response.data.homeAddress
    if (response.data.gender == '1'){
      self.gender="男"
    }else{
      self.gender="女"
    }
    self.birthday=response.data.birthday
  }).catch(function (error) {
    self.$Message.error(error.response.data.message)
  })
}

export {
  register,
  getPersonInformation,
  checkperson,
  checkcases
}

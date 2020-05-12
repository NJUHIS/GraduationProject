import $ from "jquery";

//登录方法
function login(userID,password,flag3,route,self) {
  if(flag3=="医院员工"){
    self.$http.get('api//his/PersonalInformationController/userSignIn', {
      params: {
        username: userID,
        password: password
      }
    }).then(function (response) {
      self.formCustom.userID = ''
      self.formCustom.password = ''
      console.log(response.data)
      var typid = response.data.usertypeid
      window.localStorage.setItem("userID",response.data.id)
      if (typid == 2){
        route.push("/doctor")
      }else if (typid == 7){
        route.push("/adddoctor")
      }
    }).catch(function (error) {
      self.$Message.error(error.response.data.message)
    })
  }else {
    self.$http.get('api//his/PersonalInformationController/patientSignIn', {
      params: {
        username: userID,
        password: password
      }
    }).then(function (response) {
      console.log(response.data)
      self.formCustom.userID = ''
      self.formCustom.password = ''
      window.localStorage.setItem("patientID",response.data.id)
      route.push("/personinformation")
    }).catch(function (error) {
      self.$Message.error(error.response.data.message)
    })
  }
}
//注册方法
function register(self) {
  self.$http.post('api//his/PersonalInformationController/addPatient', {
    name:self.registerCustom.name,
    idnumber:self.registerCustom.idnumber,
    phone:self.registerCustom.phone,
    homeAddress:self.registerCustom.homeaddress,
    gender:self.registerCustom.gender,
    birthday:self.registerCustom.birthday,
    loginname:self.registerCustom.loginname,
    password:self.registerCustom.password
  }).then(function (response) {
    self.$Message.success("注册成功")
    self.registerCustom=''
  }) .catch(function (error) {
    self.$Message.error(error.response.data.message)
    self.registerCustom.password=''
  })

}

export {
  login,
  register
}

import $ from "jquery";
//获取挂号类型
function getRegisterLevel(self) {
  self.$http.get('api//his/BasicInformationController/getAllRegisterLevels', {
  }).then(function (response) {
    for(var i =0 ;i <response.data.length;i++){
      var tmp = {}
      tmp.label = response.data[i].registname
      tmp.value = response.data[i].id
      self.registerlevellist.push(tmp)
    }
  }).catch(function (error) {
    self.$Message.error(error.response.data.message)
  })
}

//获取所有的科室
function getDepartment(self) {
  self.$http.get('api//his/BasicInformationController/getAllDepartments', {
  }).then(function (response) {
    for (var i = 0;i<response.data.length;i++){
      var tmp={}
      tmp.label = response.data[i].deptname
      tmp.value = response.data[i].id
      self.departmentlist.push(tmp)
    }
  }).catch(function (error) {
    self.$Message.error(error.response.data.message)
  })
}
//确认添加医生
function adddoctor(self) {
  self.$http.post('api//his/BasicInformationController/addUser',self.doctorCustom)
    .then(function (response) {
      console.log(response.data)
      self.$Message.success("恭喜添加成功")
      self.doctorCustom=""
    })
}

export {
  getRegisterLevel,
  getDepartment,
  adddoctor
}

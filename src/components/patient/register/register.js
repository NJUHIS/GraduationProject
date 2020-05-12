import $ from "jquery";
//挂号
function register(route) {
  route.push("/register")
}
//查看个人信息
function checkperson(route) {
  route.push("/personinformation")
}
//查看历史病例
function checkcases(route) {
  route.push("/checkcases")
}
//检查是否有未看诊的挂号
//日期格式化处理
function dateFormat(time) {
  var date=new Date(time);
  var year=date.getFullYear();
  /* 在日期格式中，月份是从0开始的，因此要加0
   * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
   * */
  var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
  var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
  // 拼接
  return year+"-"+month+"-"+day;
}
//获取挂号类型
function getRegisterLevel(self) {
  self.$http.get('api//his/BasicInformationController/getAllRegisterLevels', {
  }).then(function (response) {
    for(var i =0 ;i <response.data.length;i++){
      var tmp = {}
      tmp.label = response.data[i].registname
      tmp.value = response.data[i].id
      self.registerLevel.push(tmp)
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
      self.department.push(tmp)
    }
  }).catch(function (error) {
    self.$Message.error(error.response.data.message)
  })
}

//获取符合条件的医生
function getDoctor(self) {
  self.$http.get('api//his/BasicInformationController/getSchedulingsByConditions',{
    params:{
      registerLevelId:self.registerCustom.registerLevel,
      deptId:self.registerCustom.department,
      fromNoon:self.registerCustom.noon,
      fromScheduleDate:dateFormat(self.registerCustom.visitdate),
      toScheduleDate:dateFormat(self.registerCustom.visitdate),
      toNoon:self.registerCustom.noon,
    }
  }).then(function (response) {
    for(var i=0;i<response.data.length;i++){
      var tmp = {}
      tmp.realname = response.data[i].user.realname
      tmp.id = response.data[i].id
      self.doctorlist.push(tmp)
    }
    self.doctormodal=true
  })
}

function regist(self) {//进行挂号操作
  self.$http.post('api//his/RegistrationController/addRegistration', {
      patientid:self.userId,
      settleid:self.registerCustom.settleCategory,
      isbook:self.registerCustom.cases,
      scheduleId:self.registerCustom.doctorid
  }).then(function (response) {
    self.$Message.success("恭喜您，挂号成功")
  }).catch(function (error) {
    self.$Message.error(error.response.data.message)
  })
}

function getSettleCategories(self) {//获取全部的结算类型
  self.$http.get('api//his/BasicInformationController/getAllSettleCategories',{
  }).then(function (response) {
    for (var i = 0;i<response.data.length;i++){
      var tmp={}
      tmp.value = response.data[i].id
      tmp.label = response.data[i].settlename
      self.settleCategorylist.push(tmp)
    }
  }).catch(function (error) {
    self.$Message.error(error.response.data.message)
  })
}

export {
  register,
  checkperson,
  checkcases,
  getRegisterLevel,
  getDepartment,
  regist,
  getDoctor,
  getSettleCategories
}

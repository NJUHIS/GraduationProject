import $ from "jquery";
//跳专到挂号
function register(route) {
  route.push("/admit")
}
//医生个人信息界面
function personinformation(route) {
  route.push("/doctor")
}
//获取当天日期方法
function getToday() {
  var nowDate = new Date();
  let date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1<10 ? "0"+(nowDate.getMonth()+1) : nowDate.getMonth()+1,
    date: nowDate.getDate()<10 ? "0"+nowDate.getDate() : nowDate.getDate(),
  }
  let systemDate = date.year + '-'  + date.month + '-'  + date.date;
  return systemDate
}
//获取该医生的挂号列表
function getRegister(userID,self) {
  var today = getToday()
  self.$http.get('api//his/RegistrationController/getRegistrationsByConditions',{
    params:{
      userId:userID,
      visitState:1,
      fromVisitDate:today,
      toVisitDate:today,
      toNoon:4,
      fromNoon:1
    }
  }).then(function (response) {
    var tmp={}
    for (var i=0;i<response.data.length;i++){
      tmp.realname=response.data[i].realname
      if (response.data[i].gender==1){
        tmp.gender='男'
      }else{
        tmp.gender='女'
      }
      tmp.homeaddress=response.data[i].homeaddress
      if (response.data[i].isbook==0){
        tmp.isbook='不需要病历本'
      }else{
        tmp.isbook='需要病历本'
      }
      tmp.id=response.data[i].id
      self.registerList.push(tmp)
    }
  })
}
//继续看诊
function  admit(id,route){
  window.localStorage.setItem("registrationId",id)
  route.push("/diagnose")
}
//跳转到正在看诊的界面
function during(route) {
  route.push("/during")
}
export {
  register,
  personinformation,
  getRegister,
  admit,
  during
}

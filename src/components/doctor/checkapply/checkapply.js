import $ from 'jquery';
//获取所有非药品检查项目
function getAllFmedItems(self) {
  self.$http.get('api//his/BasicInformationController/getAllFmedItems',{
  }).then(function (response) {
    for(var i =0;i<response.data.length;i++){
      var tmp = {}
      tmp.label = response.data[i].itemname
      tmp.value = response.data[i].id
      tmp.deptid = response.data[i].deptid
      tmp.price = response.data[i].price
      self.checkprojectList.push(tmp)
    }
  })
}

//将暂时的detail存入要保存的detail中
function adddetail(self) {
  for (var i=0;i<self.checkprojectList.length;i++){
    if (self.checkprojectList[i].value == self.tmpdetailid){
      self.checkapplydetail.push(self.checkprojectList[i])
      break
    }
  }
  self.detailmodal=false
}

//确认添加checkapply以及checkapplydetail
function addcheck(self) {
  self.$http.post('api//his/DoctorController/addCheckApply',{
      medicalId:self.medicalrecordid,
      objective:self.checkapplyCustom.objective
  }).then(function (response) {
    self.checkapplyCustom.id = response.data.id
    var self1 = self
    //保存检查明细
    for (var i=0;i<self1.checkapplydetail.length;i++){
      self1.$http.post('api//his/DoctorController/addCheckDetailed',{
        checkappid:self1.checkapplyCustom.id,
        checkprojid:self1.checkapplydetail[i].value,
        identification:1
      }).then(function (response) {

      })
    }
    self1.$Message.success("恭喜添加成功")
    self.checkapplyCustom.objective = ""
    self.checkapplydetail.splice(0,self.checkapplydetail.length)
  })
}

//获得已经存在的详细检查
function getexistdetail(self){
  self.$http.get('api//his/DoctorController/getCheckAppliesByConditions',{
    params:{
      registrationId:self.registerId
    }
  }).then(function (response) {
    console.log(response.data)
    //将已有的详细检查添加
    for (var i=0;i<response.data.length;i++){
      for (var j=0;j<response.data[i].checkDetailedList.length;j++){
        var tmp={}
        tmp.label = response.data[i].checkDetailedList[j].fmedItem.itemname
        tmp.value = response.data[i].checkDetailedList[j].id
        tmp.deptid = response.data[i].checkDetailedList[j].deptid
        tmp.price = response.data[i].checkDetailedList[j].price
        if (response.data[i].checkDetailedList[j].state == 1){
          tmp.state = "等待执行"
          tmp.result = "无"
        }else if(response.data[i].checkDetailedList[j].state == 3){
          tmp.state = "等待结果录入"
          tmp.result = "无"
        }
        else{
          tmp.state = "已出结果"
          tmp.result = response.data[i].checkDetailedList[j].result
        }
        self.existdetail.push(tmp)
      }
    }
  })
}

export {
  getAllFmedItems,
  addcheck,
  adddetail,
  getexistdetail
}

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

export {
  getAllFmedItems,
  addcheck,
  adddetail
}

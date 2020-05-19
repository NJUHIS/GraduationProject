import $ from 'jquery';
//获取所有非药品检查项目
import{confirmCheckApply} from '@/請勿刪除與改動此文件夾/gung_communicators/GungDoctorCommunicator.js'
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
  if (self.objective==''||self.checkapplyCustom.id==''||self.checkapplydetail.length==0){
    self.$Message.warning("请填写完整在添加检查处置单")
  }else {
    self.$http.post('api//his/DoctorController/addCheckApply', {
      medicalId: self.medicalrecordid,
      objective: self.checkapplyCustom.objective
    }).then(function (response) {
      self.checkapplyCustom.id = response.data.id
      var self1 = self
      //保存检查明细
      for (var i = 0; i < self1.checkapplydetail.length; i++) {
        self1.$http.post('api//his/DoctorController/addCheckDetailed', {
          checkappid: self1.checkapplyCustom.id,
          checkprojid: self1.checkapplydetail[i].value,
          identification: 1
        }).then(function (response) {
        })
      }
      self1.$Message.success("恭喜添加成功")
      self.checkapplyCustom.objective = ""
      self.checkapplydetail.splice(0, self.checkapplydetail.length)
      self.existdetail.splice(0, self.existdetail.length)
      getexistdetail(self)
    })
  }
}

//获得已经存在的详细检查
function getexistdetail(self){
  self.existapply.splice(0,self.existapply.length)
  self.existdetail.splice(0,self.existdetail.length)
  self.$http.get('api//his/DoctorController/getCheckAppliesByConditions',{
    params:{
      registrationId:self.registerId
    }
  }).then(function (response) {
    console.log(response.data)
    //将已有的详细检查添加
    self.existdetail = response.data
    //设计existapply
    for (var i=0;i<self.existdetail.length;i++){
      var tmp = {}
      tmp.id = self.existdetail[i].id
      tmp.objective = self.existdetail[i].objective
      if (self.existdetail[i].state == 1){
        tmp.state = "未开出"
      }else{
        tmp.state = "已开出"
      }
      self.existapply.push(tmp)
    }
  })
}

//查看已经存在的详情
function read(index,self){
  self.existcheck.splice(0,self.existcheck.length)
  for (var j=0;j<self.existdetail[index].checkDetailedList.length;j++){
    var tmp = {}
    tmp.label = self.existdetail[index].checkDetailedList[j].fmedItem.itemname
    tmp.price = self.existdetail[index].checkDetailedList[j].price
    tmp.deptid = self.existdetail[index].checkDetailedList[j].deptid
    if (self.existdetail[index].checkDetailedList[j].state==1){
      tmp.state = "等待执行"
      tmp.result = "无"
    }else if (self.existdetail[index].checkDetailedList[j].deptid == 2){
      tmp.state = "正在执行"
      tmp.result = "无"
    }else if (self.existdetail[index].checkDetailedList[j].deptid == 3){
      tmp.state = "执行结束结果未出"
      tmp.result = "无"
    }else{
      tmp.state = "结果已出"
      tmp.result = self.existdetail[index].checkDetailedList[j].result
    }
    self.existcheck.push(tmp)
  }
  self.checkmodal = true
}

//确认开出
function ensure(index,self){
  if (self.existapply[index].state=="未开出"){
    self.$http.post('api//his/DoctorController/confirmCheckApply?checkApplyId='+self.existapply[index].id,{
    }).then(function (response) {
      self.existapply[index].state="已开出"
    })
  }else{
    self.$Message.warning("无需重复开出")
  }
}


export {
  getAllFmedItems,
  addcheck,
  adddetail,
  getexistdetail,
  read,
  ensure
}

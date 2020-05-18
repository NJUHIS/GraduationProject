import $ from 'jquery';
//得到所有药品
function getalldrugs(self) {
  self.$http.get('api//his/BasicInformationController/getAllDrugs',{

  }).then(function (response) {
    self.drugs = response.data
    console.log(self.drugs)
  })
}

//添加到已存在drugs
function adddrugs(self) {
  var tmp ={}
  for (var i=0;i<self.drugs.length;i++){
    if (self.drugs[i].id == self.tmpdrug){
      tmp = self.drugs[i]
      break
    }
  }
  tmp.drugsnum = self.tmpnum
  self.existdrugs.push(tmp)
  self.tmpdrug=''
  self.tmpnum=''
}

export {
  getalldrugs,
  adddrugs
}

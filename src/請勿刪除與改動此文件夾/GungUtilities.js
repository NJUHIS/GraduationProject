export function showErrorMessage(errorMessage, error, component) {
  let errorResponseMessage = error.response.data.message;
  console.error(errorResponseMessage);
  component.$Notice.error({title: errorMessage.toString(), desc: errorResponseMessage.toString()});
}


export function showSuccessMessage(successMessage, response, component) {
  let data = response.data;
  console.info(successMessage, data);
  component.$Notice.success({title: successMessage.toString()});
}


export function showSuccessMessageWithoutResponse(successMessage, component) {
  console.info(successMessage);
  component.$Notice.success({title: successMessage.toString()});
}


export function translateRegistrationState(stateNumber) {
  switch (stateNumber) {
    case 0:
      return "未看诊";
    case 1:
      return "正在看诊";
    case 2:
      return "诊毕";
    default:
      return "ERROR"
  }
}

export function toYYYYMMDD(date) {
  if (date == null) return null;
  let year = date.getFullYear();
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  console.log("GungUtilities.toYYYYMMDD", year + '-' + month + '-' + day);
  return year + '-' + month + '-' + day;
}

//2016-6-14 11:20:00
export function fromYYYYMMDD(dateStr) {

  let separator="-";

  let dateArr = dateStr.split(separator);
  let year = parseInt(dateArr[0]);
  let month;
  if(dateArr[1].indexOf("0") === 0){
    month = parseInt(dateArr[1].substring(1));
  }else{
    month = parseInt(dateArr[1]);
  }
  let day = parseInt(dateArr[2]);
  let date = new Date(year,month -1,day);
  console.log("fromYYYYMMDD",date);
  return date;
}


export function translateTestExaminationDisposalDetailState(stateNumber){
  switch(stateNumber) {
    case 1:
      return "未检验检查处置";
    case 2:
      return "检验检查处置中";
    case 3:
      return "检验检查处置完成，结果未出";
    case 4:
      return "结果已出";
    default:
      return "ERROR";
  }
}

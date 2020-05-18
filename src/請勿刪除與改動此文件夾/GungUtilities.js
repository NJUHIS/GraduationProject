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

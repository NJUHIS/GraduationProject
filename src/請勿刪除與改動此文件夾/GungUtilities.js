export function showErrorMessage(errorMessage,error,component) {
  let errorResponseMessage=error.response.data.message
  console.error(errorResponseMessage);
  component.$Notice.error({title:errorMessage.toString(),desc:errorResponseMessage.toString()});
}


export function showSuccessMessage(successMessage,response,component) {
  let data=response.data;
  console.info(successMessage,data);
  component.$Notice.success({title:successMessage.toString()});
}


export function showSuccessMessageWithoutResponse(successMessage,component) {
  console.info(successMessage);
  component.$Notice.success({title:successMessage.toString()});
}

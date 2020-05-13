export let domain="http://localhost:9002/";

export function showErrorMessage(errorMessage,component) {
  //console.error(errorMessage);
  component.$Notice.error({title:errorMessage.toString(),desc:errorMessage.toString()});
}


export function showSuccessMessage(successMessage,component) {
  console.info(successMessage);
  component.$Notice.success({title:successMessage.toString(),desc:successMessage.toString()});
}

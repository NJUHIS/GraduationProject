import $ from "jquery";
function register(route) {
  route.push("/register")
}

function checkperson(route) {
  route.push("/personinformation")
}

function checkcases(route) {
  route.push("/checkcases")
}
//根据病人ID获取所有的历史病例
function getallcases(id,self) {

}

export {
  register,
  checkperson,
  checkcases
}

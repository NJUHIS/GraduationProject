<template>

  <div id="rootPane">
    <div id="leftPane">
      <i-table highlight-row :columns="prescriptionListColumns" :data="prescriptionList" @on-row-click="showDrugList"></i-table>
    </div>
    <div id="rightPane">
      <strong>处方主键 ID ：{{prescription.id}} &nbsp 处方名称：{{prescription.prescriptionName}} </strong>
      <br>
      <Button type="primary" @click="dispenseMedicine">药品已发</Button>
      <i-table :columns="drugListColumns" :data="prescription.prescriptionDetailedList"></i-table>
    </div>
  </div>

</template>

<script>
    import * as GungRegistrationCommunicator from "../gung_communicators/GungRegistrationCommunicator";
    import * as GungUtilities from "../GungUtilities";
    import * as GungPersonalInformationCommunicator from "../gung_communicators/GungPersonalInformationCommunicator";
    import * as GungDoctorCommunicator from "../gung_communicators/GungDoctorCommunicator"
    import * as GungBasicInformationCommunicator from "../gung_communicators/GungBasicInformationCommunicator"
    import * as GungPharmacyCommunicator from "../gung_communicators/GungPharmacyCommunicator"

    export default {
      name: "GungMedicineDispensing",
      data () {
        return {
          prescriptionListColumns:[
            {
              title: '处方列表',
              render:(h,params) => {
                let prescriptionName=params.row.prescriptionName;
                if(params.row.prescriptionName==null){
                  prescriptionName="";
                }
                return h('p',params.row.id.toString()+"  "+prescriptionName)
              }
            }
          ],
          drugListColumns:[
            {
              title: '药品主键 ID',
              render:(h,params) => {
                return h('p',params.row.drugs.id.toString())
              }
            },
            {
              title: '药品名称',
              render:(h,params) => {
                return h('p',params.row.drugs.drugsName)
              }
            },
            {
              title: '用法',
              render:(h,params) => {
                return h('p',params.row.useage)
              }
            },
            {
              title: '频次',
              render:(h,params) => {
                return h('p',params.row.frequency)
              }
            }
          ],

          prescriptionList:[],
          prescription:""
        };
      },

      mounted() {
        this.init();
      },
      methods:{
        async init(){
          try {
            let response = await GungDoctorCommunicator.getPrescriptionsByConditions(null,3);
            GungUtilities.showSuccessMessage("處方列表加載成功",response, this);

            this.prescriptionList = response.data;
            if(this.prescriptionList!=null&&this.prescriptionList.length>0){
              this.prescription=this.prescriptionList[0];
            }

          } catch (error) {
            GungUtilities.showErrorMessage("處方列表加載失敗",error, this);
          }

        },
        showDrugList(data){
          this.prescription=data;
        },
        async dispenseMedicine(){
          try {
            let response = await GungPharmacyCommunicator.dispenseMedicine(this.prescription.id);
            GungUtilities.showSuccessMessage("發藥成功",response, this);
          } catch (error) {
            GungUtilities.showErrorMessage("發藥失敗",error, this);
          }
          this.init();

        }


      },
      watch: {
        // // 如果路由有变化，会再次执行该方法
        "$route": "init"
      }

    }
</script>

<style scoped>

  #leftPane{
    float:left;
    width:30%;
    height: 100vh;
    background-color: rgb(235, 235, 235);
    overflow: auto;
  }

  #rightPane{
    float:left;
    width: 70%;
    height: 100vh;
    overflow: auto;
  }

</style>

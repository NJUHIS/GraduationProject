<template>

  <div id="rootPane">
    <div class="listPane">
      <p>等待发药</p>
      <i-table :columns="prescriptionListColumns" :data="prescriptionList" @on-row-click="showDrugList"></i-table>
    </div>
    <div class="listPane">
      <p>已发药</p>
      <i-table :columns="prescriptionListColumns" :data="prescriptionListDispensed"
               @on-row-click="showDrugList"></i-table>
    </div>

    <div class="listPane">
      <p>已退药</p>
      <i-table :columns="prescriptionListColumns" :data="prescriptionListReturned"
               @on-row-click="showDrugList"></i-table>
    </div>
    <div id="rightPane">
      <strong class="idTitle">处方主键 ID ：{{prescription.id}} &nbsp 处方名称：{{prescription.prescriptionName}} </strong>
      <br><br>
      <Button @click="dispenseMedicine" type="primary"
              v-show="prescription.id!=null&&prescription.prescriptionState===3">确认药品已发
      </Button>
      <Button @click="returnMedicine" type="primary" v-show="prescription.id!=null&&prescription.prescriptionState===4">
        确认药品已退
      </Button>
      <br><br>
      <i-table :columns="prescriptionDetailColumns" :data="prescription.prescriptionDetailedList"></i-table>
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
  import prescption from "../../components/doctor/prescption/prescption";

  export default {
    name: "GungMedicineDispensing",
    data() {
      return {
        prescriptionListColumns: [
          {
            title: '处方列表',
            render: (h, params) => {
              let prescriptionName = params.row.prescriptionName;
              if (params.row.prescriptionName == null) {
                prescriptionName = "";
              }
              return h('p', params.row.id.toString() + "  " + prescriptionName)
            }
          }
        ],
        prescriptionDetailColumns: [
          {
            title: '药品主键 ID',
            render: (h, params) => {
              return h('p', params.row.drugs.id.toString())
            }
          },
          {
            title: '药品名称',
            render: (h, params) => {
              return h('p', params.row.drugs.drugsName)
            }
          },
          {
            title: '用法',
            render: (h, params) => {
              return h('p', params.row.useage)
            }
          },
          {
            title: '频次',
            render: (h, params) => {
              return h('p', params.row.frequency)
            }
          },
          {
            title: '数量',
            render: (h, params) => {
              return h('p', params.row.quantity)
            }
          }
        ],

        prescriptionList: [],
        prescriptionListDispensed: [],
        prescriptionListReturned: [],
        prescription: {}
      };
    },

    mounted() {
      this.init();
    },
    methods: {
      async init() {
        try {
          let response = await GungDoctorCommunicator.getPrescriptionsByConditions(null, 3);
          GungUtilities.showSuccessMessage("處方列表加載成功", response, this);
          this.prescriptionList = response.data;

          if (this.prescription.id == null) {
            if (this.prescriptionList != null && this.prescriptionList.length > 0) {
              this.prescription = this.prescriptionList[0];
            }
          } else {
            try {
              let response = await GungDoctorCommunicator.getPrescriptionById(this.prescription.id);
              GungUtilities.showSuccessMessage("處方獲取成功", response, this);
              this.prescription = response.data;
            } catch (error) {
              GungUtilities.showErrorMessage("處方獲取失敗", error, this);
            }
          }

          response = await GungDoctorCommunicator.getPrescriptionsByConditions(null, 4);
          GungUtilities.showSuccessMessage("已發藥處方列表加載成功", response, this);
          this.prescriptionListDispensed = response.data;

          response = await GungDoctorCommunicator.getPrescriptionsByConditions(null, 5);
          GungUtilities.showSuccessMessage("已退藥處方列表加載成功", response, this);
          this.prescriptionListReturned = response.data;

        } catch (error) {
          GungUtilities.showErrorMessage("處方列表加載失敗", error, this);
        }

      },
      showDrugList(data) {
        this.prescription = data;
      },
      async dispenseMedicine() {
        try {
          let response = await GungPharmacyCommunicator.dispenseMedicine(this.prescription.id);
          GungUtilities.showSuccessMessage("發藥成功", response, this);
          this.prescription = response.data;
        } catch (error) {
          GungUtilities.showErrorMessage("發藥失敗", error, this);
        }
        this.init();

      },
      async returnMedicine() {
        try {
          let response = await GungPharmacyCommunicator.returnMedicine(this.prescription.id);
          GungUtilities.showSuccessMessage("退藥成功", response, this);
          this.prescription = response.data;
        } catch (error) {
          GungUtilities.showErrorMessage("退藥失敗", error, this);
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

  .listPane {
    float: left;
    width: 13%;
    height: 100vh;
    background-color: rgb(235, 235, 235);
    overflow: auto;
  }

  #rightPane {
    margin: 20px 20px;
    float: left;
    width: 52%;
    height: 100vh;
    overflow: auto;
  }

  .idTitle {
    font-size: large;
  }

</style>

<template>

  <div id="rootPane">
    <div class="listPane">
      <p>等待執行</p>
      <i-table :columns="testExaminationDisposalListColumns" :data="testExaminationDisposalList" @on-row-click="showTestExaminationDisposalDetailList"
               highlight-row></i-table>
    </div>
    <div class="listPane">
      <p>正在执行</p>
      <i-table :columns="testExaminationDisposalListColumns" :data="testExaminationDisposalListExecuting" @on-row-click="showTestExaminationDisposalDetailList"
               highlight-row></i-table>
    </div>
    <div class="listPane">
      <p>已完成</p>
      <i-table :columns="testExaminationDisposalListColumns" :data="testExaminationDisposalListFinished" @on-row-click="showTestExaminationDisposalDetailList"
               highlight-row></i-table>
    </div>
    <div id="rightPane" v-show="testExaminationDisposal.id!=null">

      <strong class="idTitle">检查检验或处置主键 ID ：{{testExaminationDisposal.id}} </strong><br><br>
      <strong class="idTitle">检查检验或处置主键明细 ID ：{{testExaminationDisposalDetail.id}} </strong>
      <br><br>
      <p>结果：</p>
      <Input :rows="3" placeholder="请输入..." type="textarea"
             v-if="testExaminationDisposalDetail.id!=null&&testExaminationDisposalDetail.state!==4"
             v-model="testExaminationDisposalDetail.result"></Input>
      <p v-else-if ="testExaminationDisposalDetail.id!=null" > {{testExaminationDisposalDetail.result}}</p>
      <br><br>
      <div v-show="testExaminationDisposalDetail.id!=null&&testExaminationDisposalDetail.state!==4">
      <Button :disabled="testExaminationDisposalDetail.id==null||testExaminationDisposalDetail.state===4" @click="updateCheckDetailed"
              type="primary">保存结果
      </Button>
      <Button :disabled="testExaminationDisposalDetail.id==null||testExaminationDisposalDetail.state!==1" @click="startCheckDetailed"
              type="primary">开始
      </Button>
      <Button :disabled="testExaminationDisposalDetail.id==null||testExaminationDisposalDetail.state!==2" @click="finishCheckDetailed"
              type="primary">结束
      </Button>
      <Button :disabled="testExaminationDisposalDetail.id==null||testExaminationDisposalDetail.state!==3" @click="reportCheckDetailed"
              type="primary">完成并报告
      </Button>
        <br><br>
      </div>
      <i-table :columns="testExaminationDisposalDetailListColumns" :data="testExaminationDisposal.checkDetailedList"
               @on-row-click="showTestExaminationDisposalDetail"></i-table>
    </div>
  </div>
</template>

<script>
  import * as GungRegistrationCommunicator from "../gung_communicators/GungRegistrationCommunicator";
  import * as GungPersonalInformationCommunicator from "../gung_communicators/GungPersonalInformationCommunicator";
  import * as GungDoctorCommunicator from "../gung_communicators/GungDoctorCommunicator"
  import * as GungUtilities from "../GungUtilities";
  import * as GungBasicInformationCommunicator from "../gung_communicators/GungBasicInformationCommunicator"
  import * as GungMedicalTechnologyCommunicator from "../gung_communicators/GungMedicalTechnologyCommunicator"

  export default {
    name: "GungTestExaminationDisposalExecution",
    data() {
      return {
        GungUtilities,
        testExaminationDisposalListColumns: [
          {
            title: '检查检验或处置列表',
            render: (h, params) => {
              return h('p', params.row.id)
            }
          }
        ],
        testExaminationDisposalDetailListColumns: [
          {
            title: '检查检验或处置明细主键 ID',
            key: "id"
          },
          {
            title: '目的和要求',
            key: "position"
          },
          {
            title: '项目名称',
            render: (h, params) => {
              return h('p', params.row.fmedItem.itemname)
            }
          },
          {
            title: '价格',
            render: (h, params) => {
              return h('p', params.row.fmedItem.price)
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              return h('p', this.GungUtilities.translateTestExaminationDisposalDetailState(params.row.state))
            }
          },
          {
            title: '结果',
            render: (h, params) => {
              return h('p', params.row.result)
            }
          }
        ],
        testExaminationDisposalList: [],
        testExaminationDisposal: {},
        testExaminationDisposalDetail: {},
        testExaminationDisposalListFinished: [],
        testExaminationDisposalListExecuting: [],
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        try {
          let response = await GungDoctorCommunicator.getCheckAppliesByConditions(null, 3);
          GungUtilities.showSuccessMessage("檢查檢驗和處置列表加載成功", response, this);
          this.testExaminationDisposalList = response.data;


          if (this.testExaminationDisposal.id == null) {
            if (this.testExaminationDisposalList != null && this.testExaminationDisposalList.length > 0) {
              this.testExaminationDisposal = this.testExaminationDisposalList[0];
            }
          } else {
            try {
              let response = await GungDoctorCommunicator.getCheckApplyById(this.testExaminationDisposal.id);
              GungUtilities.showSuccessMessage("檢查檢驗或處置獲取成功", response, this);
              this.testExaminationDisposal = response.data;
            } catch (error) {
              GungUtilities.showErrorMessage("檢查檢驗或處置獲取失敗", error, this);
            }
          }

          if (this.testExaminationDisposal.id != null) {
            if (this.testExaminationDisposalDetail.id == null) {
              if (this.testExaminationDisposal.checkDetailedList != null && this.testExaminationDisposal.checkDetailedList.length > 0) {
                this.testExaminationDisposalDetail = this.testExaminationDisposal.checkDetailedList[0];
              }
            } else {
              try {
                let response = await GungDoctorCommunicator.getCheckDetailedById(this.testExaminationDisposalDetail.id);
                GungUtilities.showSuccessMessage("檢查檢驗或處置明細獲取成功", response, this);
                this.testExaminationDisposalDetail = response.data;
              } catch (error) {
                GungUtilities.showErrorMessage("檢查檢驗或處置明細獲取失敗", error, this);
              }
            }
          }

          response = await GungDoctorCommunicator.getCheckAppliesByConditions(null, 4);
          GungUtilities.showSuccessMessage("正在執行檢查檢驗和處置列表加載成功", response, this);
          this.testExaminationDisposalListExecuting = response.data;

          response = await GungDoctorCommunicator.getCheckAppliesByConditions(null, 5);
          GungUtilities.showSuccessMessage("已完成檢查檢驗和處置列表加載成功", response, this);
          this.testExaminationDisposalListFinished = response.data;


        } catch (error) {
          GungUtilities.showErrorMessage("檢查檢驗和處置列表加載失敗", error, this);
        }
      },
      showTestExaminationDisposalDetailList(data) {
        this.testExaminationDisposal = data;
        if (this.testExaminationDisposal.checkDetailedList != null && this.testExaminationDisposal.checkDetailedList.length > 0) {
          this.testExaminationDisposalDetail = this.testExaminationDisposal.checkDetailedList[0];
        }
      },
      showTestExaminationDisposalDetail(data) {
        this.testExaminationDisposalDetail = data;
      },
      async updateCheckDetailed() {
        try {
          let response = await GungDoctorCommunicator.updateCheckDetailed(this.testExaminationDisposalDetail);
          GungUtilities.showSuccessMessage("檢查檢驗或處置明細更新成功", response, this);
          this.testExaminationDisposalDetail = response.data;
          this.init();
        } catch (error) {
          GungUtilities.showErrorMessage("檢查檢驗或處置明細更新失敗", error, this);
        }
      },
      async startCheckDetailed() {
        try {
          let response = await GungMedicalTechnologyCommunicator.startCheckDetailed(this.testExaminationDisposalDetail.id);
          GungUtilities.showSuccessMessage("開始檢查檢驗或處置明細更新成功", response, this);
          this.testExaminationDisposalDetail = response.data;
          this.init();
        } catch (error) {
          GungUtilities.showErrorMessage("開始檢查檢驗或處置明細更新失敗", error, this);
        }
      },
      async finishCheckDetailed() {
        try {
          let response = await GungMedicalTechnologyCommunicator.finishCheckDetailed(this.testExaminationDisposalDetail.id);
          GungUtilities.showSuccessMessage("結束檢查檢驗或處置明細更新成功", response, this);
          this.testExaminationDisposalDetail = response.data;
          this.init();
        } catch (error) {
          GungUtilities.showErrorMessage("結束檢查檢驗或處置明細更新失敗", error, this);
        }
      },
      async reportCheckDetailed() {
        try {
          let response = await GungMedicalTechnologyCommunicator.reportCheckDetailed(this.testExaminationDisposalDetail.id);
          GungUtilities.showSuccessMessage("報告檢查檢驗或處置明細更新成功", response, this);
          this.testExaminationDisposalDetail = response.data;
          this.init();
        } catch (error) {
          GungUtilities.showErrorMessage("報告檢查檢驗或處置明細更新失敗", error, this);
        }
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
    width: 10%;
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

<template>
  <div>
    <div>

      <GungWorkflowNavigation v-bind:activeName=this.$options.name
                              v-bind:workflowId="$route.query.registrationId"></GungWorkflowNavigation>

      <div>
        <div>
          <Button :disabled="registration.visitstate!==1" @click="addTestExaminationDisposal">新增检查检验或处置</Button>
        </div>
        <div class="listPane">
          <p>编辑中</p>
          <i-table :columns="testExaminationDisposalListColumns" :data="testExaminationDisposalListEditing"
                   @on-row-click="showTestExaminationDisposalDetailList"></i-table>
        </div>
        <div class="listPane">
          <p>已确认且未有报告</p>
          <i-table :columns="testExaminationDisposalListColumns" :data="testExaminationDisposalListNotReported"
                   @on-row-click="showTestExaminationDisposalDetailList"></i-table>
        </div>
        <div class="listPane">
          <p>报告已出</p>
          <i-table :columns="testExaminationDisposalListColumns" :data="testExaminationDisposalListReported"
                   @on-row-click="showTestExaminationDisposalDetailList"></i-table>
        </div>
      </div>
    </div>
    <div class="rightPane" v-show="testExaminationDisposal.id!=null">
      <strong class="idTitle">挂号主键 ID : {{registration.id}}</strong><br><br>
      <strong class="idTitle">检查检验或处置主键 ID ：{{testExaminationDisposal.id}} </strong><br><br>
      <strong class="idTitle">检查检验或处置主键明细 ID ：{{testExaminationDisposalDetail.id}} </strong><br><br>
      <p v-show="testExaminationDisposalDetail.id!=null&&testExaminationDisposalDetail.state===4">
        结果：{{testExaminationDisposalDetail.result}}</p>
      <br><br>


      <i-table :columns="testExaminationDisposalDetailListColumns" :data="testExaminationDisposal.checkDetailedList"
               @on-row-click="showTestExaminationDisposalDetail"></i-table>
      <Form v-show="(testExaminationDisposal.state===1)">
        <FormItem label="检查检验或处置：">
          <Select v-model="newTestExaminationDisposalDetail.checkprojid">
            <Option v-bind:key="index" v-bind:value="item.id" v-for="(item,index) in allNonDrugItems">{{ item.itemname
              }}
            </Option>
            <!--          这里 value 对应 上面的 v-model-->
          </Select>
        </FormItem>
        <FormItem label="目的和要求">
          <Input placeholder="请输入..." type="text" v-model="newTestExaminationDisposalDetail.position"></Input>
        </FormItem>
        <!--        <FormItem label="频次">-->
        <!--          <Input  v-model="prescriptionDetailed.frequency" type="text" placeholder="请输入..."></Input>-->
        <!--        </FormItem>-->
        <FormItem>
          <Button
            :disabled="newTestExaminationDisposalDetail.checkprojid==null||newTestExaminationDisposalDetail.checkprojid===''"
            @click="addTestExaminationDisposalDetail" type="primary">确认添加
          </Button>
        </FormItem>
        <FormItem>
          <Button
            :disabled="registration.visitstate!==1||testExaminationDisposal==null||testExaminationDisposal.checkDetailedList==null||testExaminationDisposal.checkDetailedList.length<1"
            @click="confirmCheckApply" type="primary">确认开出
          </Button>
        </FormItem>

      </Form>

    </div>
  </div>


</template>

<script>
  import GungWorkflowNavigation from "./GungWorkflowNavigation";
  import * as GungDoctorCommunicator from "../gung_communicators/GungDoctorCommunicator";
  import * as GungUtilities from "../GungUtilities";
  import * as GungRegistrationCommunicator from "../gung_communicators/GungRegistrationCommunicator";
  import * as GungBasicInformationCommunicator from "../gung_communicators/GungBasicInformationCommunicator";

  export default {
    data() {
      return {
        newTestExaminationDisposalDetail: {
          checkappid: null,
          checkprojid: null,
          identification: 1,
          position: null
        },
        GungUtilities,
        allNonDrugItems: [],
        registration: {},
        registrationId: "",
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
        testExaminationDisposalListEditing: [],
        testExaminationDisposal: {},
        testExaminationDisposalDetail: {},
        testExaminationDisposalListNotReported: [],
        testExaminationDisposalListReported: [],
      }
    },
    name: "GungTestExaminationDisposal",
    components: {
      GungWorkflowNavigation
    },
    mounted() {
      this.init();
    },
    methods: {
      showTestExaminationDisposalDetail(data) {
        this.testExaminationDisposalDetail = data;
      },
      showTestExaminationDisposalDetailList(data) {
        this.testExaminationDisposal = data;
        if (this.testExaminationDisposal.checkDetailedList != null && this.testExaminationDisposal.checkDetailedList.length > 0) {
          this.testExaminationDisposalDetail = this.testExaminationDisposal.checkDetailedList[0];
        }
      },
      async addTestExaminationDisposal() {
        let newTestExaminationDisposal = {
          medicalId: this.registration.id
        };
        try {
          let response = await GungDoctorCommunicator.addCheckApply(newTestExaminationDisposal);
          GungUtilities.showSuccessMessage("檢查檢驗或處置添加成功", response, this);
          this.testExaminationDisposal = response.data;
          this.init();
        } catch (error) {
          GungUtilities.showErrorMessage("檢查檢驗或處置添加失敗", error, this);

        }
      },
      async addTestExaminationDisposalDetail() {
        this.newTestExaminationDisposalDetail.checkappid = this.testExaminationDisposal.id;
        try {
          let response = await GungDoctorCommunicator.addCheckDetailed(this.newTestExaminationDisposalDetail);
          GungUtilities.showSuccessMessage("檢查檢驗或處置明細添加成功", response, this);
          this.testExaminationDisposalDetail = response.data;
          this.init();
          this.newTestExaminationDisposalDetail.checkprojid = null;
          this.newTestExaminationDisposalDetail.position = null;
        } catch (error) {
          GungUtilities.showErrorMessage("檢查檢驗或處置明細添加失敗", error, this);

        }
      },
      async confirmCheckApply() {
        try {
          let response = await GungDoctorCommunicator.confirmCheckApply(this.testExaminationDisposal.id);
          GungUtilities.showSuccessMessage("檢查檢驗或處置確認開立成功", response, this);
          this.testExaminationDisposal = response.data;
          this.init();
        } catch (error) {
          GungUtilities.showErrorMessage("檢查檢驗或處置確認開立失敗", error, this);

        }
      },


      async init() {
        try {
          this.registrationId = this.$route.query.registrationId;

          try {
            let response = await GungRegistrationCommunicator.getRegistrationById(this.registrationId);
            GungUtilities.showSuccessMessage("掛號加載成功", response, this);
            this.registration = response.data;
          } catch (error) {
            GungUtilities.showErrorMessage("掛號加載失敗", error, this);
            return;

          }


          let response = await GungDoctorCommunicator.getCheckAppliesByConditions(null, 1, this.registrationId);
          GungUtilities.showSuccessMessage("編輯中檢查檢驗和處置列表加載成功", response, this);
          this.testExaminationDisposalListEditing = response.data;


          if (this.testExaminationDisposal.id == null) {
            if (this.testExaminationDisposalListEditing != null && this.testExaminationDisposalListEditing.length > 0) {
              this.testExaminationDisposal = this.testExaminationDisposalListEditing[0];
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

          response = await GungDoctorCommunicator.getCheckAppliesByConditions(null, 2, this.registrationId);
          GungUtilities.showSuccessMessage("已確認檢查檢驗和處置列表加載成功", response, this);
          this.testExaminationDisposalListNotReported = response.data;

          response = await GungDoctorCommunicator.getCheckAppliesByConditions(null, 3, this.registrationId);
          GungUtilities.showSuccessMessage("已收費檢查檢驗和處置列表加載成功", response, this);
          this.testExaminationDisposalListNotReported = this.testExaminationDisposalListNotReported.concat(response.data);

          response = await GungDoctorCommunicator.getCheckAppliesByConditions(null, 4, this.registrationId);
          GungUtilities.showSuccessMessage("等待報告檢查檢驗和處置列表加載成功", response, this);
          this.testExaminationDisposalListNotReported = this.testExaminationDisposalListNotReported.concat(response.data);

          response = await GungDoctorCommunicator.getCheckAppliesByConditions(null, 5, this.registrationId);
          GungUtilities.showSuccessMessage("已報告檢查檢驗和處置列表加載成功", response, this);
          this.testExaminationDisposalListReported = response.data;

        } catch (error) {
          GungUtilities.showErrorMessage("檢查檢驗和處置列表加載失敗", error, this);
        }

        try {
          let response = await GungBasicInformationCommunicator.getAllFmedItems();
          GungUtilities.showSuccessMessage("獲取所有非藥品項目成功", response, this);
          this.allNonDrugItems = response.data;
        } catch (error) {
          GungUtilities.showErrorMessage("獲取所有非藥品項目失敗", error, this);
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


  .idTitle {
    font-size: large;
  }

  .rightPane {
    margin: 20px 20px;
    float: left;
    width: 65%;
    height: 100vh;
    overflow: auto;
  }

</style>

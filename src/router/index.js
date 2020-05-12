import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import PersonInformation from '@/components/patient/personinformation/personinformation.vue'
import Register from '@/components/patient/register/register.vue'
import checkcases from '@/components/patient/cases/cases.vue'
import Doctor from '@/components/doctor/personinformation/personinformation.vue'
import Admit from '@/components/doctor/acceptregister/acceptregister.vue'
import Diagnose from '@/components/doctor/diagnose/diagnose.vue'
import During from '@/components/doctor/cases/cases.vue'
import Adddoctor from '@/components/admin/adddoctor/adddoctor.vue'
import Adddept from '@/components/admin/adddepartment/adddepartment.vue'
import Addschedule from '@/components/admin/addschedule/addschedule.vue'
import Adddisease from '@/components/admin/adddisease/adddisease.vue'
import Addregisterlevel from '@/components/admin/addregisterlevel/addregisterlevel.vue'
import Addsettlecategory from '@/components/admin/addsettlecategory/addsettlecategory.vue'
import prescption from '@/components/doctor/prescption/prescption.vue'
import Checkapply from '@/components/doctor/checkapply/checkapply.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/personinformation',
      name: 'personinformation',
      component: PersonInformation
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path:"/checkcases",
      name:"checkcases",
      component:checkcases
    },
    {
      path:"/doctor",
      name:"doctor",
      component:Doctor
    },
    {
      path:"/admit",
      name:"admit",
      component:Admit
    },
    {
      path:"/diagnose",
      name:"diagnose",
      component:Diagnose
    },
    {
      path:"/during",
      name:"during",
      component:During
    },
    {
      path:"/prescption",
      name:"prescption",
      component:prescption
    },
    {
      path:"/checkapply",
      name:"checkapply",
      component:Checkapply
    },
    {
      path:"/adddoctor",
      name:"adddoctor",
      component:Adddoctor
    },
    {
      path:"/adddept",
      name:"adddept",
      component:Adddept
    },
    {
      path:"/addschedule",
      name:"addschedule",
      component:Addschedule
    },
    {
      path:"/adddisease",
      name:"adddisease",
      component:Adddisease
    },
    {
      path:"/addregisterlevel",
      name:"addregisterlevel",
      component:Addregisterlevel
    },
    {
      path:"/addsettlecategory",
      name:"addsettlecategory",
      component:Addsettlecategory
    }
  ]
})

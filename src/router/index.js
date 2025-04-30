import { createWebHistory, createRouter } from "vue-router"
import { isAuthenticated } from "../auth"

import SignIn from "@/views/SignIn.vue"
import DashBoard from "@/views/DashBoard.vue"
import CustomerList from "../components/CustomerList.vue"
import CustomerDetails from "../components/CustomerDetails.vue"
import PriceConfig from "../views/PriceConfig.vue"
import PromoConfig from "../views/PromoConfig.vue"
import Xtremeplan from "../views/Xtremeplan.vue"
import SMEplan from "../views/SMEplan.vue"
import AddPlans from "../components/AddPlans.vue"
import AddPlanSME from "../views/AddPlanSME.vue"
import AddPlanXtreme from "../views/AddPlanXtreme.vue"
import Agent from "../components/Agent.vue"
import PlanStatus from "../views/PlanStatus.vue"
import DiscountList from "../components/DiscountList.vue"
import AddPromo from "../views/AddPromo.vue"


const routes = [
    {
        path: "/",
        name: "Signin",
        component: SignIn,
    },
    {
        path: '/dashboard',
        name: "Dashboard",
        component: DashBoard,
        meta: { requiresAuth: true }
    },
    {
        path: '/customerslist',
        name: "CustomerList",
        component: CustomerList,
        meta: { requiresAuth: true }
    },
    {
        path: '/priceconfig',
        name: "priceconfig",
        component: PriceConfig,
        meta: { requiresAuth: true }
    },
    {
        path: '/promoconfig',
        name: "promoconfig",
        component: PromoConfig,
        meta: { requiresAuth: true }
    },
    {
        path: '/planedit',
        name: "planedit",
        component: AddPromo,
        meta: { requiresAuth: true }
    },
    {
        path: '/xtremeplan',
        name: "xtremeplan",
        component: Xtremeplan,
        meta: { requiresAuth: true }
    },
    {
        path: '/discountlist',
        name: "discountlist",
        component: DiscountList,
        meta: { requiresAuth: true }
    },
    {
        path: '/smeplan',
        name: "smeplan",
        component: SMEplan,
        meta: { requiresAuth: true }
    },
    {
        path: '/customerDetails/:orderId',
        name: "CustomerDetails",
        component: CustomerDetails,
        meta: { requiresAuth: true }
    },
    {
        path: '/newplanresidential',
        name: "AddPlans",
        component: AddPlans,
        meta: { requiresAuth: true }
    },
    {
        path: '/newplanxtremeplan',
        name: "AddPlanXtreme",
        component: AddPlanXtreme,
        meta: { requiresAuth: true }
    },
    {
        path: '/newplansmeplan',
        name: "AddPlanSME",
        component: AddPlanSME,
        meta: { requiresAuth: true }
    },
    {
        path: '/agent',
        name: "Agent",
        component: Agent,
        meta: { requiresAuth: true }
    },
    {
        path: '/planstatus',
        name: "PlanStatus",
        component: PlanStatus,
        meta: { requiresAuth: true }
    }


]



const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated()) {
            next({
                path: '/',
                query: { redirect: to.fullPath } // Preserve the original destination
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router

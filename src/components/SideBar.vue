<template>
    <img style="width:30px;" src="/logo.png" alt="" class="logo">
    <div class="main">
        <p>ADMIN</p>
        <router-link :to="{ name: 'Dashboard' }" class="rlinks" :class="{ 'active-link': $route.name === 'Dashboard' }">
            <el-icon>
                <HomeFilled />
            </el-icon>
            <p2 class="sidetext">Dashboard</p2>
        </router-link>
        <router-link :to="{ name: 'CustomerList' }" class="rlinks"
            :class="{ 'active-link': $route.name === 'CustomerList' || $route.name === 'CustomerDetails' }">
            <el-icon>
                <Guide />
            </el-icon>
            <p2 class="sidetext">Customer's List</p2>
        </router-link>

        <router-link :to="{ name: 'discountlist' }" class="rlinks"
            :class="{ 'active-link': $route.name === 'discountlist' }">
            <el-icon>
                <List />
            </el-icon>
            <p2 class="sidetext">Discount List</p2>
        </router-link>

        <router-link :to="{ name: 'priceconfig' }" class="rlinks"
            :class="{ 'active-link': $route.name === 'priceconfig' || $route.name === 'promoconfig' || $route.name === 'smeplan' || $route.name === 'xtremeplan' || $route.name === 'planedit' }">
            <el-icon>
                <Coin />
            </el-icon>
            <p2 class="sidetext">Price Config</p2>
        </router-link>

        <router-link :to="{ name: 'PlanStatus' }" class="rlinks"
            :class="{ 'active-link': $route.name === 'PlanStatus' }">
            <el-icon>
                <Flag />
            </el-icon>
            <p2 class="sidetext">Plan List</p2>
        </router-link>

        <router-link :to="{ name: 'AddPlans' }" class="rlinks"
            :class="{ 'active-link': $route.name === 'AddPlans' || $route.name === 'AddPlanSME' || $route.name === 'AddPlanXtreme' || $route.name === 'addpromo' }">
            <el-icon>
                <CirclePlus />
            </el-icon>
            <p2 class="sidetext">Add Plans</p2>
        </router-link>

        <router-link :to="{ name: 'Agent' }" class="rlinks" :class="{ 'active-link': $route.name === 'Agent' }">
            <el-icon>
                <UserFilled />
            </el-icon>
            <p2 class="sidetext">Agent</p2>
        </router-link>

        <router-link :to="{ name: 'Signin' }" class="rlinks" :class="{ 'active-link': $route.name === 'Signin' }"
            @click.native.prevent="signOut">
            <el-icon>
                <Close />
            </el-icon>
            <p2 class="sidetext">Sign Out</p2>
        </router-link>
    </div>
</template>

<script>
import { cab } from "@/store/storage";

export default {
    data() {
        return {
            showDropdown: false
        };
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },

        signOut() {
            console.log('Signing out...');
            cab.setEmail('');
            cab.setName('');
            localStorage.removeItem('jwt_token');
            this.$router.push({ name: 'Signin' });
        }
    }
}
</script>

<style scoped>
.logo {
    margin-left: 60px;
    position: fixed;
    height: 20px;
    width: 60px;
    margin-top: 10px;
}

.dropdown-toggle i {
    float: right;
    color: white;
}

.main {
    background-color: #383F51;
    align-items: center;
    padding: 0px 50px 50px 0px;
    position: fixed;
    margin-top: 37px;
    height: 100%;
    width: 30vh;
}

.main p {
    color: #FFFFFF;
    font-family: 'Roboto';
    font-size: 10px;
    line-height: 18px;
    margin: 10px;
    padding: 0px 0px 0px 9px;
}

.sidetext {
    font-size: 13px;
    font-family: 'Roboto';
    line-height: 18px;
    padding: 0px 0px 0px 15px;
}

button {
    color: #FFFFFF;
    font-size: 14px;
    align-items: center;
    background: none;
    cursor: pointer;
    width: 17vw;
    border: none;
}

.rlinks {
    color: #FFFFFF;
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 6vh;
    padding: 0px 0px 0px 17px;
    /* margin: 0px 0px 0px 0px; */

}


.active-link {
    background: blue;
    color: white;
    height: 6vh;
    width: 14vw;
    border-radius: 0px 30px 30px 0px;
    margin: 2px 0px 0px 0px;
}

.dropdown-toggle,
.dropdown-item {
    color: #FFFFFF;
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 6vh;
    padding: 0px 0px 0px 17px;
}

.dropdown-menu {
    margin-left: 20px;
    font-size: 8px;
}



.dropdown-item {
    display: block;
    padding: 10px;
    color: white;
    text-decoration: none;
    height: 6vh;
    width: 17vw;
    font-size: 12px;

}

.dropdown-item:hover {
    background-color: blue;
    border-radius: 0px 30px 30px 0px;
    width: 10vw;

}


.rlinks span {
    padding: 0px 0px 0px 10px;
}

.active-priceconfig {
    background: blue;
    color: white;
    height: 6vh;
    width: 10vw;
    border-radius: 0px 30px 30px 0px;
    margin: 2px 0px 0px 0px;
}

.active-dashboard {
    background: blue;
    color: white;
    height: 6vh;
    width: 10vw;
    border-radius: 0px 30px 30px 0px;
    margin: 2px 0px 0px 0px;
}

.active-customerslist {
    background: blue;
    color: white;
    height: 6vh;
    width: 10vw;
    border-radius: 0px 30px 30px 0px;
    margin: 2px 0px 0px 0px;
}

@media (min-width: 768px) and (max-width: 992px) {

    .logo {
        height: 30px;
        width: 40px;
        margin-left: 40px;
        margin-top: 5px;
    }

    .main {
        height: 100%;
        width: 15vw;
    }

    .admin {
        font-size: 20px;
    }

    .side {
        font-size: 40px;
    }

}



@media (min-width: 481px) and (max-width: 767px) {
    .logo {
        height: 30px;
        width: 40px;
        margin-left: 20px;
    }


    .admin {
        font-size: 14px;
    }

    .side {
        font-size: 10px;
    }

    .main {
        height: 100%;
        width: 16vw;

    }

    .dropdown-toggle,
    .dropdown-item {
        color: #FFFFFF;
        font-family: 'Roboto';
        font-size: 10px;
        line-height: 8px;
        padding: 0px 0px 0px 15px;
    }

    .sidetext {
        font-size: 8px;
        padding: 0px 0px 0px 2px;

    }
}

@media (max-width: 480px) {
    .logo {
        height: 20px;
        width: 30px;
        margin-left: 13px;
        margin-top: 8px;
    }

    .sidetext {
        font-size: 6px;
        padding: 0px 0px 0px 1px;

    }

    .admin {
        font-size: 10px;
    }

    .side {
        font-size: 10px;
    }

    .main {
        height: 100%;
        width: 15vw;

    }

    .dropdown-toggle {
        font-size: 8px;
    }
}

@media (min-width: 993px) and (max-width: 1500px) {
    .main {
        height: 100%;
        width: 15vw;
    }
}
</style>
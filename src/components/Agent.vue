<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="aside" width="15vw" style="height: 100vh;">
                <SideBarVue />
            </el-aside>

            <el-container>
                <el-header>
                    <div class="box">
                        <h4>Agent List</h4>
                        <div class="inputcon">
                            <el-input class="inputs" v-model="searchInput" type="text" name="search"
                                placeholder="Search.." prefix-icon="Search"></el-input>
                        </div>
                    </div>
                    <div style="margin: 0px 0px; width: 85vw;">
                        <div style="width: 85vw; height: 7vh;">
                            <button id="agent" @click="addAgent">Add Agent</button>
                        </div>
                    </div>
                </el-header>

                <el-plan style="height: 77vh; width: 84vw; margin: 2vh 0vw 0vh 4vw; overflow-y: hidden;">
                    <el-table class="t1" :data="filteredAgents" style="height: 71.5vh;">
                        <el-table-column type="selection" width="50" label-class-name="clab"></el-table-column>
                        <el-table-column prop="name" label="Agent Name" width="300" label-class-name="clab" sortable :sort-orders="['ascending', 'descending']" />
                        <el-table-column prop="type" label="Agent Type" width="300" label-class-name="clab" sortable :sort-orders="['ascending', 'descending']" />
                        <el-table-column prop="region" label="Agent Region" width="250" label-class-name="clab" sortable :sort-orders="['ascending', 'descending']" />
                        <el-table-column>
                            <template #default="{ row }">
                                <button id="remove" @click="AgentStatus(row.userId, row.status)">
                                    {{ row.status === 'Active' ? 'Deactivate' : 'Activate' }}
                                </button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <button id="plus">
                        <el-icon @click="addAgent"><Plus /></el-icon>
                    </button>
                </el-plan>

                <el-footer style="height: 1vh;">
                    <p>© 2024, Paul Babalola Dev work.</p>
                </el-footer>

            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ElContainer, ElAside, ElIcon, ElHeader, ElInput, ElMessageBox, ElMessage } from 'element-plus'
import { ref, computed, onMounted } from 'vue';
import SideBarVue from '@/components/SideBar.vue';

name: 'Agent'

interface Agent {
    name: string;
    userId: string;
    address: string;
    region: string;
    type: string;
    status: string;
}
const agents = ref<Agent[]>([]);

onMounted(() => {
    // Using dummy data instead of API calls
    const dummyAgents = [
        { name: 'Agent 1', userId: '1', address: 'Address 1', region: 'Lagos', type: 'Paul Babalola Dev Sales Representative', status: 'Active' },
        { name: 'Agent 2', userId: '2', address: 'Address 2', region: 'Oyo', type: 'Community Retail Agents', status: 'Inactive' },
        { name: 'Agent 3', userId: '3', address: 'Address 3', region: 'Rivers', type: 'Paul Babalola Dev Sales Representative', status: 'Active' },
        { name: 'Agent 4', userId: '4', address: 'Address 4', region: 'Abuja FCT', type: 'Community Retail Agents', status: 'Inactive' },
    ];

    // Store dummy data in localStorage
    localStorage.setItem('agents', JSON.stringify(dummyAgents));
    agents.value = dummyAgents; // Set the data for display
});

const searchInput = ref('');

const filteredAgents = computed(() => {
    if (!searchInput.value) {
        return agents.value;
    }
    return agents.value.filter(agent =>
        agent.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
});

const addAgent = () => {
    const agentData = {
        name: '',
        state: '',
        address: '',
        region: ''  
    };

    const formContent = `
        <div>
            <label for="agentName">Agent Name:</label>
            <input type="text" id="agentName" required style="margin-left: 15px">
        </div>

        <div style="margin-top: 20px">
            <label for="agentType">Agent Type:</label>
            <select id="agentType" required style="margin-left: 22px">
                <option value="Paul Babalola Dev Sales Representative">Paul Babalola Dev Sales Representative</option>
                <option value="Community Retail Agents">Community Retail Agents</option>
            </select>
        </div>

        <div style="margin-top: 20px">
            <label for="agentRegion">Agent Region:</label>
            <select id="agentRegion" required style="margin-left: 13px">
                <option value="Abuja FCT">Abuja FCT</option>
                <option value="Lagos">Lagos</option>
                <option value="Oyo">Oyo</option>
                <option value="Rivers">Rivers</option>
            </select>
        </div>
    `;

    ElMessageBox.confirm(formContent, 'Add Agent', {
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        dangerouslyUseHTMLString: true,
        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                const name = document.getElementById('agentName').value.trim();
                const type = document.getElementById('agentType').value.trim();
                const region = document.getElementById('agentRegion').value.trim(); 

                if (name && type && region) {
                    agentData.name = name;
                    agentData.type = type;
                    agentData.region = region;
                    addAgentRequest(agentData).then(() => {
                        done();
                    });
                } else {
                    ElMessage.error('Please provide all the information');
                    done(false);
                }
            } else {
                done();
            }
        }
    });
};

const addAgentRequest = async (data) => {
    // Simulate adding the agent to the local list
    const newAgent = {
        name: data.name,
        userId: `${agents.value.length + 1}`, // Fake ID generation
        address: data.address || 'Unknown',
        region: data.region,
        type: data.type,
        status: 'Inactive', // Default to inactive
    };

    agents.value.push(newAgent);
    localStorage.setItem('agents', JSON.stringify(agents.value));

    ElMessage({
        type: 'success',
        message: `Agent added successfully!`
    });
};

const AgentStatus = (agentId: string, currentStatus: string) => {
    const activate = currentStatus === 'Inactive';
    updateAgentStatus(agentId, activate ? 'Active' : 'Inactive');
    const message = activate ? 'Agent activated successfully' : 'Agent deactivated successfully';
    ElMessage.success(message);
};

const updateAgentStatus = (agentId: string, newStatus: string) => {
    agents.value = agents.value.map(agent => {
        if (agent.userId === agentId) {
            agent.status = newStatus;
        }
        return agent;
    });
    localStorage.setItem('agents', JSON.stringify(agents.value));
};
</script>


<style scoped>
.common-layout {
    font-family: 'Roboto', sans-serif;
}

.el-header {
    width: 100vw;
    height: 12vh;
    padding: 0px;
    background-color: white;
}

.el-footer p {
    font-size: 12px;
    margin-top: 30px;
    line-height: 140%;
    color: black;
}

.box {
    height: 6vh;
    width: 85vw;
    background-color: white;
    display: flex;
    align-items: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}

.box h4 {
    flex: 1;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
    color: black;
}

.inputcon {
    flex: 1;
    margin: 0vh 0vw 0vh -20vw;
}

.inputs {
    height: 20px;
    width: 250px;
    border-radius: 20px;
    top: -2px;
}

#agent {
    width: 15vw;
    background-color: blue;
    color: white;
    border: 1px solid blue;
    border-radius: 50px;
    height: 6vh;
    float: right;
    margin: 2vh 1vw 0vh 0vw;
    cursor: pointer;
}

.t1 {
    height: 65vh;
    width: 79vw;
    color: #646464;
    overflow-y: auto;
}

.clab {
    font-size: 1.8vh;
    font-weight: 1200;
    color: #92daf0;
}

#remove {
    width: 6vw;
    background-color: blue;
    color: white;
    border: 1px solid blue;
    border-radius: 15px;
    font-size: 10px;
    height: 4vh;
    cursor: pointer;
    /* margin: 1vh 0vw 0vh 33vw; */
}

#plus {
    margin: 1vh 0.5vw;
    height: 4vh;
    color: blue;
    border-radius: 15px;
    border: 1px solid;
    font-size: 12px;
    background-color: rgb(255, 255, 255);
}



.el-icon {
    cursor: pointer;
}


/* .inputs {
    height: 20px;
    width: 250px;
    border-radius: 20px;
    position: relative;
    top: -2px;
    margin-left: 130px;
} */



#search {
    padding: 18px 0px 0px 90px;
}

.aside {
    width: 15vw;
}

@media (min-width: 768px) and (max-width: 1021px) {


    button {
        align-items: center;
        justify-content: center;
        margin-left: 0px;
    }

    .aside {
        width: 16vw;
    }

    .t1 {
        margin-left: -30px;
        width: 80vw;
    }

    #remove {
        width: 70px;
    }

}

@media (min-width: 481px) and (max-width: 767px) {


    .main {
        width: 83vw;
    }


    .inputs {
        margin-left: -50px;

    }

    #remove {
        width: 70px;
    }

    .aside {
        width: 16vw;
    }
}

@media (max-width: 480px) {



    .inputs {
        width: 160px;
        margin-left: -50px;
    }


    button {
        align-items: center;
        justify-content: center;
        margin-left: 0px;
    }

    .aside {
        width: 16vw;
    }

    #remove {
        width: 70px;
    }

}
</style>
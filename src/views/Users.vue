<template>
    <div>
        <h1 class="mt-5 mb-4 f00-light"> User Painel </h1> 
        <div class="Box">
            <div class="Box-row d-flex flex-items-center" v-for="user in users" :key="user.id">  
                <div class="flex-auto"> 
                    <strong> {{ user.name }} </strong>
                    <div class="text-small color-text-tertiary">
                        {{ user.email }}
                    </div>
                </div>
                <div class="flex-auto text-right mr-1"> 
                    <label class="label mr-1"> {{ process_role(user.role) }} </label>
                </div>
                <details class="details-reset details-overlay details-overlay-dark">
                    <summary class="Label Label--success" aria-haspopup="dialog" v-if="user.activate"> Enable </summary>
                    <summary class="Label Label--danger" aria-haspopup="dialog" v-if="!user.activate"> Disable </summary>

                    <details-dialog class="Box Box--overlay d-flex flex-column anim-fade-in fast">
                        <div class="Box-header">
                            <h3 class="Box-title"> Enable / Disable {{ user.name }} </h3>
                        </div>
                        <div class="overflow-auto">
                            <div class="Box-body overflow-auto">
                                <p>
                                   This action do not delete the user from the database, however {{ user.name }} will not be able to login or do any action on the system.
                                </p>
                            </div>
                            <!--
                            <ul>
                                <li class="Box-row">
                                    Current status:
                                    <label class="Label Label--success" v-if="user.activate"> Enable </label>
                                    <label class="Label Label--danger" v-if="!user.activate"> Disable </label>
                                </li>
                            </ul>
                            -->
                        </div>
                        <div class="Box-footer">
                            <button @click="enable_disable_user(user)" type="button" class="btn btn-block btn-danger" data-close-dialog> Change status </button>
                        </div>
                    </details-dialog>
                </details>
                <router-link :to="{ name: 'Edit', params: { id: user.idusers } }"> <button class="btn ml-2 mr-2"> Edit </button> </router-link>
                <button class="btn btn-danger mr-1"> Logout </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    created(){

        // warning req and axios implementation wrong, service class required
        let req = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('PAINEL_TOKEN')}`
            }
        }

        axios.get('http://localhost:8081/user', req).then(res => {
            this.users = res.data
        }).catch((e) => {
            console.log(e)
        })
    },
    data(){
        return {
            users: [],
            user_id: -1
        }
    },
    methods: {
        process_role(value) {
            switch(value){
                case 0: return 'Default'
                case 1: return 'Admin'
            }
        },
        async enable_disable_user(user) {
            // warning req and axios implementation wrong, service class required
            let req = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('PAINEL_TOKEN')}`
                }
            }   

            var url = ''
            if (user.activate == 0) {
                url = `http://localhost:8081/user/activate/${user.idusers}`
            }
            else {
                url = `http://localhost:8081/user/deactivate/${user.idusers}`
            }

            axios.patch(url, {}, req)
            this.users[this.users.indexOf(user)].activate = !this.users[this.users.indexOf(user)].activate
        }
    }
}

</script>

<style scoped>

</style>
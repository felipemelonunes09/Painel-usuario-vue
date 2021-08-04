<template>
    <div class="anim-fade-in">
        <div class="col-6 mx-auto mt-2">
            <h1 class="f0-light mt-4"> User Register </h1>
            <div class="Box mt-2 color-shadow-extra-large">
                <div class="Box-body">
                    <div class="form-group">
                        <div class="form-group-header">  
                            <label class="color-text-link"> Username </label>
                          </div>
                       <div class="form-group-body">
                           <input class="form-control input-lg" type="text" placeholder="Type yout email" v-model="name" /> 
                        </div>
                     </div>
                     <div class="form-group">
                       <div class="form-group-header">  
                           <label class="color-text-link"> E-mail </label>
                        </div>
                        <div class="form-group-body">
                           <input class="form-control input-lg" type="email" placeholder="Type your email" v-model="email"/> 
                        </div>
                     </div>
                     <div class="form-group">
                         <div class="form-group-header">  
                            <label class="color-text-link"> Password </label>
                         </div>
                        <div class="form-group-body">
                            <input class="form-control input-lg" type="password" placeholder="Type your password" v-model="password" /> 
                        </div>
                    </div>
                     <div class="text-right">
                         <button class="btn btn-primary" @click="register"> Create </button>
                    </div>
                </div>
            </div>
            <div v-if="error != undefined" class="flash mt-3 flash-error anim-fade-up"> 
                {{ error }}
                <button @click="dismiss" class="flash-close js-flash-close" type="button" aria-label="Close"> x </button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                name: '',
                password: '',
                email: '',
                error: undefined
            }
        },
        methods: {
            register() {
                if (this.validate()){
                    axios.post('http://localhost:8081/user', { name: this.name, email: this.email, password: this.password }).then((res) => {
                    console.log(res)
                    this.$router.push({ name: 'Home' })
                })
                .catch(e => {
                    this.error = e.response.data.msg
                })
                }
            },
            dismiss() {
                this.error = undefined;
            },
            validate() {
                // method to validate all fields
                return true;
            }

        }
    }
</script>

<style scoped>
    input {
        min-width: 100%;
    }
</style>
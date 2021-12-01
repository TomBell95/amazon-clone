<template>
  <div class="registerPage">
      <div class="container">
          <div class="row">
              <div class="col-sm-4"></div>
              <div class="col-sm-4">
                  <NuxtLink to="/" class="text-center">
                    <img src="/img/logo-black.png" alt="">
                  </NuxtLink>

                  <form class="mt-4">
                      <div class="a-box a-spacing-extra-large">
                          <div class="a-box-inner">
                              <h1 class="a-spacing-small">Create Account</h1>
                              <!-- Name -->
                              <div class="a-row a-spacing-base">
                                  <label for="ap_customer_name" class="a-form-label">Name</label>
                                  <input 
                                    v-model="name"
                                    type="text" 
                                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info">
                              </div>
                              <!-- Email -->
                              <div class="a-row a-spacing-base">
                                  <label for="ap_customer_name" class="a-form-label">Email</label>
                                  <input 
                                    v-model="email"
                                    type="email" 
                                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info">
                              </div>
                              <!-- Password -->
                              <div class="a-row a-spacing-base">
                                  <label for="ap_customer_name" class="a-form-label">Password</label>
                                  <input 
                                    v-model="password"
                                    type="password" 
                                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info">
                                  <!-- Alert -->
                                  <div class="a-alert-container">
                                      <div class="a-alert-content">Password must be at least 6 characters</div>
                                  </div>
                              </div>

                              <div class="a-row a-spacing-extra-large mb-4">
                                  <span class="a-button-primary">
                                      <span class="a-button-inner">
                                          <span class="a-button-text" @click="onSignup">Create your Amazon account</span>
                                      </span>
                                  </span>
                                  <div class="a-row a-spacing-top-medium a-size-small">
                                      <b>By creating your account you are agreeing to Amazon's
                                          <a href="#">Conditions of Use</a> and 
                                          <a href="#">Privacy Notice</a>
                                      </b>
                                  </div>
                              </div>
                              <div class="a-row">
                                  <b>Already have an account?
                                      <NuxtLink to="/login" class="a-link-emphasis">Sign in</NuxtLink>
                                  </b>
                              </div>
                          </div>
                      </div>
                  </form>
                  
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  layout: 'none',
  middleware: "auth",
  auth: "guest",  
  data(){
      return {
        name : "",
        email : "",
        password : ""
      }
  },
  methods: {
    async onSignup(){
        try {
            const data ={ name: this.name, email: this.email, password: this.password}
            const response = await this.$axios.$post('/api/auth/signup', data)

            if (response.success){
                this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })

                this.$router.push('/')
            }

        } catch (err){
            console.log(err);
        }
    }
  }
}
</script>

<style>

</style>
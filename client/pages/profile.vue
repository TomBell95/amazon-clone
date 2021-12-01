<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Profile Page</h2>
            <button @click="onLogout">Logout</button>
            

            <form>
                <!-- Name -->
                <div class="a-spacing-top-medium">
                    <label>Name</label>
                    <input v-model="name" type="text" class="a-input-text" style="width: 100%" :placeholder="$auth.$state.user.name">
                </div>

                <!-- Email -->
                <div class="a-spacing-top-medium">
                    <label>Email</label>
                    <input v-model="email" type="email" class="a-input-text" style="width: 100%" :placeholder="$auth.$state.user.email">
                </div>

                <!-- Password -->
                <div class="a-spacing-top-medium">
                    <label>Password</label>
                    <input v-model="password" type="text" class="a-input-text" style="width: 100%">
                </div>

                <!-- Button -->
                <hr />
                <div class="a-spacing-top-large">
                    <span class="a-button-register">
                        <span class="a-button-inner">
                            <span class="a-button-text" @click="onUpdateProfile">Update profile</span>
                        </span>
                    </span>
                </div>
            </form>

            <!-- Categories List -->
            <br>

          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
    data(){
        return {
            name: "",
            email: "",
            password: ""
        }
    },
    methods: {
        async onLogout(){
            console.log('Logout triggered');
            await this.$auth.logout();
            // Hard refresh
            window.location.href = '/'

            // this.$router.push('/')
        },
        async onUpdateProfile(){ 
            const data = { 
                name: this.name, 
                email: this.email, 
                password: this.password 
            }
            try {
                const response = await this.$axios.$put('/api/auth/user', data)

                if (response.success){
                    this.name = ""
                    this.email = ""
                    this.password = ""

                    await this.$auth.fetchUser() // refecth the auth user api
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
<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Add a new Category</h2>

            <form>
                <div class="a-spacing-top-medium">
                    <label>Type</label>
                    <input v-model="type" type="text" class="a-input-text" style="width: 100%">
                </div>

                <!-- Button -->
                <hr />
                <div class="a-spacing-top-large">
                    <span class="a-button-register">
                        <span class="a-button-inner">
                            <span class="a-button-text" @click="onAddCategory">Add Category</span>
                        </span>
                    </span>
                </div>
            </form>

            <!-- Categories List -->
            <br>
            <ul>
                <li v-for="category in categories" :key="category._id" class="list-group-item">{{ category.type }}</li>
            </ul>

          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
    async asyncData({ $axios }){
        try {
            const response = await $axios.$get('http://localhost:3000/api/categories')
            return {
                categories: response.categories
            }
        } catch (error){
            console.log(error);
        }
    },
    data(){
        return {
            type: ""
        }
    },
    methods: {
        async onAddCategory() {
            try {
                const data = { type: this.type }
                const response = await this.$axios.$post('http://localhost:3000/api/categories', data)
                
                if (response.status){
                    this.categories.push(data)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>

</style>
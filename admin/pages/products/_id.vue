<template>
  <main>
      <div class="container-fluid">
          <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-6">
                  <div class="a-section">
                      <div class="a-spacing-top-medium"></div>
                      <h2 style="text-align: center">Update {{ product.title }}</h2>
                      <form action="">
                          <!-- Category Dropdown -->
                          <div class="a-spacing-top-medium">
                              <label>Category</label>
                              <select v-model="categoryID" class="a-select-option">
                                  <option 
                                  v-for="category in categories" 
                                  :key="category._id"
                                  :value="category._id" > 
                                  {{ category.type }} </option>
                              </select>
                          </div>

                          <!-- Owner Dropdown -->
                          <div class="a-spacing-top-medium">
                              <label>Owner</label>
                              <select v-model="ownerID" class="a-select-option">
                                  <option 
                                  v-for="owner in owners" 
                                  :key="owner._id"
                                  :value="owner._id" >
                                  {{ owner.name }} </option>
                              </select>
                          </div>

                          <!-- Title -->
                          <div class="a-spacing-top-medium">
                              <label style="margin-bottom">Title</label>
                              <input v-model="title" type="text" class="a-input-text" name="" style="width: 100%" :placeholder="product.title">
                          </div>

                          <!-- Price -->
                          <div class="a-spacing-top-medium">
                              <label style="margin-bottom">Price</label>
                              <input v-model="price" type="text" class="a-input-text" name="" style="width: 100%" :placeholder="product.price">
                          </div>

                          <!-- Stock Quantity -->
                          <div class="a-spacing-top-medium">
                              <label style="margin-bottom">Stock Quantity</label>
                              <input v-model="stockQuantity" type="text" class="a-input-text" name="" style="width: 100%" :placeholder="product.stockQuantity">
                          </div>

                          <!-- Description -->
                          <div class="a-spacing-top-medium">
                              <label style="margin-bottom">Description</label>
                              <textarea v-model="description" cols="30" rows="5" style="width: 100%" :placeholder="product.description"></textarea>
                          </div>

                          <!-- Photo -->
                          <div class="a-spacing-top-medium">
                              <label style="margin-bottom">Add Photo</label>
                              <div class="a-row a-spacing-top-medium">
                                  <label class="choosefile-button">
                                      <i class="fal fa-plus"></i>
                                      <input type="file" @change="onFileSelected">
                                      <p style="margin-top: -70px">{{ fileName }}</p>
                                  </label>
                              </div>
                          </div>

                          <!-- Button -->
                          <hr />
                          <div class="a-spacing-top-large">
                              <span class="a-button-register">
                                  <span class="a-button-inner">
                                      <span class="a-button-text" @click="onUpdateProduct">Update Product</span>
                                  </span>
                              </span>
                          </div>
                          <div class="a-spacing-top-medium"></div>

                      </form>
                  </div>
              </div>
              <div class="col-sm-3"></div>
              
          </div>
      </div>
  </main>
</template>

<script>
export default {
    async asyncData({ $axios, params }){
        try {
            const owners = $axios.$get('http://localhost:3000/api/owners')
            const categories = $axios.$get('http://localhost:3000/api/categories')

            const product = $axios.$get(`http://localhost:3000/api/products/${params.id}`)

            const [categoryResponse, ownerResponse, productResponse] = await Promise.all([
                categories,
                owners,
                product
            ])

            console.log(categoryResponse, ownerResponse, productResponse);

            return {
                categories: categoryResponse.categories, 
                owners: ownerResponse.owners,
                product: productResponse.product
            }
        } catch (err) {
            console.log(err);
        }
    },

    data(){
        return {
            categoryID: null,
            ownerID: null,
            title: '',
            price: "",
            description: '',
            selectedFile: null,
            stockQuantity: "",
            fileName: ''

        }
    },

    methods: {
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
            this.fileName = event.target.files[0].name;
        },
        async onUpdateProduct(){
            const data = new FormData(); // if we want to add a photo we need form data (choose a file or text)
            data.append('title', this.title)
            data.append('price', this.price)
            data.append('description', this.description)
            data.append('ownerID', this.ownerID)
            data.append('categoryID', this.categoryID)
            data.append('stockQuantity', this.stockQuantity)
            data.append('photo', this.selectedFile, this.selectedFile.name)

            const result = await this.$axios.$put(`http://localhost:3000/api/products/${this.$route.params.id}`, data)
            console.log(result);
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>
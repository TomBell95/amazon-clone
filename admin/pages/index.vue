<template>
  <div>
    <main>
      <div class="a-spacing-large"></div>
      <div class="container-fluid browsing-history">
        <div class="row">
          <div class="col-sm-8 col-8">
            <h1 class="a-size-large a-spacing-none a-text-normal">All Products</h1>
            <div class="a-spacing-large"></div>
            <!-- Button -->
            <NuxtLink to="/products" class="a-button-buy-again">Add new product</NuxtLink>
            <NuxtLink to="/category" class="a-button-history margin-right-10">Add new category</NuxtLink>
            <NuxtLink to="/owner" class="a-button-history margin-right-10">Add new owner</NuxtLink>
            
          </div>
        </div>
      </div>

      <!-- Listing Page -->
      <div class="a-spacing-large"></div>
      <div class="container-fluid browsing-history">
        <div class="row">
          <div v-for="(product, index) in products" :key="product._id" class="col-xl-2 col-lg-2 col-md-3 col-sm-6 br bb">
            <div class="history-box">
              <div class="text-center">

                <!-- Product Image -->
                <a href="#" class="a-link-normal">
                  <img :src="product.photo" alt="" class="img-fluid">
                </a>

                <!-- Product Title -->
                <div class="a-spacing-top-base asin-title">
                  <span class="a-text-normal">
                    <div class="p13n-sc-truncated">{{ product.title }}</div>
                  </span>
                </div>

                <!-- Product Rating -->
                <div class="a-row">
                  <a href="#">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </a>
                  <span class="a-letter-space"></span>
                  <span class="a-color-tertiary a-size-small asin-reviews">(1732)</span>
                </div>

                <!-- Product Price -->
                <div class="a-row">
                  <span class="a-size-base a-color-price">
                    <span class="p13n-sc-price">${{ product.price }}</span>
                  </span>
                </div>

                <!-- Product Buttons -->
                <div class="a-row">
                  <NuxtLink :to="`/products/${product._id}`" class="a-button-history margin-right-10">Update</NuxtLink>
                  <!-- <NuxtLink to="/" class="a-button-history margin-right-10" @click="onDeleteProduct(product._id, index)">Delete</NuxtLink> -->
                 <a 
                  href="#" 
                  class="a-button-history margin-right-10" 
                  @click="onDeleteProduct(product._id, index)"
                  >Delete</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
  
</template>

<script>
export default {
  // asyncData is fethcing data before page loads in browser
  async asyncData({ $axios }){
    try {
      const response = await $axios.$get('http://localhost:3000/api/products')
      // console.log(response);
      return {
        products: response.products
      }
    } catch (error){
      console.log(error);
    }
  },
  methods: {
    async onDeleteProduct(id, index){ // when onDelete is called on the button - pass in the id as a param
      try {
        const response = await this.$axios.$delete(`http://localhost:3000/api/products/${id}`)

        console.log('Deleted Success');
        console.log(response.status);

        this.products.splice(index, 1)

      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<template>
  <div>
      <header class="nav-opt-sprite nav-locate-us nav-lang-en nav-ssl nav-unrec">
          <div class="container-fluid desktop-nav">
              <div class="row">

                  <!-- Logo -->
                  <div class="col-sm-2">
                      <div class="logo-area">
                          <NuxtLink to="/">
                            <img src="/img/logo.png" alt="Logo" class="img-fluid">
                          </NuxtLink>
                      </div>
                  </div>

                  <!-- Search Bar -->
                  <div class="col-sm-6 pt-0">
                      <Search />
                  </div>

                  <div class="col-sm-4"></div>

              </div>

              <div class="row">
                  <!-- Deliver to -->
                  <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 pl-2">
                      <div class="nav-global-location">
                          <NuxtLink to="/address" class="nav-a nav-a-2">
                            <div id="nav-packard-glow-loc-icon" class="nav-sprite"></div>
                            <div id="glow-ingress-block">
                                <span id="glow-ingress-line1" class="nav-line-1">Deliver to</span>
                                <span id="glow-ingress-line2" class="nav-line-2">{{ $auth.$state.user.address.city }}</span>
                            </div>
                          </NuxtLink>
                      </div>
                  </div>

                  <!-- Shopping -->
                  <div class="col-xl-6 col-lg-5 col-md-4 col-sm-6 pl-0">
                      <div class="nav-fill">
                          <div class="nav-shop">
                              <NuxtLink to="/history" class="nav-a nav-a-2 nav-single-row-link">
                                <span class="nav-line-2">Browsing History</span>
                                &nbsp;
                                <i class="nav-icon nav-arrow" style="visibility: visible"></i>
                              </NuxtLink>
                          </div>
                          <div class="nav-xshop-container">
                            <div class="nav-xshop">
                                <a href="#" class="nav-a">Today's deals</a>
                                <a href="#" class="nav-a">Your amazon.com</a>
                                <a href="#" class="nav-a">Gift cards</a>
                                <a href="#" class="nav-a">Register</a>
                                <a href="#" class="nav-a">Sell</a>
                            </div>
                        </div>
                      </div>
                  </div>                

                  <!-- Account and Orders -->
                  <div class="col-xl-4 col-lg-5 col-md-6 col-sm-4 pl-0">
                      <div class="nav-tools">
                          <a id="icp-nav-flyout" href="#" class="nav-a nav-a-2 icp-link-style-2">
                              <span class="icp-nav-link-inner">
                                  <span class="nav-line-1">
                                      <span class="icp-nav-globe-img-2"></span>
                                      <span class="icp-nav-language">EN</span>
                                  </span>
                                  <span class="nav-line-2">
                                      &nbsp;
                                      <span class="nav-icon nav-arrow" style="visibility: visible"></span>
                                  </span>
                              </span>
                          </a>
                          <span class="icp-nav-link-border"></span>
                          <!-- Accounts & Lists -->
                          <!-- Check if user logged in -->
                          <template v-if="$auth.$state.loggedIn">
                              <NuxtLink id="nav-link-accountList" tabindex="0" to="/profile" class="nav-a nav-a-2">
                                <span class="nav-line-1">Hello, </span>
                                <span class="nav-line-2">
                                    {{ $auth.$state.user.name }}
                                    <span class="nav-icon nav-arrow" style="visibility: visible"></span>
                                </span>
                            </NuxtLink>
                          </template>
                          <!-- Else -->
                          <template v-else>
                              <NuxtLink id="nav-link-accountList" tabindex="0" to="/login" class="nav-a nav-a-2">
                                <span class="nav-line-1">Hello, Sign in</span>
                                <span class="nav-line-2">
                                    Account &amp; Lists
                                    <span class="nav-icon nav-arrow" style="visibility: visible"></span>
                                </span>
                            </NuxtLink>
                          </template>
                          <!-- Orders -->
                          <NuxtLink to="/orders" class="nav-a nav-a-2 nav-single-row-link">
                            <span class="nav-line-1"></span>
                            <span class="nav-line-2">Orders</span>
                          </NuxtLink>
                          <!-- Cart -->
                          <NuxtLink id="nav-cart" to="/cart" class="nav-a nav-a-2">
                            <span aria-hidden="true" class="nav-line-1"></span>
                            <span aria-hidden="true" class="nav-line-1"></span>
                            <span class="nav-cart-icon nav-sprite"></span>
                            <span id="nav-cart-count" aria-hidden="true" class="nav-cart-count nav-cart-0">{{ getCartLength }}</span>
                          </NuxtLink>
                      </div>
                  </div>

              </div>
          </div>
      </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["getCartLength"])
    }
}
</script>

<style>

</style>
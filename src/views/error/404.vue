<template>
  <div class="bg-primary">
    <div class="container d-flex align-items-center ui-mh-100vh text-white">
      <div class="row align-content-center align-items-start align-items-md-center w-100 py-5">
        <div class="col-md-6 order-2 order-md-1 text-md-left text-center">
          <h1 class="display-2 font-weight-bolder mb-4">呃...</h1>
          <div class="text-xlarge font-weight-light mb-5">抱歉，找不到您访问的资源啦 :(</div>
          <button
            @click="$router.replace('/')"
            type="button"
            class="btn btn-outline-white"
          >←&nbsp; 返回首页
          </button>
        </div>
        <div class="col-md-6 order-1 order-md-2 text-center mb-5 mb-md-0">
          <div class="ui-device macbook w-100 rounded" style="max-width: 500px">
            <img class="device-img" src="../../assets/images/macbook-gold.png" alt>
            <div class="device-content">
              <div class="error-device-content bg-primary">
                <img class="w-75 position-relative" src="../../assets/images/404.png" alt>
                <!--<div class="error-device-code text-white font-weight-bolder">404</div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .error-device-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1;
  }
</style>

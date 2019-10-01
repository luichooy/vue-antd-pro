<template>
  <div class="bg-primary">
    <div class="container d-flex align-items-center ui-mh-100vh text-white">
      <div class="row align-content-center align-items-start align-items-md-center w-100 py-5">
        <div class="col-md-6 order-2 order-md-1 text-md-left text-center">
          <h1 class="display-2 font-weight-bolder mb-4">呃...出错了！</h1>
          <div class="text-xlarge font-weight-light mb-5">抱歉，服务器出错了。</div>
          <button
            @click="$router.replace('/')"
            type="button"
            class="btn btn-outline-white"
          >←&nbsp; 返回首页</button>
          <span class="text-big ml-3">
            或
            <a href="#" class="text-white">
              <u>联系我们</u>
            </a>
          </span>
        </div>
        <div class="col-md-6 order-1 order-md-2 text-center mb-5 mb-md-0">
          <div class="ui-device macbook w-100 rounded" style="max-width: 500px;">
            <img class="device-img" src="../../assets/images/macbook-gold.png" alt />
            <div class="device-content">
              <div class="error-device-content bg-noise">
                <img class="w-75 position-relative" src="../../assets/images/500.png" alt />
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

  &.bg-noise {
    background:
      #000
      url("data:image/gif;base64,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");
  }
}
</style>

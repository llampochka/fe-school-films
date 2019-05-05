<template>
  <div class="loading">
      <div class="loading-overlay">
        <div class="row w-100 h-100">
          <div class="loading-message col-sm-12 my-auto">
            <div class="text-center">
              <b-spinner variant="primary" class="align-middle"></b-spinner>
              <span class="loading-text mx-2">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'LoadingOverlay'
}
</script>



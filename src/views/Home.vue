<template>
  <div class="wrapper">
    <div class="section">
      <h1 class="display-4">Home</h1>
    </div>
    <div
      class="section bg"
      :style="{ backgroundImage: 'url(' + require('@/assets/images/home.png') + ')' }"
    >
    </div>
    <div class="section">
      <h1 class="display-4">Home</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.wrapper {
  /* The height needs to be set to a fixed value for the effect to work.
   * 100vh is the full height of the viewport. */
  height: 100vh;
  /* The scaling of the images would add a horizontal scrollbar, so disable x overflow. */
  overflow-x: hidden;
  /* Enable scrolling on the page. */
  overflow-y: auto;
  /* Set the perspective to 2px. This is essentailly the simulated distance from the viewport to transformed objects.*/
  perspective: 2px;
}
.section {
  /* Needed for children to be absolutely positioned relative to the parent. */
  position: relative;
  /* The height of the container. Must be set, but it doesn't really matter what the value is. */
  height: 100vh;
  
  /* For text formatting. */
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg {
  /* Full height */
  height: 100%; 

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

<template>
  <div id="container">
    <h1>{{initData}}</h1>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        initData: '搭建成功'
      }
    }
  }
</script>

<style scoped>
  #container {
    color: red;
    display: flex;
  }
</style>
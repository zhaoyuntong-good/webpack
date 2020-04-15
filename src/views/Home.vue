
<template>
  <div class="Home">
    <echarts-drown-map ref="echartsDrownMap" :mapConfig="mapConfig" @mapClick="mapClick"></echarts-drown-map>
    <div class="back" @click="mapBack()">返回</div>
  </div>
</template>
<script>
  import "echarts/lib/chart/map";
  import "echarts/lib/chart/effectScatter";
  import "echarts/lib/component/geo";
  import echartsDrownMap from './echartsDrownMap.vue'
  export default {
    name: 'Home',
    components:{
    	echartsDrownMap
    },
    data() {
      return {
      	mapConfig: {
          name: 'china',
          drownType: 'click',
          resize: true,
          option: {
            geo: {
              roam: true,
              itemStyle: {
                areaColor: 'rgba(0,0,0,0)',
                borderColor: '#6cb2ed',
                borderWidth:1.1
              },
              emphasis: {
                itemStyle: {
                  areaColor: 'rgba(34,105,222,0.5)',
                  borderColor: '#6cb2ed'
                }
              }
            },
            series: []
          }
        }
      };
    },
    mounted(){
      
    },
    methods: {
      mapClick(val){
        console.log(val)
      },
      mapBack(){
        this.$refs.echartsDrownMap.back();
      }
    }
  };
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .Home {
    width: 80vw;
    height: 80vh;
  }
  .back{
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
</style>

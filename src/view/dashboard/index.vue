<template>
  <div class="about" ref="bookmarks" id="bookmarks" :style="{
    width: '600px',
    height: '300px'
  }"></div>
  <div class="dashboard">这里我想分享的一些东西，无论是生活还是工作，还是学科</div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';
const bookmarks = ref<HTMLElement>()
onMounted(() => {
  const myEcharts = echarts.init(bookmarks.value!)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '25',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Java' },
          { value: 735, name: 'JavaScript' },
          { value: 580, name: 'Internet' },
          { value: 484, name: '数据结构' },
          { value: 300, name: '数据库' }
        ]
      }
    ]
  }
  myEcharts.setOption(option)
})

</script>

<style>
.dashboard {
  background-color: beige;
}
</style>
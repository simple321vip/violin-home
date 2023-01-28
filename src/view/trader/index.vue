<template>
  <div class="about" ref="trader_chart" id="trader_chart" :style="{
    width: '1200px',
    height: '600px'
  }"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import { generateOHLC, option } from '../../service/trader'
import { get_stock_data } from '../../api/trader'


const trader_chart = ref<HTMLElement>()

const data_count = 2e5;


get_stock_data({}).then((response) => {
  response.data.forEach((element: any) => {
    console.log(element)
  });
})

const data = generateOHLC(data_count);

const options = reactive<EChartsOption>(option)

""
const set_option = () => {
  options.dataset = {
    source: data
  }
  options.title = {
    text: 'Data Amount: ' + echarts.format.addCommas(data_count)
  }
}

const on_tick = () => {

}
const on_start = () => {
}
onMounted(() => {

  set_option()

  const myEcharts = echarts.init(trader_chart.value!)

  myEcharts.setOption(options)

})

</script>

<style>
.dashboard {
  background-color: beige;
}
</style>
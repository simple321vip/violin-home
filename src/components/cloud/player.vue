<template>
  <div class="mainPage" ref="playerRef"></div>
</template>


<script setup lang="ts">
// import APlayer from 'aplayer';
import 'aplayer/dist/APlayer.min.css';
import { reactive, nextTick, onBeforeUnmount, getCurrentInstance, onMounted, ref } from 'vue'

const playerRef = ref()
const currentInstance = getCurrentInstance()
const state = reactive({
  instance: null
})

// APlayer歌曲信息
class Audio {
  // 音频艺术家
  // artist: String;
  // 音频名称
  // name: String;
  // 音频链接
  // url: String;
  // 音频封面
  // cover: String;
  // 歌词
  // lrc: String;

  // constructor(artist, name, url, cover, lrc) {
  //   this.artist = artist;
  //   this.name = name;
  //   this.url = url;
  //   this.cover = cover;
  //   this.lrc = lrc;
  // }
}

const props = defineProps({
  // 开启吸底模式
  fixed: {
    type: Boolean,
    default: false
  },
  // 开启迷你模式
  mini: {
    type: Boolean,
    default: false
  },
  // 音频自动播放
  autoplay: {
    type: Boolean,
    default: false
  },
  // 主题色
  theme: {
    type: String,
    default: 'rgba(255,255,255,0.2)'
  },
  // 音频循环播放
  loop: {
    type: String,
    default: 'all' //'all' | 'one' | 'none'
  },
  // 音频循环顺序
  order: {
    type: String,
    default: 'random' //'list' | 'random'
  },
  // 预加载
  preload: {
    type: String,
    default: 'auto' //'auto' | 'metadata' | 'none'
  },
  // 默认音量
  volume: {
    type: Number,
    default: 0.7,
    validator: (value: number) => {
      return value >= 0 && value <= 1;
    }
  },
  // 歌曲服务器(netease-网易云, tencent-qq音乐, kugou-酷狗, xiami-小米音乐, baidu-百度音乐)
  songServer: {
    type: String,
    default: 'netease' //'netease' | 'tencent' | 'kugou' | 'xiami' | 'baidu'
  },
  // 播放类型(song-歌曲, playlist-播放列表, album-专辑, search-搜索, artist-艺术家)
  songType: {
    type: String,
    default: 'playlist'
  },
  // 歌的id
  songId: {
    type: String,
    default: '19723756'
  },
  // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
  mutex: {
    type: Boolean,
    default: true
  },
  // 传递歌词方式
  lrcType: {
    type: Number,
    default: 3
  },
  // 列表是否默认折叠
  listFolded: {
    type: Boolean,
    default: true
  },
  // 列表最大高度
  listMaxHeight: {
    type: String,
    default: '100px'
  },
  // 存储播放器设置的 localStorage key
  storageName: {
    type: String,
    default: 'aplayer-setting'
  }
})
onMounted(() => {
  let str = {
    server: props.songServer,
    type: props.songType,
    id: props.songId
  }

  // 销毁
  onBeforeUnmount(() => {

  })
})
</script>
  
<style lang='scss' scoped>
.mainPage {
  @include wh(100%, auto);
  background: #FCFCFC;
  border: 1px solid #E0E0E0;
  border-radius: 4px;

}
</style>
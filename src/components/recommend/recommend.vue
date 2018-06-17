<template>
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content" :data="dicsList">
            <div>
                <div v-if="recommends.length" class="slider-wrapper">
                    <slider>
                        <div v-for="(item,index) in recommends" :key="index">
                            <a :href="item.linkUrl">
                                <img class="needsclick" @load="loadImage" :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
            </div>
            <div class="loading-container" v-show="!dicsList.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import Slider from '../../base/slider/slider.vue'
import Scroll from '../../base/scroll/scroll.vue'
import axios from 'axios'
export default {
  data () {
    return {
      dicsList: []
    }
  },
  created () {
    this._getDiscList()
  },
  methods: {
    loadImage () {
      if (!this.checkLoaded) {
        this.checkLoaded = true
        this.$refs.scroll.refresh()
      }
    },
    _getDiscLis () {
      axios.get('/v2/movie/us_box').then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.dicsList = res.data.list
        }
      })
    }
  },
  components: {
    Slider,
    Scroll
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        .name
                            margin-bottom: 10px

            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>

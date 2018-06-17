<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="star" v-bind:class="starType">
        <span v-for="(itemClass,index) in itemClasses" v-bind:class="itemClass" class="star-item" v-bind:key="index"></span>
    </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  data () {
    return {
      size: 36
    }
  },
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 4
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .star
        font-size: 0
        .star-item
            display: inline-block
            background-repeat: no-repeat
        &.star-36
            .star-item
                width: 15px
                height: 15px
                margin-right: 16px
                background-size: 15px 15px
                &:last-child
                    margin-right: 0
                &.on
                    bg-image('star36_on')
                &.half
                    bg-image('star36_half')
                &.off
                    bg-image('star36_off')
</style>
<template>
    <div class="tab">
        <router-link tag="div" class="tab-item" to="/hotLine">
            <span class="tab-link">正在热映</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/cinecism">
            <span class="tab-link">北美票房榜</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/top250">
            <span class="tab-link">Top250</span>
        </router-link>

    </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
    .tab
        display: flex
        height: 44px
        line-height: 44px
        font-size: 14px
        background-color #F0F3F5
        .tab-item
            flex: 1
            text-align: center
            .tab-link
                padding-bottom: 5px
                color: #3796D1
            &.router-link-active
                .tab-link
                    background-color #8ecdda87
                    padding: 10px
                    border-radius 20%
</style>

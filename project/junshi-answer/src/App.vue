<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import share from '@ali/lib-shareh5';
export default {
    name: 'app',
    created(){
        document.querySelector('.load').remove();
        share({
            title: this.$store.state.mtConfig.share.title, //对话框标题
            timelineTitle: this.$store.state.mtConfig.share.timelineTitle, //微信朋友圈显示标题
            desc: this.$store.state.mtConfig.share.desc, //对话框分享描述
            link: this.$store.state.mtConfig.share.link, //分享链接
            shareImage: this.$store.state.mtConfig.share.shareImage //图片地址必须加https或http
        });
    }
};
</script>

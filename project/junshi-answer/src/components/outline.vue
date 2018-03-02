<template>
    <div class="mask">
        <img :src="img"/>
        <img :src="mtConfig.logo" class="logo"/>
    </div>
</template>
<script>
export default {
    name: 'outline',
    data() {
        return {
            img:'./static/images/bigbox.png',
        };
    },
    computed:{
        mtConfig(){
            return this.$store.state.mtConfig;
        }
    }
};
</script>
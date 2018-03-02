<template>
  <div id='app'>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    data(){
        return {
        };
    },
    // mounted () {
    //     const u = navigator.userAgent;
    //     if ( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ) {
    //         this.$store.dispatch('setApp', 'android');
    //     } else if ( /iPhone|iPad/.test(u) ) {
    //         this.$store.dispatch('setApp', 'ios');
    //     }
    //     console.log(u);
    // }
    created () {
        console.log('s');
    }
};
</script>
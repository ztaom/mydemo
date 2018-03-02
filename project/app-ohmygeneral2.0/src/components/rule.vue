<template>
    <!-- 活动规则 -->
    <div class="rule">
        <div v-html='ruleText'></div>
    </div>
</template>

<script>
export default {
    name: 'rule',
    data () {
        return {
            ruleText: '活动规则'
        };
    },
    created () {
        const jsRuleText = window.mgData.ruleText;
        this.ruleText = jsRuleText;
        // eslint-disable-next-line
    }
};
</script>

<style scope lang='less'>

</style>

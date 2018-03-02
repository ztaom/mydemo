<template>
    <!-- 弹层 -->
    <div class="dialog" v-show="dialogShow" v-move="{noMove: noMove}">
        <!-- 遮罩 -->
        <div class="masker"></div>
        <!-- 获得卡片记录弹窗 -->
        <div class="pop p_getcardlist">
            <div class="inner">
                <div class="close" @click.stop="dialogHide('dialogCHShow')"></div>
                <div class="p_title">得卡明细</div>
                <div class="defauttxt" v-show="showDefault">
                    {{baseInfo.getCardTxt}}
                </div>
                <div class="defauttxt" style="color:#ccc;" v-show="showReload" @click="requestCard">
                    点击重新加载
                </div>
                <div class="datacard" v-show="!showDefault && !showReload">
                    <div class="item" v-for="(item, index) in recordList">
                        <span class="col_1">
                            {{item.name}}1张<em>{{ item.state === 1 ? '+1' : '-1'}}</em>
                        </span>
                        <span class="col_2">
                            {{ item.operateTime | formateDate }}
                        </span>
                        <span class="col_3">
                            {{item.operate}}
                        </span>
                    </div>
                </div>
                <div class="botips">优酷VIP会员得卡数翻倍</div>
                <div class="p_msk"></div>
            </div>
        </div>
    </div>

</template>

<script>
import fn from '../common/fn';

export default {
    name: 'dialog',
    data () {
        return {
            noMove: '',
            tipsText: '援军赶来精力焕发，赶快作战吧！',
        };
    },
    computed: {
        baseInfo(){
            return window.mgData.baseInfo;
        },
        dialogShow(){
            this.noMove = this.$store.state.dialogCHShow;
            return this.$store.state.dialogCHShow;
        },
        recordList(){
            return (this.$store.state.recordData && this.$store.state.recordData.recordList) || [];
        },
        showDefault(){
            return (this.$store.state.cardData.tcount === 0 && !this.showReload) ? true : false;
        },
        showReload(){
            return (this.$store.state.recordReload);
        }
    },
    methods: {
        dialogHide(dialogName){
            this.$store.commit('HIDE_DIALOG', dialogName);
        },
        requestCard(){//重新请求得卡记录
            this.$store.dispatch('getRecordData');
        },
    },
    filters: {
        formateDate(now){
            return fn.formateDate(now, '.');
        }
    }
};
</script>

<style scope lang='less'>
    .p_getcardlist{
        .inner {
            .defauttxt{
                height:230px;
                text-align:center;
                color:#333;
                line-height:200px;
                font-size:16px;

            }
        }
    }
</style>

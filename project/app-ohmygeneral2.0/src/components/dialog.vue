<template>
    <!-- 弹层 -->
    <div class="dialog">

        <!-- 遮罩 -->
        <div class="masker" style="display:block"></div>

        <!-- 卡片详情弹窗 -->
        <div class="pop p_carddetail p_cddown" style="display:none"><!--动画效果添加，出现的时候添加p_cddown，回收的时候添加p_cdup-->
            <div class="inner">
                <!-- 广告banner -->
                <div class="videobigads"><img src="//gw.alicdn.com/tfs/TB1SvNAngoQMeJjy0FpXXcTxpXa-689-99.jpg" class="pic"></div>
                <div class="videoarea">
                    <div class="video"></div>
                    <!-- 播放按钮 -->
                    <div class="startplay" style="display:none">
                        <div class="playicon"></div>
                    </div>
                    <div class="endtipwrap" style="display:block">
                        <!-- 中奖提示 -->
                        <div class="playtip">
                            <div class="txt">
                                恭喜获得<em>“3个月黄金会员”</em>
                                <p>看视频继续拿福利</p>
                            </div>
                        </div>

                        <!-- 抽奖完之后视频选择提示 -->
                        <div class="videoselect" >
                            <img src="../img/vs_p_1.png" class="pic">
                            <p>这里是当前卡其他视频</p>
                        </div>
                    </div>
                    
                    <!-- 视频角广告 -->
                    <div class="videoads"><img src="//gw.alicdn.com/tfs/TB1Tpw6ngMPMeJjy1XcXXXpppXa-63-75.png" class="pic"></div>
                </div>
                <ul class="allvideo">
                    <li>
                        <img src="../img/vs_p_1.png" class="pic">
                        <p class="showdot">这里是当前卡其他视频</p>
                    </li>
                    <li>
                        <img src="../img/vs_p_1.png" class="pic">
                        <p class="showdot">这里是当前卡其他视频</p>
                    </li>
                    <li>
                        <img src="../img/vs_p_1.png" class="pic">
                        <p class="showdot">这里是当前卡其他视频</p>
                    </li>
                    <li>
                        <img src="../img/vs_p_1.png" class="pic">
                        <p class="showdot">这里是当前卡其他视频</p>
                    </li>
                    <li>
                        <img src="../img/vs_p_1.png" class="pic">
                        <p class="showdot">这里是当前卡其他视频</p>
                    </li>
                </ul>
                <div class="cardinfo">
                    <div class="card"><img src="../img/d_1.png" class="pic"></div>
                    <div class="txt">
                        <h3>叶昭<span>（马思纯饰）</span></h3>
                        <p class="tostar">星球</p>
                        <p class="brief">女扮男装、武艺超群、英气逼人，16岁被朝廷委以重任、披挂上阵、沙场上杀敌无数、威名远扬</p>
                        <div class="handlewrap">
                            <div class="givebtn" style="display:none"></div><!--赠送好友-->
                            <div class="askbtn" style="display:block"></div><!--索要卡片-->
                            <div class="cardnum">12张</div><!--未获得-->
                        </div>
                    </div>
                </div>
                <div class="togglebtn"></div><!--收起-->
            </div>
            <div class="bot"></div>
        </div>

        <!-- 开奖弹窗 -->
        <div class="pop p_prize" style="display:none">
            <div class="inner">
                <div class="close"></div>
                <div class="p_title"><img src="../img/c_title.png" class="pic"></div>
                <div class="prize single" style="display:none">
                    <div class="item"><em>¥111.1</em>双十一免单卷</div>
                </div>
                <div class="prize double" style="display:block">
                    <div class="item"><em>¥111.1</em>双十一免单卷</div>
                    <div class="item"><em>¥66</em>现金红包</div>
                </div>
                <div class="btnarea">
                    <div class="btn orange_btn"><span>立即查看</span></div>
                    <div class="btn gray_btn" style="display:block"><span>晒一下</span></div>
                </div>
                <div class="caidai"></div>
            </div>
        </div>

        <!-- 开奖弹窗 用这个 -->
        <div class="pop p_prize_hb" style="display:none">
            <div class="rotatebg"></div>
            <div class="inner">
                <div class="close"></div>
                <div class="prize">
                    <div class="hongbao">1111元现金红包</div>
                    <div class="mdj">
                        <div class="plus">加</div>
                        <img src="../img/mdj.png" class="pic">
                    </div>
                    <div class="hb_tips">最高11.11万</div>
                </div>
                <div class="btnarea">
                    <div class="btn orange_btn"><span>立即查看</span></div>
                    <div class="btn gray_btn" style="display:block"><span>晒一下</span></div>
                </div>
                <div class="caidai"></div>
            </div>
        </div>

        <!-- 领取成功弹窗 -->
        <div class="p_ok" style="display:none">
            <div class="inner">
                <div class="txt">领取成功</div>
                <p class="prizetip">另送“3个月黄金会员”，已存入<em>我的奖品</em></p>
            </div>
        </div>

        <div class="p_ok_single" style="display:none">
            <div class="inner">
                <div class="txt">领取成功</div>
            </div>
        </div>

        <!-- 任务弹窗提示 -->
        <div class="p_task" style="display:none">
            <div class="inner">
                <div class="txt">领取成功领取成功领取成功领取成功领取成功领取成功</div>
            </div>
        </div>

        <!-- 获得卡片弹窗 -->
        <div class="pop p_getcard" style="display:none">
            <div class="inner">
                <div class="close"></div>
                <div class="cardnum">访问页面获得卡1张</div>
                <div class="card"><img src="../img/p_1.png" class="pic"></div>
                <div class="gettxt">
                    <p>另送“3个月黄金会员”，已存入<em>我的奖品</em></p>
                </div>
                <div class="btnarea">
                    <div class="btn blue_btn" style="display:none"><img src="https://gw.alicdn.com/tfs/TB1irqkq3MPMeJjy1XcXXXpppXa-524-118.png" class="pic"></div>
                    <div class="btn gray_btn" style="display:block"><span>晒一下</span></div>
                </div>
            </div>
        </div>

        <!-- 获得多张卡片弹窗 -->
        <div class="pop p_getcard" style="display:none">
            <div class="inner">
                <div class="close"></div>
                <div class="cardnum">访问页面获得卡1张</div>
                <div class="card"><img src="../img/p_1.png" class="pic"></div>
                <div class="gettxt">
                    <ul>
                        <li>访问页面获得卡+1</li>
                        <li>看剧得卡+1</li>
                        <li>好友赠送+1</li>
                    </ul>
                    <p>另送“3个月黄金会员”，已存入<em>我的奖品</em></p>
                </div>
                <div class="btnarea">
                    <div class="btn blue_btn"><img src="https://gw.alicdn.com/tfs/TB1irqkq3MPMeJjy1XcXXXpppXa-524-118.png" class="pic"></div>
                    <div class="btn gray_btn" style="display:block"><span>晒一下</span></div>
                </div>
            </div>
        </div>

        <!-- 视频列表弹窗 -->
        <div class="pop p_videolist" style="display:none">
            <div class="inner">
                <div class="close"></div>
                <div class="p_title">看双11热剧得将军卡</div>
                <div class="videolist">
                    <div class="item">
                        <img src="../img/3.jpg">
                        <h3>独家震撼预告</h3>
                    </div>
                    <div class="item">
                        <img src="../img/3.jpg">
                        <h3>独家震撼预告</h3>
                    </div>
                    <div class="item">
                        <img src="../img/3.jpg">
                        <h3>独家震撼预告</h3>
                    </div>
                    <div class="item">
                        <img src="../img/3.jpg">
                        <h3>独家震撼预告</h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- 获得卡片记录弹窗 -->
        {{getDetailShow}}
        <div class="pop p_getcardlist" v-show="getDetailShow" style="display:none ">
            <div class="inner">
                <div class="close"  @click.stop="dialogHide('getDetailShow')"></div>
                <div class="p_title">得卡明细</div>
                <div class="defauttxt" style="height:230px; text-align:center; color:#333; line-height:200px; font-size:16px;">你还没有获得任何卡片</div>
                <div class="datacard" style="display:none">
                    <div class="item">
                        <span class="col_1">曹操1张<em>+1</em></span>
                        <span class="col_2">2017.9.20</span>
                        <span class="col_3">好友赠送</span>
                    </div>
                    <div class="item">
                        <span class="col_1">曹操1张<em>+1</em></span>
                        <span class="col_2">2017.9.20</span>
                        <span class="col_3">好友赠送</span>
                    </div>
                    <div class="item">
                        <span class="col_1">曹操1张<em>+1</em></span>
                        <span class="col_2">2017.9.20</span>
                        <span class="col_3">好友赠送</span>
                    </div>
                    <div class="item">
                        <span class="col_1">曹操1张<em>+1</em></span>
                        <span class="col_2">2017.9.20</span>
                        <span class="col_3">好友赠送</span>
                    </div>
                    <div class="item">
                        <span class="col_1">曹操1张<em>+1</em></span>
                        <span class="col_2">2017.9.20</span>
                        <span class="col_3">好友赠送</span>
                    </div>
                    <div class="item">
                        <span class="col_1">曹操1张<em>+1</em></span>
                        <span class="col_2">2017.9.20</span>
                        <span class="col_3">好友赠送</span>
                    </div>
                    <div class="item">
                        <span class="col_1">曹操1张<em>+1</em></span>
                        <span class="col_2">2017.9.20</span>
                        <span class="col_3">好友赠送</span>
                    </div>
                    <div class="item">
                        <span class="col_1">曹操1张<em>+1</em></span>
                        <span class="col_2">2017.9.20</span>
                        <span class="col_3">好友赠送</span>
                    </div>
                    <div class="item">
                        <span class="col_1">曹操1张<em>+1</em></span>
                        <span class="col_2">2017.9.20</span>
                        <span class="col_3">好友赠送</span>
                    </div>
                    <div class="item">
                        <span class="col_1">曹操1张<em>+1</em></span>
                        <span class="col_2">2017.9.20</span>
                        <span class="col_3">好友赠送</span>
                    </div>
                </div>
                <div class="botips">优酷黄金会员得卡数翻倍</div>
                <div class="p_msk"></div>
            </div>
        </div>

        <!-- 通用登录弹窗 -->
        <div class="pop p_login" style="display:none">
            <div class="inner">
                <div class="close"></div>
                <div class="p_title">集将军卡 免单双十一</div>
                <div class="txt">
                    <p>每日首次访问可获得将军卡1张</p>
                </div>
                <div class="btnarea">
                    <div class="btn blue_btn"><span>立即登录</span></div>
                </div>
            </div>
        </div>

        <!-- 通用弹窗 -->
        <div class="pop p_normal" style="display:block">
            <div class="inner">
                <div class="close"></div>
                <div class="p_title">集将军卡 免单双十一</div>
                <div class="txt">
                    <p>网络异常，请稍后再试</p>
                </div>
                <div class="btnarea">
                    <div class="btn blue_btn"><span>确定</span></div>
                </div>
            </div>
        </div>

        <!-- 异常轻提示 -->
        <div class="pop p_abnormal" style="display:none">
            <div class="inner">
                <div class="txt">
                    <p>网络异常，请稍后再试</p>
                </div>
                <div class="btnarea">
                    <div class="btn"><span>确定</span></div>
                </div>
            </div>
        </div>

        <!-- 红包雨提示 -->
        <div class="pop p_swordrain" style="display:none">
            <div class="inner">
                <div class="close"></div>
                <img src="../img/hbytips.png" class="pic">
            </div>
        </div>

    </div>

</template>

<script>
export default {
    name: 'dialog',
    data () {
        return {
            tipsText: '援军赶来精力焕发，赶快作战吧！'
        };
    },
    created(){
        console.log(this.$store.state);
    },
    computed: {
        getDetailShow(){
            // return true;
            return this.$store.state.getDetailShow;
        },

    },
    methods: {
        dialogHide(dialogName){
            this.$store.commit('HIDE_DIALOG', dialogName);
        }
    }
};
</script>

<style scope lang='less'>

</style>

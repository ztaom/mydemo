<template>
    <div id="mystatic">

        <!-- 卡片显示区域 -->
        <div class="cardwrap">
            <div class="cardlist">
                <div class="item">
                    <div class="card"><img src="#" class="pic"></div>
                    <div class="getcardnum">10张</div>
                    <div class="getstate">未获得</div>
                </div>
                <div class="item">
                    <div class="card"><img src="#" class="pic"></div>
                    <div class="getcardnum">10张</div>
                    <div class="getstate">未获得</div>
                </div>
                <div class="item">
                    <div class="card"><img src="#" class="pic"></div>
                    <div class="getcardnum">10张</div>
                    <div class="getstate">未获得</div>
                </div>
                <div class="item">
                    <div class="card"><img src="#" class="pic"></div>
                    <div class="getcardnum">10张</div>
                    <div class="getstate">未获得</div>
                </div>
                <div class="item">
                    <div class="card"><img src="#" class="pic"></div>
                    <div class="getcardnum">10张</div>
                    <div class="getstate">未获得</div>
                </div>
            </div>
            <div class="openprizebtn">马上开奖</div><!-- 马上领取 -->
            <div class="myaward">我的奖品</div>
        </div>

        <!-- 任务区域 -->
        <div class="taskwrap">
            <div class="title">每日任务得将军卡</div>
            <div class="seemoviebtn">观看将军在上<span></span></div>
            <div class="sharebtn">分享给好友<span></span></div>
            <div class="cctstate">已有200,001人集齐；周四20:00准时开奖</div>
        </div>

        <!-- 奖品展示 -->
        <div class="prizeshow">
            <div class="item">1111</div>
            <div class="item">111</div>
            <div class="item">11.1<br>双11优惠卷</div>
            <div class="item">免单<br>双11优惠卷</div>
        </div>


        <!-- 视频星球区域 -->
        <div class="starwrap">
            <p class="playdate">9月28 独家开播</p>
            <div class="starlist">
                <div class="item">
                    <div class="avatar"><img src="../img/4.jpg" class="pic"></div>
                    <div class="text">
                        <h3>#一句话假装看过三国#</h3>
                        <p><span>阅读10万</span><span>参与3000</span></p>
                    </div>
                </div>
                <div class="item">
                    <div class="avatar"><img src="../img/4.jpg" class="pic"></div>
                    <div class="text">
                        <h3>#一句话假装看过三国#</h3>
                        <p><span>阅读10万</span><span>参与3000</span></p>
                    </div>
                </div>
                <div class="item">
                    <div class="avatar"><img src="../img/4.jpg" class="pic"></div>
                    <div class="text">
                        <h3>#一句话假装看过三国#</h3>
                        <p><span>阅读10万</span><span>参与3000</span></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 活动规则 -->
        <div class="rule">
            <span>1</span><p>活动时间：2014年7月25日-9月4日<br><br></p>
            <span>2</span><p>活动说明：活动期间，参加太平洋保险在线商城2周年乐趴总动员活动，就有机会获得4999元车险免单100元/50元/20元产品抵用券，海量礼品疯狂派<br><br></p>
            <span>3</span><p>活动说明：活动期间，参加太平洋保险在线商城2年乐趴总动员活动，就有机会获得4999元车险免单、100元/50元/20元产品抵用券，海量礼品疯狂派</p>
        </div>

        <!-- 广告位 -->
        <div class="adswrap">
            <ul class="bannerlist">
                <li><img src="../img/1.jpg" class="pic"></li>
                <li><img src="../img/1.jpg" class="pic"></li>
                <li><img src="../img/1.jpg" class="pic"></li>
                <li><img src="../img/1.jpg" class="pic"></li>
                <li><img src="../img/2.jpg" class="pic"></li>
            </ul>

            <ul class="linklist">
                <li><img src="../img/link1.png" class="pic"></li>
                <li><img src="../img/link2.png" class="pic"></li>
                <li><img src="../img/link3.png" class="pic"></li>
                <li><img src="../img/link4.png" class="pic"></li>
            </ul>

        </div>

    </div>
</template>

<script>
export default {
    name: 'mystatic',
    data () {
        return {
            msg: '这个页面是基于Vue的'
        };
    }
};
</script>

<style scope lang='less'>
/*@import '../less/var.less';
h1{
    color: black;
    font-weight: normal;
    font-size:50/@pxtorem;
}*/
</style>

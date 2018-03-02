/**
 * Created by youku on 2015/10/22.
 */
(function(){
    setTimeout(function(){
        window.scrollTo(0, 1);
    },10);
    document.querySelector(".download").addEventListener("touchmove", function (e) {
        e.preventDefault();
    },false);
    var reportPoint = function(link){
        if(link!==""&&link!==null)
        new Image().src=link;
    };
    var getCategory = function(){
        var url = location.href;
        var url_param = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(url.indexOf("?") + 1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                url_param[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return url_param["category"];
        
    };
    

    var iphone_url,pad_url,and_url,count_hz,iphone_hz,pad_hz,and_hz;
    var category;
    var getUrlHz = function(){
        //category 默认是百度(baidu_1)， 百度， 搜狗， 360
        category = getCategory();
        switch (category){
            //百度 ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
            case "shoutao_shuang11":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.5_zhanlue-shuangshiyihuodong.apk";
                break;
            case "lankun":
                and_url="http://down2.uc.cn/youku/down.php?pub=ef9cea3926897fff";
                break;
            case "lankun1":
                and_url="http://down2.uc.cn/youku/down.php?pub=fb208544bafb75e4";
                break;
            case "lankun2":
                and_url="http://down2.uc.cn/youku/down.php?pub=d2082dcce886d9d0";
                break;
            case "lankun3":
                and_url="http://down2.uc.cn/youku/down.php?pub=968f6a91602cc044";
                break;
            case "lankun4":
                and_url="http://down2.uc.cn/youku/down.php?pub=42cd584dec9c6b98";
                break;
            case "lankun5":
                and_url="http://down2.uc.cn/youku/down.php?pub=adf386f18a29513b";
                break;
            case "lankun6":
                and_url="http://down2.uc.cn/youku/down.php?pub=ee776be8037c8617";
                break;
            case "lankun7":
                and_url="http://down2.uc.cn/youku/down.php?pub=22ba64d5f9236a67";
                break;
            case "lankun9":
                and_url="http://down2.uc.cn/youku/down.php?pub=b28b4c856e6d51d0";
                break;
            case "lankun10":
                and_url="http://down2.uc.cn/youku/down.php?pub=19b59f84a5a430e4";
                break;
            case "lankun12":
                and_url="http://down2.uc.cn/youku/down.php?pub=2ea461718d634f67";
                break;
            case "lankun16":
                and_url="http://down2.uc.cn/youku/down.php?pub=93af5da9db2aeef8";
                break;
            case "lankun21":
                and_url="http://down2.uc.cn/youku/down.php?pub=76a9bd991e79f5dd";
                break;
            case "lankun25":
                and_url="http://down2.uc.cn/youku/down.php?pub=b28b4c856e6d51d0";
                break;
            case "youkupinzhuan2":
                and_url="http://down2.uc.cn/youku/down.php?pub=4be443503798fe68";
                break;
            case "youkupinzhuan3":
                and_url="http://down2.uc.cn/youku/down.php?pub=c8c4a32f0c6c35bd";
                break;

            case "baidurmmy":
                and_url="http://down2.uc.cn/youku/down.php?pub=a3be42d479f34062";
                break;

            //未分类
            case "jinritoutiaoziyingguanggao":
                iphone_url="https://itunes.apple.com/app/apple-store/id336141475";
                pad_url="https://itunes.apple.com/app/apple-store/id336141475";
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.5_zhanlue-jinritoutiaoziyingguanggao.apk";
                break;
            case "wangtongshe":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.5_zhanlue-wangtongshe.apk";
                break;
            case "taipingyangqiche":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.5_zhanlue-taipingyangqiche.apk";
                break;


            //搜狗 ================
            case "sougou_1":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.3_zhanlue-sougouSEM21.apk";
                break;
            case "sougou_2":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.3_zhanlue-sougouSEM22.apk";
                break;
            case "sougou_3":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.3_zhanlue-sougouSEM23.apk";
                break;
            case "sougou_4":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.3_zhanlue-sougouSEM24.apk";
                break;
            case "sougou_5":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.3_zhanlue-sougouSEM25.apk";
                break;
            case "sougou_6":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.3_zhanlue-sougouSEM26.apk";
                break;
            case "sougou_7":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.3_zhanlue-sougouSEM27.apk";
                break;
            case "sougou_8":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.3_zhanlue-sougouSEM28.apk";
                break;
            case "sougou_9":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.3_zhanlue-sougouSEM29.apk";
                break;
            case "sougou_10":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.3_zhanlue-sougouSEM30.apk";
                break;
            case "sougoupinzhuan":
                and_url="http://down2.uc.cn/youku/down.php?pub=54b2edc0cd42af5b";
                break;
            case "sougoupinzhuan2":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_6.0_zhanlue-sougoupinzhuan.apk ";
                break;


            
            case "sem":
                and_url="http://down2.uc.cn/youku/down.php?pub=7c92f21bebc3dab2";
                break;
            case "sem1":
                and_url="http://down2.uc.cn/youku/down.php?pub=e7d23ee648b3317a";
                break;
            case "sem2":
                and_url="http://down2.uc.cn/youku/down.php?pub=7ec0d700ce745278";
                break;
            case "sem3":
                and_url="http://down2.uc.cn/youku/down.php?pub=c647cb9baa8109dc";
                break;
            case "sem4":
                and_url="http://down2.uc.cn/youku/down.php?pub=63c98a6d96efe96b";
                break;
            case "sem5":
                and_url="http://down2.uc.cn/youku/down.php?pub=8727b2a6f24e9f84";
                break;
            case "sem6":
                and_url="http://down2.uc.cn/youku/down.php?pub=60f1868729b86bed";
                break;
            case "sem7":
                and_url="http://down2.uc.cn/youku/down.php?pub=cfb489b68eea45ba";
                break;
            case "sem8":
                and_url="http://down2.uc.cn/youku/down.php?pub=68459f8d742091c6";
                break;
            case "sem9":
                and_url="http://down2.uc.cn/youku/down.php?pub=f1d6da0b36f0953c";
                break;
            case "sem10":
                and_url="http://down2.uc.cn/youku/down.php?pub=f2b8b4ae5f81a6a1";
                break;
            case "sem11":
                and_url="http://down2.uc.cn/youku/down.php?pub=6d28288c4fc15034";
                break;
            case "sem12":
                and_url="http://down2.uc.cn/youku/down.php?pub=71fb112ff5c58eb2";
                break;
            case "sem13":
                and_url="http://down2.uc.cn/youku/down.php?pub=5ebdf2210fe1ccd0";
                break;
            case "sem14":
                and_url="http://down2.uc.cn/youku/down.php?pub=b7e2835f9bf9b680";
                break;
            case "sem15":
                and_url="http://down2.uc.cn/youku/down.php?pub=9cdac9d271f3eb59";
                break;
            case "sem16":
                and_url="http://down2.uc.cn/youku/down.php?pub=cc1998c8c0026675";
                break;
            case "sem17":
                and_url="http://down2.uc.cn/youku/down.php?pub=d65ef0e75701a3c7";
                break;
            case "sem18":
                and_url="http://down2.uc.cn/youku/down.php?pub=caf2712096c0a04e";
                break;

            case "sougourmmy":
                and_url="http://down2.uc.cn/youku/down.php?pub=05a4e08b3332f4a6";
                break;

            case "dpfl":
                and_url="http://down2.uc.cn/youku/down.php?pub=e2208b8477143664";
                break;

            case "fulishe":
                and_url="http://down2.uc.cn/youku/down.php?pub=e2208b8477143664";
                break;
                
            case "daping":
                and_url="http://down2.uc.cn/youku/down.php?pub=3670ffbdfdff2a9d";
                break;

            case "daping2":
                and_url="http://down2.uc.cn/youku/down.php?pub=590cdc582587e8aa";
                break;
                
            //360 ===
            case "360_1":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.1_zhanlue-360SEM2.apk";
                break;
            case "360_2":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.1_zhanlue-360SEM3.apk";
                break;
            case "360_3":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.1_zhanlue-360SEM4.apk";
                break;
            case "360_4":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.1_zhanlue-360SEM5.apk";
                break;
            case "360pinzhuan1":
                and_url="http://dl.m.cc.youku.com/android/phone/youku-android-6.1.1-360pinzhuan.apk";
                break;
            
            //支付宝
            case "guaguaka":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_zhanlue-guaguaka.apk";
                break;
            case "zhifubao":
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_zhanlue-guaguaka.apk";
                break;
            

            //百度品专及其他
             default :
                and_url="http://dl.m.cc.youku.com/android/phone/Youku_Android_5.10.5_zhanlue-lankun2.apk";
        }

    };
    /*http://static.youku.com/h5/html/extension/extension.html
    * http://static.youku.com/h5/html/extension/extension.html?category  百度品专
    * http://static.youku.com/h5/html/extension/extension.html?category=shenma 神马品专
    * http://static.youku.com/h5/html/extension/extension.html?category=shenmaSEM 神马sem
    * http://static.youku.com/h5/html/extension/extension.html?category=baiduSEM 百度sem
    * http://static.youku.com/h5/html/extension/extension.html?category=sogoSEM
    * http://static.youku.com/h5/html/extension/extension.html?category=baidu_downloadcard
    * */

    var downLink = function(){
        getUrlHz();
        //reportPoint(count_hz);
        var ua = navigator.userAgent.toLowerCase(),
            url="",hz="";
        if (/iphone|ipod/.test(ua)) {
            $(".download").html('<img src="img/iosdown.png"/>');
            $('.topic .download').html('<img src="img/download.png"/>');
            url = "https://itunes.apple.com/app/apple-store/id336141475";
        } else if(/ipad/.test(ua)){
            $(".download").html('<img src="img/iosdown.png"/>');
            $('.topic .download').html('<img src="img/download.png"/>');
            url = "https://itunes.apple.com/cn/app/you-ku-hd/id394075284";
        } else{
            $(".download").html('<img src="img/anddown.png"/>');
            $('.topic .download').html('<img src="img/download.png"/>');
            url = and_url;


            //打开页面自动弹出下载，只弹一次
            var store = window.localStorage.getItem("isFirst") || 0;
            if(!!store && parseInt(store) >= 1){
            }else if (category === 'youkupinzhuan2' || category === 'youkupinzhuan3') {
                window.localStorage.setItem("isFirst", ++store);
                //console.log(category)
                clearT = setTimeout(function(){
                    $(".download").click()
                }, 2000)
            }
            
        }
        $(".download,.contlist").on("click",function(){
            //reportPoint(hz);
            if(url!==""&&url!==null)
            location.href=url;

        });


    };
    downLink();

    //背景图设置
    var date = new Date(),year=date.getFullYear(),mouth = (date.getMonth()+1), day = date.getDate(),hour = date.getHours()
    var updateTime = year+''+mouth+''+day+''+hour;

    var bgOne = 'url('+'http://r4.ykimg.com/051000005824101F67BC3D3D4C064D4A'+'?'+updateTime+')';
    var bgTwo = 'url('+'http://r1.ykimg.com/051000005824102C67BC3D3D620135B5'+'?'+updateTime+')';
    var bgThr = 'url('+'http://r3.ykimg.com/051000005824100E67BC3D3D2E01058D'+'?'+updateTime+')';
    var bgFour = 'url('+'http://r3.ykimg.com/051000005824103667BC3D3D8A04A9AE'+'?'+updateTime+')';
    var bgBanner = 'http://r2.ykimg.com/051000005824106167BC3D4544040012'+'?'+updateTime;
    $('.p1').css('backgroundImage',bgOne)
    $('.p2').css('backgroundImage',bgTwo)
    $('.p3').css('backgroundImage',bgThr)
    $('.p4').css('backgroundImage',bgFour)
    $('.topic .tpbg').attr('src',bgBanner)
})();

// 大学信息免费查询页广告投放函数
function dxxxmfcx() {
    let storage_ad_obj = {
        a1_ad: '',
        a1_ad_status: false,
        a2_ad: '',
        a2_ad_status: false,
    };
    $.ajax({
        type: "GET",
        // url: "https://xsxt.43.dev.eol.com.cn/app/html/www/target/pc/gk/dxxxmfcx-gk/746.json",
        url: "https://misc.eol.cn/js/target/pc/gk/dxxxmfcx-gk/746.json",
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            // A1广告--首屏半通栏9596--切帧
            var a1_imgarr = [{ group: [] }, { group: [] }];
            var a1_res = data.data[9596] || [];
            var sucai_1 = [];
            for (var i = 0; i < a1_res.length; i++) {
                if (Number(a1_res[i].publish_id) != 0) {
                    sucai_1.push(a1_res[i])
                }
            }
            if (sucai_1.length == 0) {
                $('.a1ad').hide();
            } else {
                if (a1_res) {
                    a1_res.forEach(function (item, index) {
                        if (index < 2) {
                            a1_imgarr[0].group.push(item);
                        } else {
                            a1_imgarr[1].group.push(item);
                        }
                    })
                }

                var storage_img = JSON.parse(localStorage.getItem('storage_ad'));
                var a1_ad_arr = a1_imgarr.filter(item => item.group.length > 0);
                var a1_ad_data = randomAd('storage_ad', a1_ad_arr, storage_ad_obj, storage_img, 'a1_ad_status', 'a1_ad');

                if (a1_ad_data.length == 0) {
                    a1_ad_data = {
                        group: []
                    };
                }

                var a1_str = '';
                for (var i = 0; i < a1_ad_data.group.length; i++) {
                    a1_str += '<a target="_blank" href="' + a1_ad_data.group[i].href + '">' + '<img src="' + a1_ad_data.group[i].img + '" />' + '</a>';
                }
                $(".a1ad").html(a1_str);
            }

            // A2广告--底部通栏9597--切帧
            var group2 = data.data[9597] || [];
            var sucai_2 = [];
            for (var i = 0; i < group2.length; i++) {
                if (Number(group2[i].publish_id) != 0) {
                    sucai_2.push(group2[i])
                }
            }
            if (sucai_2.length == 0) {
                $('.a2ad').hide();
            } else {
                var a2_ad_data = randomAd('storage_ad', group2, storage_ad_obj, storage_img, 'a2_ad_status', 'a2_ad');
                var a2_str = '';
                a2_str += '<a href="' + a2_ad_data.href + '">' + '<img src="' + a2_ad_data.img + '" />' + '</a>';
                $(".a2ad").html(a2_str);
            }

        },
    });
}
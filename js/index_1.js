$(function () {
  // 有道样式
  if (window.location.search.indexOf("fromcoop=youdao") != -1) {
    document.documentElement.classList.add("youdao")
  }
  $('#search').focus(function () {
    $('.search-but').addClass('focus');
    $('#searchimg').attr('src', '//www.eol.cn/e_images/index/2018/search2.png');
  });
  $('#search').blur(function () {
    $('.search-but').removeClass('focus');
    $('#searchimg').attr('src', '//www.eol.cn/e_images/index/2018/search.png');
  });
  $('.search').hover(function () {
    $('.search-but').addClass('focus');
    $('#searchimg').attr('src', '//www.eol.cn/e_images/index/2018/search2.png');
  }, function () {
    $('.search-but').removeClass('focus');
    $('#searchimg').attr('src', '//www.eol.cn/e_images/index/2018/search.png');
  });
  $('.search-but').click(function (event) {
    var word = $('#search').val();
    eolsearch(word);
  });
  var fbloo = false;
  $("#search").focus(function () {
    fbloo = true;
  });
  $("#search").blur(function () {
    fbloo = false;
  });
  $(document).keypress(function (event) {
    var keynum = (event.keyCode ? event.keyCode : event.which);
    if (keynum == '13' && fbloo) {
      var word = $('#search').val();
      eolsearch(word);
    }
  });

  function eolsearch(word) {
    window.open("http://search.eol.cn/cse/search?q=" + word + "&click=1&s=5684435554596442487");
  }

  $('.gj-li').mouseover(function () {
    $(this).css('background', '#2f6fef');
    var imgsrc = '//www.eol.cn/e_html/zt/gxmd/images/icon' + ($(this).index() + 1) + '-w' + '.png';
    $(this).find('img').attr('src', imgsrc);
    $(this).find('a').css('color', '#fff');
  }).mouseout(function () {
    $(this).css('background', '#fff');
    var imgsrc = '//www.eol.cn/e_html/zt/gxmd/images/icon' + ($(this).index() + 1) + '.png';
    $(this).find('img').attr('src', imgsrc);
    $(this).find('a').css('color', '#333');
  });

  var ua = window.navigator.userAgent;
  if (/Mobile|iP(hone|ad)|Android|BlackBerry|IEMobile/.test(ua)) {
    $('body').click(function (event) {
      $('.menu-bg').hide();
    });
  } else {
    //
  }

  function gethtml(area) {
    var name = $("#pselect option[value='" + area + "']").text();
    $('.province').each(function (index, el) {
      $(el).removeClass('active');
      if ($(el).attr('data-id') == area) {
        $(el).addClass('active');
      }
    });
    $("#pselect option:contains('" + name + "')").prop("selected", true);
    let url = 'html/html_' + area + '.html';
    $.ajax({
      url: url,
      dataType: 'html'
    }).done(function (res) {
      $('.con-table').html(res);
    }).fail(function () {
      alert('获取数据失败！')
    });
  }

  function init() {
    var area = hasParameter('area');
    if (area) {
      gethtml(area);
    } else {
      gethtml(1);
    }
  }
  // init();


  $('.provincebox-pc>.province').click(function (event) {
    var id = $(this).attr('data-id');
    $('.province').each(function (index, el) {
      $(el).removeClass('active');
      if ($(el).attr('data-id') == id) {
        $(el).addClass('active');
      }
    });
    var url = window.location;
    // window.location.href =  url.origin+url.pathname + '?area='+id;
    window.location.href = url.origin + url.pathname + '#' + id;
  });

  $('#pselect').change(function (e) {
    var id = e.currentTarget.value;
    $('.province').each(function (index, el) {
      $(el).removeClass('active');
      if ($(el).attr('data-id') == id) {
        $(el).addClass('active');
      }
    });
    var url = window.location;
    // window.location.href =  url.origin+url.pathname + '?area='+id;
    window.location.href = url.origin + url.pathname + '#' + id;
  });

  function hasParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }
  $('body').on('click', '.mzk', function (event) {
    $(this).toggleClass('up')
  });

  $('.mtop-right').click(function (event) {
    event.stopPropagation();
    event.preventDefault();
    $('.menu-bg').toggle();
  });


  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }
  function createAni(img) {
    img.classList.add("active");

    // 添加动画属性
    img.style.right = '50px'
    img.style.width = '0'
    img.style.opacity = 0
    img.style.bottom = 'calc(20% + 225px)'

    // 动画结束后，销毁
    img.ontransitionend = function () {
      this.remove()
    }
  }
  var coop = getQueryVariable("fromcoop") || "default";
  var pos = "85";
  $('body').append('<div class="right_bar"></div>');
  $.ajax({
    type: "GET",
    url: "https://static-gkcx1.gaokao.cn/www/2.0/json/coop/2.json",
    crossDomain: true,
    dataType: 'json',
    success: function (res) {
      if (res.data[pos] && res.data[pos][coop] && res.data[pos][coop]["status"]) {
        $('body').append('<a target="_blank" href="' + res.data[pos][coop].link + '"><img src="https://img1.eol.cn/e_images/gk/2020/bd/wbpc2.gif" class="zbimg_bottom" /></a>');
        window.gio('track', 'mnzy_show85')
        setTimeout(function () {
          var img = document.getElementsByClassName('zbimg_bottom')[0]
          if (img) { createAni(img) }
        }, 3000)
      } else {
        if (res.data[pos] && res.data[pos]['default'] && res.data[pos]['default']["status"]) {
          $('body').append('<a target="_blank" href="' + res.data[pos]['default'].link + '"><img src="https://img1.eol.cn/e_images/gk/2020/bd/wbpc2.gif" class="zbimg_bottom" /></a>');
          window.gio('track', 'mnzy_show85')
          setTimeout(function () {
            var img = document.getElementsByClassName('zbimg_bottom')[0]
            if (img) { createAni(img) }
          }, 3000)
        }
      }

      if (res.data[49] && res.data[49][coop] && res.data[49][coop]["status"]) {
        var tzy_enter = res.data[49][coop].link + '?channel=' + coop;
        $('.right_bar').append('<a target="_blank" href="' + tzy_enter + '"><img src="' + res.data[49][coop].img_url + '" class="img_item" /></a>');
        window.gio('track', 'mnzy_show49')
      } else {
        if (res.data[49] && res.data[49]['default'] && res.data[49]['default']["status"]) {
          var tzy_enter = res.data[49]['default'].link;
          $('.right_bar').append('<a target="_blank" href="' + tzy_enter + '"><img src="' + res.data[49]['default'].img_url + '" class="img_item" /></a>');
          window.gio('track', 'mnzy_show49')
        }
      }

      if (res.data[85] && res.data[85][coop] && res.data[85][coop]["status"]) {
        $('.right_bar').append('<a target="_blank" href="' + res.data[85][coop].link + '"><img src="' + res.data[85][coop].img_url + '" class="img_item" /></a>');
        window.gio('track', 'mnzy_show85')
      } else {
        if (res.data[85] && res.data[85]['default'] && res.data[85]['default']["status"]) {
          $('.right_bar').append('<a target="_blank" href="' + res.data[85]['default'].link + '"><img src="' + res.data[85]['default'].img_url + '" class="img_item" /></a>');
          window.gio('track', 'mnzy_show85')
        }
      }

      if (res.data[99] && res.data[99][coop] && res.data[99][coop]["status"]) {
        $('.right_bar').append('<a target="_blank" href="' + res.data[99][coop].link + '"><img src="' + res.data[99][coop].img_url + '" class="img_item" /></a>');
        window.gio('track', 'mnzy_show99')
      } else {
        if (res.data[99] && res.data[99]['default'] && res.data[99]['default']["status"]) {
          $('.right_bar').append('<a target="_blank" href="' + res.data[99]['default'].link + '"><img src="' + res.data[99]['default'].img_url + '" class="img_item" /></a>');
          window.gio('track', 'mnzy_show99')
        }
      }
    },
  });

});

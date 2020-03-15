  //          /<!--(.*?)-->/g 
  // THÊM ICONS VÀ HASH TAG CHO BÀI VIẾT
     // icons = /(?<= \:\:)(.*?)(?=\s*\:\:)/gim;
  icons = /\[\:(.*?)\:\]/gim;
  function hashtags(text) {
    if (!text) {
      var text =  document.getElementById('body').innerHTML ;
    }
      return text.replace(
          icons , function(str) {
            return '<span class="mini '+str.replace(/\[\:/gim,'').replace(/\:\]/gim,'')+'"></span>' 
      });
  }
  // check if ngoai screen
  function check(e) {
      try {
          var elementTop = e.offset().top;
          var elementBottom = elementTop + e.outerHeight();
          var viewportTop = $(window).scrollTop();
          var viewportBottom = viewportTop + $(window).height();
          return elementBottom > viewportTop && elementTop < viewportBottom;
      } catch(e) {
        return false;
      }
  }
    // hàm dùng làm đẹp code 
    function expand(obj) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i],
                subkeys = key.split(/,\s?/),
                target = obj[key];
            delete obj[key];
            subkeys.forEach(function(key) { obj[key] = target; })
        }
        return obj;
    }
    var languages_array = expand({
        "html, xml, svg, mathml": "markup",
        "shell": "bash",
        "js":"javascript",
        "hs":"haskell",
        "py":"python", 
        "adoc":"asciidoc", 
        "rbnf":"bnf",
        "rb":"ruby", 
        "conc":"concurnas", 
        "tex, context":"latex",
        "cs, dotnet":"csharp",
        "coffee":"coffeescript", 
        "emacs, elisp, emacs-lisp":"lisp",
        "sln":"solution-file",
        "rq":"sparql", 
        "md":"markdown", 
        "jinja2":"django", 
        "dns-zone":"dns-zone-file", 
        "dockerfile":"docker", 
        "gamemakerlanguage":"gml", 
        "px":"pcaxis", 
        "objectpascal":"pascal", 
        "n4jsd":"n4js", 
        "moon":"moonscript", 
        "robot":"robotframework", 
        "sln":"solution-file", 
        "rq":"sparql", 
        "ts":"typescript", 
        "t4":"t4-cs", 
        "vb":"visual-basic", 
        "yml":"yaml"
    });
    var codeArray = ['https://cdn.jsdelivr.net/gh/truong-huong/nullshell-js/main.js'];
    function checkCodeLanguage(){
      if ( $('code[class*=language-]').length) {
        $('code[class*=language-]').each(function(){
          var language = 'https://cdn.jsdelivr.net/gh/truong-huong/nullshell-js/prism-'+fixLanguages($(this).attr('class').trim().replace('language-', '').trim())+'.min.js';
          if (codeArray.includes(language) == true){}
            else {
              codeArray.push(language);
          }
        });
        loadLanguageScript(codeArray)
      }
      
    }
    function loadLanguageScript(scripts){
           var script = scripts.shift();
           var hongtham = document.createElement('script');
           $('head').append(hongtham);
           hongtham.onload = function(){
               console.log('Hong Tham Nguyen Thi shit ! Tham shit shit shit shit shit');
               if (codeArray.length) {
                   loadLanguageScript(codeArray);
               }
               else {
                   Prism.highlightAll();   
               }
           };
           hongtham.src = script;    
       }
  function fixLanguages(language) {
      var language = language ;
      if ( languages_array[language] != undefined ) {
          language = languages_array[language];
      }
      return language;
  }
  var hongtham_style_array = ['//cdn.jsdelivr.net/gh/truong-huong/codechui-main/main.css',
                                 '//truong-huong.github.io/codechui-main/fontawesome-custom/all.css',
                                 '//truong-huong.github.io/codechui-main/font-face.css'];
  function loadStyleScript(link){
         var link = link.shift();
         var hongtham = document.createElement('link');
         $('head').append(hongtham);
         hongtham.onload = function(){
             console.log('Hong Tham Nguyen Thi shit ! Tham shit shit shit shit shit');
             if (hongtham_style_array.length) {
                 loadStyleScript(hongtham_style_array);
             }
         };
         hongtham_style.rel = 'stylesheet';
         hongtham_style.href = link;
     }
  // KET THUC LAM DEP CODE
  /* onready */
  $(document).ready(
    function() {
      (function(){
        $('[data-label]').each(
          function(){
            var label = $(this).attr('data-label').trim();
            if (label == "" ) { label = 'notfound'}
            var maxResults;
            var url = '/feeds/posts/summary/-/' + label + '?alt=json-in-script&max-results=' + (($(this).attr('max-results')) ? $(this).attr('max-results') : '4');
            var $this = $(this) ;
            try {
              $.ajax({
                  url: url,
                  type: "get",
                  dataType: "jsonp"})
                  .done( function(e) {
                      $this.removeAttr('data-label');
                      var feed = e.feed;
                      if (feed.entry) {
                          var num_post = feed.entry.length;
                          for (i = 0; i < num_post; i++) {
                              var href = feed.entry[i].link[feed.entry[i].link.length - 1].href;
                              var title = feed.entry[i].title.$t;
                              $('<li><a href="' + href + '">' + title + '</a></li>').appendTo($this.next());
                          }
                      } else {
                          $('<li class="notFoundLabel">(-.-) Không có bài nào được tìm thấy [<a href="p/label-not-found.html">tìm hiểu thêm</a>]</li>').appendTo($this.next());
                      }
                  }
              )
              .fail( function(e) {$('<li class="notFoundLabel">(-.-) Không có bài nào được tìm thấy [<a href="p/label-not-found.html">tìm hiểu thêm</a>]</li>').appendTo($this.next());});
            } catch(e) {};
        })
      })();
      /* đóng mở search */
      (function(){
        $('[data-click=menu]').click(function(event){
            event.stopPropagation();
            $('.search').show();
            $('header section address').hide(); 
            $('.search label').trigger('click');
        });
        $('.search').focusout(function(){
          $('.search').hide();
          $('header section address').show();
        });
      })();
      /* ddongs mowr menu */
      (function(){
        $('.open-menu,.close-menu').click(
          function() {
            $('nav > div:last-child').toggle();
          }
        )
      })();
      // goi ham lam dep code
      (function() {
          checkCodeLanguage();
          loadStyleScript(hongtham_style_array);
      })();
    }
  );

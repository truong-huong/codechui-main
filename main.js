// Khởi tạo chung 
var doc = document ;
var getId = function(id){return doc.getElementById( id );}
// Hàm tạo click ảo 
function clickVirtual(el){
  var evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 20
  });
  el.dispatchEvent(evt);
}
// kiểm tra shortcode
var icons = /\[\:(.*?)\:\]/gim;
function hashtags(text) {
    if (!text) {
      var text = getId('body').innerHTML;
    }
    return text.replace(
      icons,
      function(str) { return '<span class="mini ' + str.replace(/\[\:/gim, '').replace(/\:\]/gim, '') + '"></span>'
    });
}
// Kiểm tra sự xuất hiện ngoài màn hình hay chưa
function check(el) {
  try {
      var position = el.getBoundingClientRect();
      // nếu ở ngay bên trong màn hình
      if (position.top >= 0 && position.bottom <= window.innerHeight) {
          return true;
      }
      // nếu ở ngay gần vào màn hình một phần 
      if (position.top < window.innerHeight && position.bottom >= 0) {
          return true;
      }
  }catch(e){
      return false;
  }}
// Chuyên dùng để load code làm đẹp 
function expand(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; ++i) {
      var key = keys[i],
          subkeys = key.split(/,\s?/),
          target = obj[key];
      delete obj[key];
      subkeys.forEach(function(key) {
          obj[key] = target;
      })
  }
  return obj;
}
var languages_array = expand({
  "html, xml, svg, mathml": "markup",
  "shell": "bash",
  "js,jquery": "javascript",
  "hs": "haskell",
  "py": "python",
  "adoc": "asciidoc",
  "rbnf": "bnf",
  "rb": "ruby",
  "conc": "concurnas",
  "tex, context": "latex",
  "cs, dotnet": "csharp",
  "coffee": "coffeescript",
  "emacs, elisp, emacs-lisp": "lisp",
  "sln": "solution-file",
  "rq": "sparql",
  "md": "markdown",
  "jinja2": "django",
  "dns-zone": "dns-zone-file",
  "dockerfile": "docker",
  "gamemakerlanguage": "gml",
  "px": "pcaxis",
  "objectpascal": "pascal",
  "n4jsd": "n4js",
  "moon": "moonscript",
  "robot": "robotframework",
  "sln": "solution-file",
  "rq": "sparql",
  "ts": "typescript",
  "t4": "t4-cs",
  "vb": "visual-basic",
  "yml": "yaml" });
var codeArray = ['https://cdn.jsdelivr.net/gh/truong-huong/nullshell-js/main.js'];
function checkCodeLanguage() {
  if (doc.querySelectorAll('code[class*=language-]').length) {
    Array.prototype.forEach.call(doc.querySelectorAll('code[class*=language-]'), function(el, i) {
      var language = 'https://cdn.jsdelivr.net/gh/truong-huong/nullshell-js/prism-' + fixLanguages(el.getAttribute('class').trim().replace('language-', '').trim()) + '.min.js';
      if (codeArray.includes(language) == true) {} else {
          codeArray.push(language);
      }
    })
    loadLanguageScript(codeArray)
}}
function loadLanguageScript(scripts) {
  var script = scripts.shift();
  var hongtham = doc.createElement('script');
  doc.head.appendChild(hongtham);
  hongtham.onload = function() {
      console.log('Hong Tham Nguyen Thi shit ! Tham shit shit shit shit shit');
      if (codeArray.length) {
          loadLanguageScript(codeArray);
      } else {
          Prism.highlightAll();
      }
  };
  hongtham.src = script;
}
function fixLanguages(language) {
  var language = language;
  if (languages_array[language] != undefined) {
      language = languages_array[language];
  }
  return language;
}
doc.addEventListener("load", function() {
  (function() {
  var data_label = doc.querySelectorAll('[data-label]');
  Array.prototype.forEach.call(data_label, function(el, i) {
    var label = el.getAttribute('data-label').trim();
    if (label == "") {
        label = 'notfound'
    };
    var maxResults;
    var url = '/feeds/posts/summary/-/' + label + '?alt=json&max-results=' + ((el.getAttribute('max-results')) ? el.getAttribute('max-results') : '4');
    // Bắt đầu kết nối tải dữ liệu về 
    // Cài trước biến cho nếu 4040 hoặc lỗi 
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.response);
            var feed = data.feed;
            if (feed.entry) {
                var num_post = feed.entry.length;
                for (i = 0; i < num_post; i++) {
                    var href = feed.entry[i].link[feed.entry[i].link.length - 1].href;
                    var title = feed.entry[i].title.$t;
                    var li = doc.createElement('li');
                    li.innerHTML = '<a href="' + href + '">' + title + '</a>';
                    el.nextElementSibling.appendChild(li);
                }
            } else {
                var error = doc.createElement('li');
                error.className = 'notFoundLabel';
                error.innerHTML = '(-.-) Không có bài nào được tìm thấy [<a href="p/label-not-found.html">tìm hiểu thêm</a>]';
                el.nextElementSibling.appendChild(error);
            }
        } else {
            var error = doc.createElement('li');
            error.className = 'notFoundLabel';
            error.innerHTML = '(-.-) Không có bài nào được tìm thấy [<a href="p/label-not-found.html">tìm hiểu thêm</a>]';
            el.nextElementSibling.appendChild(error);
        }
    };
    // Nếu có lỗi xảy ra
    request.onerror = function() { }
    // Send
    request.send();
  })})();
  /* đóng mở search */
  (function() {
    doc.querySelector('[data-click=menu]').addEventListener('click', function(e) {
      e.stopPropagation();
      getId('search').style.display = 'block';
      doc.querySelector('header section address').style.display = 'none';
      /* tạo một click event vào khung viết query */
      clickVirtual(doc.querySelector('#search label'));
    });
    getId('search').addEventListener('focusout', function() {
      this.style.display = 'none';
      doc.querySelector('header section address').style.display = '';
    });
  })();
  /* đóng mở menu */
  (function() {
    doc.querySelector('#close-menu').addEventListener('click', function() {
      clickVirtual(doc.querySelector('#open-menu'));
    });
    doc.querySelector('#open-menu').addEventListener('click', function() {
      var porn =  doc.querySelector('nav > div:last-child');
      if (porn.style.display == "none") {
          porn.style.display = "block";
        } else {
          porn.style.display = "none";
        }
    })
  })();
  // goi ham lam dep code
  (function() {
      checkCodeLanguage();
  })();
});

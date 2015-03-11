(function() {
  $('.off-canvas-toggle').on('click', function(e) {
    e.preventDefault();
    $('.off-canvas-wrap').toggleClass('open-menu');
  });

  $('.exit-off-canvas').on('click', function(e) {
    e.preventDefault();
    $('.off-canvas-wrap').removeClass('open-menu');
  });

  if ($('.docs-main').length) {
    var $ul = $("<ul class='nav'></ul>");
    var $li, id;
    $('.docs-main h2').each(function() {
      id = "#" + this.id;
      $li = $("<li><a></a></li>");
      $li.find("a").attr("href", id).text(this.textContent).toggleClass("current", document.location.hash === id);
      $ul.append($li);
    });
    $(".docs-aside .active").append($ul);
  }

  var player;
  var playerId = 0;
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.body.appendChild(tag);

  function onPlayerReady(event) {
      //event.target.playVideo();
  }
  function onPlayerStateChange(event) {
      if(event.data == YT.PlayerState.ENDED) {
          player.destroy();
      }
  }

  $(".button-video").click(function(e){
    e.preventDefault();

    playerId++;
    $(this).find("img").attr("id", "player-" + (playerId));
    player = new YT.Player("player-" + playerId, {
        width : '505',
        height : '345',
        videoId : $(this).data('video-id'),
        playerVars: { 'autoplay': 1 },
        events : {
            'onReady' : onPlayerReady,
            'onStateChange' : onPlayerStateChange
        }
    });
    $(this).addClass("playing");
  });

  $(".js-pinned").pin({containerSelector: ".js-pinning-container"})
})();
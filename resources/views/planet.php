<!DOCTYPE html>
<head>
  <title>Planets</title>
  <link rel="stylesheet" href="<?php echo asset('css/scitech.css')?>" type="text/css">
  <audio id="sound">
    <source src="https://dl.dropboxusercontent.com/u/39670418/planettest.mp3" type="audio/mpeg">
  </audio>
  <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <script>
    var sound = document.getElementById('sound');
    var button = document.getElementById('play');
    function playAudio(){
      if(sound.paused) {
        button.disabled=true;
        sound.play();

      }
      else {
        sound.pause();
      }
      }
    $("#sound").bind("ended", function(){
      button.disabled=false;
    })

  </script>
</head>
<body>
  <div class="scitechcontainer">

    <h1 class="scitechtitle">What is a Planet?</h1>



    <button id="play" class="soundbutton" onclick="playAudio()">Read This To Me!</button><hr />



    <div class="description">
      <div class="textsectionfirst">All planets have 4 things that describe them:</div>
      <div class="textsection">They orbit the sun</div>
      <div class="textsection">They don’t orbit another planet</div>
      <div class="textsection">They are round (or mostly round)</div>
      <div class="textsection">They can push other objects with their gravitational force</div>
      <div class="textsectionlast">There are also dwarf planets - these are almost the same, except smaller.
        Because of their size, they can't push other objects with their gravity like a regular planet can.</div>
    </div>

  </div>
</body>
</html>

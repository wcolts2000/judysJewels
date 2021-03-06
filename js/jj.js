window.onscroll = function () {
  stickyHeader();
  scrollFunction();
};

let header = document.getElementById("myHeader");

let sticky = header.offsetTop;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("up-arrow").style.display = "block";
  } else {
    document.getElementById("up-arrow").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


function hamburgerMenuToggle() {
  let x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function elmYPosition(eID) {
  let elm = document.getElementById(eID);
  let y = elm.offsetTop;
  let node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

$('.thumbnail').on('click', function () {
  let clicked = $(this);
  let newSelection = clicked.data('big');
  let $img = $('.primary').css("background-image", "url(" + newSelection + ")");
  clicked.parent().find('.thumbnail').removeClass('selected');
  clicked.addClass('selected');
  $('.primary').empty().append($img.hide().fadeIn('slow'));
});


/*=================================================
INIT
===================================================*/

on = 0; // Init
time = 500; // Set the delay before the next click is accepted to 1 second
pos = 1; // Set init position
pos2 = 2;
pos3 = 3;

/*=================================================
CLICK FUNCTIONS
===================================================*/

// Right
$('.right').click(function () {
  rotateRight(); // Call
  on = 1; // Set delay on
});

// Left
$('.left').click(function () {
  rotateLeft(); // Call
  on = 1; // Set delay on
});

/*=================================================
AUTOPLAY
===================================================*/

play = setInterval(function () {
  rotateLeft()
}, 3000)

/*=================================================
ROTATE FUNCTIONS
===================================================*/

// Rotate left
function rotateLeft() {
  if (on == 0) {
    $('.p_slider__item:nth-of-type(' + pos + ')').animate({
      'left': '200px'
    }, 200)
    $('.p_slider__item:nth-of-type(' + pos + ')').css('z-index', '0')
    $('.p_slider__item:nth-of-type(' + pos2 + ')').animate({
      'left': '-200px'
    }, 200)
    setTimeout(function () {
      $('.p_slider__item:nth-of-type(' + pos2 + ')').css({
        'transform': 'scale(0.6)',
        'opacity': '0.8',
        'webkit-filter': 'blur(2px)',
        'z-index': '1'
      });
      pos++;
      pos2++;
      pos3++;
      if (pos > 3) {
        pos = 1
      }
      if (pos2 > 3) {
        pos2 = 1;
      }
      if (pos3 > 3) {
        pos3 = 1;
      }
    }, 400)
    $('.p_slider__item:nth-of-type(' + pos3 + ')').animate({
      'left': '0px'
    }, 200)
    $('.p_slider__item:nth-of-type(' + pos3 + ')').css({
      'transform': 'scale(1)',
      'opacity': '1',
      'webkit-filter': 'blur(0px)',
      'z-index': '2'
    })
    setTimeout(function () {
      on = 0; // Accept clicks again
    }, time)
  }
}

// Rotate right
function rotateRight() {
  if (on == 0) {
    $('.p_slider__item:nth-of-type(' + pos3 + ')').animate({
      'left': '-200px'
    }, 200)
    $('.p_slider__item:nth-of-type(' + pos3 + ')').css('z-index', '0')
    $('.p_slider__item:nth-of-type(' + pos2 + ')').animate({
      'left': '200px'
    }, 200)
    setTimeout(function () {
      $('.p_slider__item:nth-of-type(' + pos2 + ')').css({
        'transform': 'scale(0.6)',
        'opacity': '0.8',
        'webkit-filter': 'blur(2px)',
        'z-index': '0'
      });
      pos--;
      pos2--;
      pos3--;
      if (pos < 1) {
        pos = 3
      }
      if (pos2 < 1) {
        pos2 = 3;
      }
      if (pos3 < 1) {
        pos3 = 3;
      }
      console.log(pos, pos2, pos3)
    }, 400)
    $('.p_slider__item:nth-of-type(' + pos + ')').animate({
      'left': '0px'
    }, 200)
    $('.p_slider__item:nth-of-type(' + pos + ')').css({
      'transform': 'scale(1)',
      'opacity': '1',
      'webkit-filter': 'blur(0px)',
      'z-index': '1'
    })
    setTimeout(function () {
      on = 0; // Accept clicks again
    }, time)
  }
}

$('.p_slider__item img').hover(function () {
  clearInterval(play)
})
$('.p_slider__item img').mouseenter(function () {
  $(this).animate({
    'top': '-14px'
  }, 300);
})
$('.p_slider__item img').mouseout(function () {
  $(this).stop(true, false).animate({
    'top': '0px'
  }, 300)
  play = setInterval(function () {
    rotateLeft()
  }, 3000)
})
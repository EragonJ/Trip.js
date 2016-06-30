module.exports = TripAnimation;

function TripAnimation() {

}

var animations = [
  'flash', 'bounce', 'shake', 'tada',
  'fadeIn', 'fadeInUp', 'fadeInDown',
  'fadeInLeft', 'fadeInRight', 'fadeInUpBig', 'fadeInDownBig',
  'fadeInLeftBig', 'fadeInRightBig', 'bounceIn', 'bounceInDown',
  'bounceInUp', 'bounceInLeft', 'bounceInRight', 'rotateIn',
  'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft',
  'rotateInUpRight'
];

TripAnimation.has = function(name) {
  return animations.indexOf(name) >= 0;
};

TripAnimation.getAllInString = function() {
  return animations.join(' ');
};

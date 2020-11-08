// Params
let mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0.5;

// Main Slider
let mainSliderOptions = {
      loop: true,
      speed:1000,
      // autoplay:{
      //   delay:3000
      // },
      loopAdditionalSlides: 14,
      grabCursor: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        init: function(){
          // this.autoplay.stop();
        },
        imagesReady: function(){
          this.el.classList.remove('loading');
          // this.autoplay.start();
        },
        slideChangeTransitionEnd: function(){
          let swiper = this,
              captions = swiper.el.querySelectorAll('.caption');
          for (let i = 0; i < captions.length; ++i) {
            captions[i].classList.remove('show');
          }
          swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
        },
        progress: function(){
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            let slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;
           
            swiper.slides[i].querySelector(".slide-bgimg").style.transform =
              "translateX(" + innerTranslate + "px)";
          }
        },
        touchStart: function() {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },
        setTransition: function(speed) {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".slide-bgimg").style.transition =
              speed + "ms";
          }
        }
      }
    };
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

// Navigation Slider
let navSliderOptions = {
      loop: true,
      loopAdditionalSlides: 10,
      speed:1000,
      spaceBetween: 5,
      slidesPerView: 5,
      centeredSlides : true,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      direction: 'vertical',
      on: {
        imagesReady: function(){
          this.el.classList.remove('loading');
        },
        click: function(){
          mainSlider.autoplay.stop();
        }
      }
    };
let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;
// let activeCard = null;
// let audio= null;


// const showPhoto = (e) => {

//     activeCard = e.target;
//     console.log('the active element is:', activeCard);


 
//     const clickedImageBackground = activeCard.style.backgroundImage;
//     document.querySelector('.featured_image').style.backgroundImage=clickedImageBackground;


//     document.querySelector('.preview').className = 'preview active';
//     };


// const cards = document.querySelectorAll('.card');
// for (card of cards) {
//     card.onclick = showPhoto;
// }


// const close = () => {
//   document.querySelector('.preview').className= 'preview';
//   audio.pause();

// };

// document.querySelector('.close').onclick = close;



// const next = () => {
//   activeCard = activeCard.nextElementSibling;
//   if (!activeCard) {
//     activeCard=cards[0];
    
//   }
//   console.log(activeCard.nextElementSibling);
//   const clickedImageBackground = activeCard.style.backgroundImage;
//   document.querySelector('.featured_image').style.backgroundImage=clickedImageBackground;
//   audio.pause();

    
// };

// document.querySelector('.next').onclick = next;



// const prev = () => {
//   activeCard = activeCard.previousElementSibling;
//   if (!activeCard) {
//   activeCard=cards[cards.length-1];

//   }
//   console.log(activeCard.previousElementSibling);
//   const clickedImageBackground = activeCard.style.backgroundImage;
//   document.querySelector('.featured_image').style.backgroundImage=clickedImageBackground;
//   audio.pause();


// };

// document.querySelector('.prev').onclick = prev;

// var button = document.getElementById("play");

// button.addEventListener("click", function playAudio(){
//   if (activeCard===cards[0])
//     {
//       audio = document.getElementById("cover");
//       audio.play()
//   };
//   if (activeCard===cards[1]){
//     audio = document.getElementById("audio1");
//       audio.play()
//   };
//   if (activeCard===cards[2]){
//     audio = document.getElementById("audio2");
//       audio.play()
//   };
//   if (activeCard===cards[3]){
//     audio = document.getElementById("audio3");
//       audio.play()
//   };
//   if (activeCard===cards[4]){
//     audio = document.getElementById("audio4");
//       audio.play()
//   };
//   if (activeCard===cards[5]){
//     audio = document.getElementById("audio5");
//       audio.play()
//   };
//   if (activeCard===cards[6]){
//     audio = document.getElementById("audiop1a");
//       audio.play()
//   };
//   if (activeCard===cards[7]){
//     audio = document.getElementById("audiop1b");
//       audio.play()
//   };
//   if (activeCard===cards[8]){
//     audio = document.getElementById("audiop1c");
//       audio.play()
//   };
//   if (activeCard===cards[9]){
//     audio = document.getElementById("audiop1d");
//       audio.play()
//   };
//   if (activeCard===cards[10]){
//     audio = document.getElementById("audiop2a");
//       audio.play()
//   };
//   if (activeCard===cards[11]){
//     audio = document.getElementById("audiop2b");
//       audio.play()
//   };
//   if (activeCard===cards[12]){
//     audio = document.getElementById("audiop2c");
//       audio.play()
//   };
//   if (activeCard===cards[13]){
//     audio = document.getElementById("audiop2d");
//       audio.play()
//   };
//   if (activeCard===cards[14]){
//     audio = document.getElementById("audio8");
//       audio.play()
//   };

// });
// playAudio();





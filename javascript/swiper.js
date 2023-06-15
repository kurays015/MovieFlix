const swiper = new Swiper(".swiper", {
  autoplay: {
    delay: 3000,
  },
  
  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 10, 

  pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

});



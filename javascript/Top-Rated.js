const topRatedContainer = document.querySelector('.top-rated')

//render top rated on the webpage
function renderTopRated(topRatedData, genresList) {
   //when searching, the rendered movies will change
   topRatedContainer.innerHTML = '';
  
   //movie array
   const movies = topRatedData.results;
  //iterate movies variable (array)
  movies.map(movie => {

    //movie poster
    const image_base_url = 'https://image.tmdb.org/t/p/'
    const imageSize = 'original'
    const imageSource = image_base_url + imageSize + movie.poster_path;

    const movieCard = `
      <div class="top-rated-card">
        <img class="hover" src="${imageSource}">   
      </div>
      `
      topRatedContainer.innerHTML += movieCard;
  });

 //Each movie card modal
    const cardClicked = document.querySelectorAll('.top-rated-card')
    const movieCardModal = document.querySelector('.modal')
  
    //iterate each movie cards
    cardClicked.forEach((cards, index) => {
      //and add a click event each cards
      cards.addEventListener('click', () => {
  
        //get movie data
        const movie = movies[index];    
        //get the genre array
        const genreID = movie.genre_ids;
        //iterate to genre array
        const genreNames = genreID.map(genreId => {
          
          const genreList = genresList ? genresList.genres : '';

          let genreName = '';
        
          for (const genre of genreList) {
            if (genre.id === genreId) {
              genreName = genre.name;
              break;
            } else if(genre.id !== genreId) {
              genreName = ''
            }
          }
          return genreName;
        }).join(' • ');
  
        //appending all of the movie details in modal
        document.querySelector('.modal-title').innerHTML = `${movie.title}`
        document.querySelector('.overview').innerHTML = `${movie.overview}`
        document.querySelector('.release-date').innerHTML = `${movie.release_date}`
        document.querySelector('.popularity').innerHTML = `${Math.round(movie.popularity)}`
        document.querySelector('.modal-genres').innerHTML = `${genreNames}`
  
        movieCardModal.showModal();
        movieCardModal.classList.add('zoom-in');
  
  
        //get data from getTrailers fetched data and pass movie.id as argument
        getTrailers(movie.id).then(data => {

          data.results.map(data => {
            if(data.name === 'Official Trailer') {
              const key = data.key;
              const youtubeURL = `https://www.youtube.com/embed/${key}?list=RDweeCDJ5kzbI`  
              
              //render youtube video
              document.querySelector('.trailer-container').innerHTML = `<iframe src="${youtubeURL}"  frameborder="0" allowfullscreen></iframe>`
            }
          });
        });   
      })
    })
  
  
    //close modal
    const modalClose = document.querySelector('.modal-close')
  
    modalClose.addEventListener('click', () => { 
      movieCardModal.classList.add('zoom-out')
  
      movieCardModal.addEventListener('animationend', () => {
        movieCardModal.close();
        movieCardModal.classList.remove('zoom-out')
      }, { once: true })        
    })
}
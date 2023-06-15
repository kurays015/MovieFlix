const base_url = 'https://api.themoviedb.org/3'
const api_key = '5e8b9e4f3d246ecf770aa76bb470e4c8'
const form = document.querySelector('form')
const movieSearch = document.querySelector('#movie-search')
const categories = document.querySelectorAll('.swiper-slide h1')



//search movie
movieSearch.addEventListener('input', () => {
  form.addEventListener('submit', e =>  e.preventDefault())

  categories.forEach(category => {
    if(movieSearch.value === '') {
      location.reload()
    } else if(movieSearch.value !== '') {
      category.style.display = 'none'
    }
  })

  //input value - kung ano naitype
  const movie = form.movie.value;


  //pass the movie as searchMovie argument
  searchMovie(movie)

 
});



//search movie endpoint
const searchMovie = async (movie) => {
  try {
    const response = await fetch(`${base_url}/search/movie?query=${movie}&api_key=${api_key}`) 
    const data = await response.json()
    
    //pass data as argument to renderMovies
    renderPopular(data)
    renderTopRated(data)
    renderUpcoming(data)

  } catch(error) {
    console.log(error)
  }
}

//getMovie endpoint
const getMovies = async () => {

  try {
    //popular movies
    const popularResponse = await fetch(`${base_url}/movie/popular?api_key=${api_key}`)
    const popularData = await popularResponse.json();

    //movie genres
    const genresResponse = await fetch(`${base_url}/genre/movie/list?api_key=${api_key}`)
    const genresData = await genresResponse.json()

    // top rated movies
    const topRatedResponse = await fetch(`${base_url}/movie/top_rated?api_key=${api_key}`)
    const topRatedData = await topRatedResponse.json()

    //upcoming movies
    const upcomingResponse = await fetch(`${base_url}/movie/upcoming?api_key=${api_key}`)
    const upcomingData = await upcomingResponse.json()
    
    //pass data, genresData as argument to render function
    renderPopular(popularData, genresData)
    renderTopRated(topRatedData, genresData)
    renderUpcoming(upcomingData, genresData)

  } catch(error) {
    console.log(error)

  }
}
getMovies()

    
//getTrailers endpoint
const getTrailers = (movie_id) => {
  return fetch(`${base_url}/movie/${movie_id}/videos?api_key=${api_key}`)
    .then(response => response.json())
    .catch(error => {
      throw new Error(`Failed to fetch trailers: ${error}`);
    });
};



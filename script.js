fetch('https://yts.mx/api/v2/list_movies.json')
.then((data)=>{
    // console.log(data);
    return data.json();
}).then((completedata)=>{
    // console.log(completedata.data.movies);
    // document.write(completedata.data.movies[2].title);

    let data1 = "";

    completedata.data.movies.map((values)=>{
        data1 += `<div class="card">
                    <h2 class="title">${values.title}</h2>
                    <img src=${values.large_cover_image} alt="img" class="images">
                    <input type = "hidden" value="${values.id}">
                    <div>
                    <button class="btn">Download Movie</Button>
                    </div>
                </div>`

            });
            

document.getElementById('cards').innerHTML = data1;

});


//search data
const searchForm = document.querySelector('#search');
const searchQuery = document.querySelector('#query');


searchForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const searchHeading = document.querySelector('#searchHeading');
    const movieTerm = searchQuery.value;

    if(movieTerm !== "") {
        searchMovie(movieTerm);
        searchHeading.style.display = "block";
        searchHeading.innerHTML = `Searching For: <span>${movieTerm}</span>`;
    }
    else {
        alert('enter any keyword...');
        return false;
    }
});


const searchMovie = (movie) => {
    fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${movie}`)
.then((data)=>{
    // console.log(data);
    return data.json();
}).then((completedata)=>{
    // console.log(completedata.data.movies);
    // document.write(completedata.data.movies[2].title);
    

    let data1 = "";

    completedata.data.movies.map((values)=>{
        data1 += `<div class="card">
                    <h2 class="title">${values.title}</h2>
                    <img src=${values.large_cover_image} alt="img" class="images">
                    <input type = "hidden" value="${values.id}">
                    <div>
                    <button class="btn">Download Movie</Button>
                    </div>
                </div>`

            });
            

document.getElementById('cards').innerHTML = data1;

});
}






//download movie
const overlay = document.querySelector('.Overlay');
const resDiv = document.querySelector('#cards');
const infoDiv = document.querySelector('.info');
const closeBtn = document.querySelector('#closeOverlay'); 


closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.setAttribute('style', 'overflow:auto');
  });

resDiv.addEventListener('click', (e) => {

    if (e.target.className == "btn") {
      const movieID = e.target.parentElement.parentElement.children[2].value;
      document.body.setAttribute('style', 'overflow:hidden');
      overlay.style.display = 'block';
  
      getMovieById(movieID);
    }
  
  });

  const getMovieById = (id) => {

    fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then(response => {
        return response.json();
      })
      .then(movieData => {
        const movieObj = movieData.data.movie;
        let Output = '';
  
  
        Output += `
  
            <div class="movie-thumbnail">
              <img src="${movieObj.medium_cover_image}" alt="${movieObj.title}">
            </div>
  
            <div class="movie-details">
              <h1 title="${movieObj.title}">${movieObj.title_english}</h1> 
              <p>${movieObj.description_full}</p>
  
              <ul>
              ${movieObj.torrents.map(torrent => `
              <li>Download: <a href="${torrent.url}">${torrent.url}</a></li>
              <li>Quality: ${torrent.quality} | Type: ${torrent.type} | Size: ${torrent.size} | Seeds: ${torrent.seeds} | Peers: ${torrent.peers}</li>
              <hr>
  
              `).join('')}
              </ul>
  
              <h2>Movie Trailer</h2>
              <div class="trailer">
              
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${movieObj.yt_trailer_code}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          
          `;
  
  
        infoDiv.innerHTML = Output;
  
  
      })
      .catch(error => {
        console.log(`There is an Error: ${error}`);
      });
  
  
  }
  

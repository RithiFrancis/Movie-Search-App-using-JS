let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search");
let result = document.getElementById("result");

let getMovie = async () => {
  let movieName = await movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=3d4344ba`;
  if (movieName.length <= 0) {
    result.innerHTML = '<h3 class="msg">Please Enter Movie Name</h3>';
  } else {
    await fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        if (data.Response == "True") {
          result.innerHTML = `
                  <div class="info">
                      <img src="${data.Poster}" class="poster">
                      <div>
                          <h2>${data.Title}</h2>
                          <div class="rating">
                              <img src="star_1.png">
                              <h4>${data.imdbRating}</h4>
                          </div>
                          <div class="details">
                              <span>${data.Rated}</span>
                              <span>${data.Year}</span>
                              <span>${data.Runtime}</span>
                          </div>
                          <div class="genre">
                              <div>${data.Genre.split(",").join(
                                "</div><div>"
                              )}</div>
                          </div>
                      </div>
                  </div>
                  <h3>Plot:</h3>
                  <p>${data.Plot}</p>
                  <h3>Cast:</h3>
                  <p>${data.Actors}</p>    
                `;
        } else {
          console.error("API Error", data.Error);
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);

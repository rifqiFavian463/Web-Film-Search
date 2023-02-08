document.querySelector(".search-button").addEventListener("click", () => {
  let searchInput = document.querySelector(".search-input").value;
  let result = fetch(`https://www.omdbapi.com/?apikey=e10d17d9&s=${searchInput}`);
  result
    .then((e) => e.json())
    .then((m) => {
      let movArray = m.Search;
      let result = "";
      movArray.forEach((m) => {
        result += `<div class="col-md-4 mt-3">
                    <div class="card" style="width: 18rem">
                      <img src="${m.Poster}"  class="card-img-top" />
                      <div class="card-body">
                        <h5 class="card-text">Title : ${m.Title}</h5>
                        <p class="card-text">Year : ${m.Year}</p>
                        <a href="#"  class="btn btn-primary details-button" data-bs-toggle="modal" data-bs-target="#moviesDetails" data-id="${m.imdbID}">Show Details</a>
                      </div>
                    </div>  
                  </div>`;
      });
      document.querySelector(".cards-body").innerHTML = result;
      let button = document.querySelectorAll(".details-button");
      for (i = 0; i < button.length; i++) {
        button[i].addEventListener("click", (e) => {
          fetch(`https://www.omdbapi.com/?apikey=e10d17d9&i=${e.target.dataset.id}`)
            .then((e) => e.json())
            .then((d) => {
              let details = `<div class="row">
                              <img src="${d.Poster}" class="col-md-4" />
                              <div class="col-md">
                              <ul class="list-group">
                                <li class="list-group-item">Title : ${d.Title}</li>
                                <li class="list-group-item">Year : ${d.Year}</li>
                                <li class="list-group-item">Genre : ${d.Genre}</li>
                                <li class="list-group-item">Actors : ${d.Actors}</li>
                                <li class="list-group-item">Synopsis : ${d.Plot}</li>
                              </ul>
                              </div>
                            </div>`;
              document.querySelector(".modal-body").innerHTML = details;
            });
        });
      }
    });
});

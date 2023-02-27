const searchAllData = (id) => {
  const inputElement = document.getElementById("search-value");

  //to remove the right sided player details when click the search button
  document.getElementById("single-player-details").innerHTML = "";

  //to remove the right sided male players image
  document.getElementById("males").classList.add("d-none");

  //to remove the right sided female players image
  document.getElementById("females").classList.add("d-none");
  const inputValue = inputElement.value;
  //   console.log(inputValue);

  //show spinner when click in the search button
  document.getElementById("spinner").classList.remove("d-none");

  const searchId = id || inputValue;

  const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchId}`;
  //   console.log(URL);

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      //remove spinner when get the data
      document.getElementById("spinner").classList.add("d-none");
      showPlayerData(data.player);
    });
};

const showPlayerData = (players) => {
  console.log(players);

  //to empty the search field
  document.getElementById("search-value").value = "";
  const container = document.getElementById("player-info");

  //to remove the previous data
  container.innerHTML = "";
  players.forEach((player) => {
    // console.log(player);

    //destructuring data
    const { strThumb, strPlayer, strNationality, strPosition, idPlayer } =
      player;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
      <img src="${
        strThumb ? strThumb : "https://picsum.photos/500/300?random=1"
      }" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title fw-bold">${strPlayer}</h5>
        <p> <span class="fw-semibold">${strPosition}</p>
        <p class="fs-6 fw-bold"> <span class="fw-semibold">${strNationality}</p>
        <button onclick="singlePlayer('${idPlayer}')" type="button" class="btn btn-outline-success">Details</button>
        <button type="button" class="btn btn-outline-danger">Delete</button>
      </div>
    </div>

`;
    container.appendChild(div);
  });
};

const singlePlayer = (id) => {
  //   console.log(id);

  const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id= ${id}`;
  console.log(URL);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showSinglePlayer(data.players[0]));
};

// showing single player data on the right side by clicking Details button
const showSinglePlayer = (data) => {
  // console.log(data);

  //destructuring data
  const { strThumb, strPlayer, strDescriptionEN } = data;
  const container = document.getElementById("single-player-details");
  const div = document.createElement("div");
  if (data.strGender === "Male") {
    document.getElementById("males").classList.remove("d-none");
  } else {
    document.getElementById("females").classList.remove("d-none");
  }
  container.innerHTML = "";
  div.innerHTML = `
  <div class="card mb-3 w-100 h-100">
  <div class="row g-0">
    <div class="col-md-4">
    <img src="${
      strThumb ? strThumb : "https://picsum.photos/500/300?random=1"
    }" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="">${strPlayer}</h5>
        <p class="card-text">${strDescriptionEN.slice(0, 100) + "..."}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
  `;
  container.appendChild(div);
};
searchAllData("messi");

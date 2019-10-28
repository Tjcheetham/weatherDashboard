// variables
var searchList = $("#search-list");
var searchInput = $(".search-text");
var searchForm = $(".search-form");
var searchBtn = $("#button-addon2");

//array to be populated by previous searches
var searches = [];

function renderSearches() {
    searchList.innerHTML = ""

    for (var i = 0; i<searches.length; i++){
        var search = searches[i];

        var li = $("<li>");
        li.textContent = search;
        searchList.appendChild(li);
    }
}

function init() {
    var storedSearches = JSON.parse(localStorage.getItem("searches"));

    if (storedSearches !== null) {
        searches = storedSearches;
    }

    renderSearches();
}

function storeSearches() {
localStorage.setItem("searches", JSON.stringify(searches));
}


$("#button-addon2").on("click", function (event) {
    console.log("test");
    console.log("clicked")
// };
// searchBtn.on("click", function (event) {
//     console.log("clicked");
//     event.preventDefault();

    searchText = searchInput.value.trim();

    if (searchText === "") {
        return;
    }

    searches.push(searchText);
    searchInput.value = "";

    storeSearches();
    renderSearches();
});


var $city = $(".city")
var $humidity = $(".humidity")
var $temp = $(".temp")
var $wind = $(".wind")
var $uvi = $(".uvi")

// API Key
  var APIKey = "b617b7ae5bf5ab122b3261fcb3bec20d";

  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "Atlanta" + "&units=imperial&appid=" + APIKey;

//   // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
    url: queryURL,
    method: "GET"
  })
//     // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

//       // Log the queryURL
      console.log(queryURL);
   
//       // Log the resulting object
      console.log(response);


      
      // Transfer content to HTML
      $(".city").html("<h2>" + response.name + "</h2>");
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temperature (F) " + response.main.temp);
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".uvi").text("UV Index: " + response.uvindex);

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    });

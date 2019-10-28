// variables
var searchList = $("#search-list");
var searchInput = $(".search-text");
var searchForm = $(".search-form");
var searchBtn = $("#button-addon2");

//array to be populated by previous searches
var searches = [];

//creating a function to make the searchList (li) innerHTML set to a blank string???
function renderSearches() {
    searchList.innerHTML = ""

//creating loop of all searches
    for (var i = 0; i<searches.length; i++){
        var search = searches[i];

//creating li element
        var li = $("<li>");
//grabbing populated array and appending it to each new li element to the searchList
        li.textContent = search;
        li.setAttribute("data-index", i);
        searchList.appendChild(li);
    }
}

//creating an initializing function
function init() {

// Get stored todos from localStorage
  // Parsing the JSON string to an object
    var storedSearches = JSON.parse(localStorage.getItem("searches"));

// If todos were retrieved from localStorage, update the todos array to it
    if (storedSearches !== null) {
        searches = storedSearches;
    }

//running function
    renderSearches();
}

// Stringify and set "searches" key in localStorage to searches array
function storeSearches() {
localStorage.setItem("searches", JSON.stringify(searches));
}

//adding event listener to search button
$("#button-addon2").on("click", function (event) {
    console.log("clicked");
    event.preventDefault();   

//grabbing the searchInput value, trimming, and turing into a variable
   var searchText = searchInput.val.trim();

//if the searchText is blank, return
    if (searchText === "") {
        return;
    }

//pushing searchText into the array "searches"    
    searches.push(searchText);

//search input is displayed as blank
    searchInput.val = "";

//running functions
    storeSearches();
    renderSearches();
});

//variables
var $city = $(".city");
var $humidity = $(".humidity");
var $temp = $(".temp");
var $wind = $(".wind");
var $uvi = $(".uvi");

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

    //   function myFunction() {
        var d = new Date();
        var n = d.toLocaleDateString();
    //     document.getElementById("demo").innerHTML = n;
    //   }
      
      // Transfer content to HTML
      $(".city").html("<h2>" + response.name + " (" + n + ")" + "</h2>");
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temperature (F) " + response.main.temp);
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".uvi").text("UV Index: " + response.uvindex);
    })

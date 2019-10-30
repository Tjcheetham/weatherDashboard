// variables
var searchList = $("#search-list");
var searchInput = $("#search-text");
var searchForm = $(".search-form");
var searchBtn = $("#button-addon2");
var searchText = '';
var weatherIcon = $("#weatherIcon");

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
        li.text(search);
        li.attr("data-index", i);
        searchList.prepend(li);
    }
    var $city = $(".city");
var $humidity = $(".humidity");
var $temp = $(".temp");
var $wind = $(".wind");
var $uvi = $(".uvi");

if (searchText == ""){
    searchText="Scottsdale";
}

// API Key
var APIKey = "b617b7ae5bf5ab122b3261fcb3bec20d";
  console.log(searchText)
  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&units=imperial&appid=" + APIKey;

  
  
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
        
        //Log city id
    console.log(response.id);
    var cityID = (response.id)
    
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
    
    $.ajax({
        url: queryURL2,
          method: "GET"
        })
        
        .then(function (response2) {
            
          console.log(queryURL2);
          
          //       // Log the resulting object
          console.log(response2);
      });

    //   function myFunction() {
        var d = new Date();
        var n = d.toLocaleDateString();
        weatherIcon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        //   }
        
        // Transfer content to HTML
        $(".city").html("<h2>" + response.name + " (" + n + ")" + "</h2>");
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".uvi").text("UV Index: " + response.value);
        $(".dayplus1-date").text(response2.list[0].dt_txt);
        $(".dayPlus1-icon").text(response2.list[0].weather.icon);
        $(".dayPlus1-temp").text(response2.list[0].main.temp);
        $(".dayPlus1-humidity").text(response2.list[0].main.humidity);
        searchInput.val("");
    })
    
    //Forecast URL
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
$("#my-search-form").on("submit", function (event) {
    console.log("clicked");
    event.preventDefault();
    searchList.empty();

//grabbing the searchInput value, trimming, and turing into a variable
   searchText = searchInput.val().trim();

//if the searchText is blank, return
    if (searchText === "") {
        return;
    }

//pushing searchText into the array "searches"    
    searches.push(searchText);

//search input is displayed as blank
//    searchInput.val = "";

//running functions
    storeSearches();
    renderSearches();
});

$("#search-list").val(localStorage.getItem(searchInput));

renderSearches();

//localstorage.getitem to pull on refresh
//max number of list items stored
//can click on recently searched

//5-day Forecast

//UV Index
//Color Code based on conditional statements
//Use removeclass/addclass
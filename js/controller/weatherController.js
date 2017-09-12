angular.module('weatherApp', [])
      .controller('weatherController', weatherController);

      weatherController.$inject = ['$scope', '$http'];

      function weatherController($scope, $http){
          const vm = this;
           vm.headings = {
              mheading:"Open weather API project",
              subheading: "A freeCodeCamp Project"
            };

            $http.get("http://ip-api.com/json")//get your position
              .success(function(data){
               lat = data.lat;
               lon = data.lon;

               const apiKey = "use your API key";
               const openWeatherURL =
               "http://api.openweathermap.org/data/2.5/weather?lat="
               +lat + "&lon="+lon+ "&appid=" +apiKey;
               

               $http.get(openWeatherURL)
                .success(function(data){
                    // console.log(openWeatherURL);
                    const wicon = "http://openweathermap.org/img/w/" + data.weather[0].icon;

                    vm.description = data.weather[0].description;
                    vm.speed = (1.85*data.wind.speed).toFixed(1) + " km/h";
                    vm.location = data.name;
                    vm.temp = data.main.temp
                    vm.tempC = (vm.temp - 273).toFixed(1) + "° C";
                    vm.tempF = (5/9*(vm.temp-273) + 32).toFixed(1) + "° F";
                    vm.icon = wicon + ".png";
                });
             });
      
      }

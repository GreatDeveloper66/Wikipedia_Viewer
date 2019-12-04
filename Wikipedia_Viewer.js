$(document).ready(function() {
  var getWikiData = function() {
    var title = $("input:text").val();
    var searchTerm = $("input:text").val().replace(/\s/g, "%20");
    

    var baseURL = "https://en.wikipedia.org/w/api.php?";
    var action = "action=opensearch";
    var search = "search=";
    var titles = "titles=";
    var format = "format=json";
    var callback = "callback=?";
    var api =
      baseURL +
      action +
      "&" +
      search +
      searchTerm +
      "&" +
      format +
      "&" +
      callback;

    
    $.ajax({
      type: "GET",
      url: api,
      jsonp: "callback",
      dataType: "jsonp",
      error: function(data) {
        alert("API didn't work");
      },
      success: function(data) {
        var link;
        var header;
        var snippet;
        var newHTML = "";

        for (var i = 0; i < data[1].length; i++) {
          link = data[3][i];
          header = data[1][i];
          snippet = data[2][i];
          newHTML +=
            '<a href="'+
            link+
            '" target="_blank">'+
            '<div class="container-fluid">' +
            '<div class="row">' +
            '<div class="col-xs-12 col-md-4 col-md-offset-5">' +
            '<div class="w3-container">' +
            '<div class="w3-card-4">' +
            '<header class="w3-container w3-blue" id="title">' +
            '<h1>' +
            header +
            '</h1>' +
            '</header>' +
            '<div class="w3-container" id="snip">' +
            snippet +
            '</div></div></div></div></div></div>'+
            '</a>';
        }
        $("#searchresults").html(newHTML);
      }
    });
  };

  

  $("#searchButton").click(getWikiData);

  
   
});

const RSS_URL = `https://anchor.fm/s/74a1080/podcast/rss`;
//const RSS_URL = `https://anchor.fm/s/9a9550c/podcast/rss`;

$.ajax(RSS_URL, {
    accepts: {
      xml: "application/rss+xml"
    },
  
    dataType: "xml",
  
    success: function(mydata) {
      $(mydata)
        .find("item")
        
        .each(function() {
          const eli = $(this);
          
          var author = $(mydata).find("channel>author").text();
          var rssSource2 =eli.find("enclosure").attr("url");
          const template2 = `
          
          <div class="container margins">
              <div class="row rowborders">
                <div class="col-2">
                <img class="myimage2 image" src='${eli.find("itunes\\3Aimage").attr("href")}');>
                <a class="btn small playpad" rel="${rssSource2}" title="${eli.find("title").text()}" alt="${eli.find("pubDate").text()}"><span class="icon-play"></span> <span> Play</span></a>
              </div>
          <div class="col-10">
          <h5 class="font-weight-light">${eli.find("title").text()}</h5>
          <div class="text-white mb-3"><span class="text-black-opacity-06"><small>By ${author}<span class="sep">/</span>${eli.find("pubDate").text()} </small></span></div>
          <div class="smaller">${eli.find("description").text()}</div>
  
          </div>
            </div>
          </div>`;
          document.getElementById("mycast2").insertAdjacentHTML("beforeend", template2);
        });
    }
    });

const RSS_URL = `https://anchor.fm/s/74a1080/podcast/rss`;
//const RSS_URL = `https://anchor.fm/s/9a9550c/podcast/rss`;

$.ajax(RSS_URL, {
  accepts: {
    xml: "application/rss+xml"
  },

  dataType: "xml",

  success: function(data) {
    $(data)
      .find("item").first()
      
      .each(function() {
        const el = $(this);
        
        var author = $(data).find("channel>author").text();
        var category="Spirituality";

        const template = `

      <header>
      <div class="overlay"></div>
      <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
        <!--source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4"-->
        <source src="images/cliff.mp4" type="video/mp4">
      </video>
      <div class="container h-100">
        <div class="d-flex h-100 text-left align-items-center">
          <div class="w-100 text-white">
          <div class="row">
          <div class="col-0">
          <!--img class="myimage image" src='${$(data).find("channel>itunes\\3Aimage").attr("href")}');-->
        </div>
    <div class="col-8">
    <h3 class="font-weight-light">${author}</h3>
    <div class="text-white mb-3"><span class="text-black-opacity-06"><small>By ${author}<span class="sep"> | </span>${category} </small></span></div>
    <p class="mb-4"><small class="text-white small">${$(data).find("channel>itunes\\3Asummary").text()}</small></p>
        </div>
      </div>
          </div>
        </div>
      </div>
    </header>
        
        `;

var rssSource =el.find("enclosure").attr("url");
//var bgimg = el.find("itunes\\3Aimage").attr("href");
var bgimg = $(data).find("channel>itunes\\3Aimage").attr("href");
$("#author").text($(data).find("channel>author").text()+" Podcast");
//$("#rssPodName").text($(data).find("channel>author").text());
$("#mainEpisode").html(el.find("title").text());
$("#player21_html5").attr("src",  rssSource );
$(".myauthor").text(author);
$(".pubdate").text(el.find("pubDate").text())

$("#rec_img").attr("src", el.find("itunes\\3Aimage").attr("href"))
var rec_desc=el.find("title").text();
var shortText2 = jQuery.trim(rec_desc).substring(0, 40)
.trim(this) + "...";
$("#rec_desc").text(shortText2);

document.getElementById("mycast").insertAdjacentHTML("beforeend", template);
});

}

});
var counter=-1;
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
        var descr = eli.find("description").text();
        var shortText = jQuery.trim(descr).substring(0, 260)
                          .trim(this) + "...";
        var shortText2 = jQuery.trim(descr).substring(0, 100)
                          .trim(this) + "...";
        const template2 = `
        
        <div class="container margins">
            <div class="row rowborders">
              <div class="col-lg-2 mb-3 col-sm-12">
              <img class="myimage2 image" src='${eli.find("itunes\\3Aimage").attr("href")}');>
              <a id="btn-play" class="btn small playpad" rel="${rssSource2}" title="${eli.find("title").text()}" alt="${eli.find("pubDate").text()}"><span class="icon-play"></span> <span> Play</span></a>
            </div>
        <div class="col-lg-10 col-sm-12">
        <h5 class="font-weight-light">${eli.find("title").text()}</h5>
        <div class="text-white mb-3"><span class="text-black-opacity-06"><small>By ${author}<span class="sep"> |</span>${eli.find("pubDate").text()} </small></span></div>
        <div class="smaller">${shortText}</div>

        </div>
          </div>
        </div>`;

       
        document.getElementById("mycast2").insertAdjacentHTML("beforeend", template2);


        $("a.playpad").click(function(){
          
          var strTitle=$(this).attr("title");
          var strPubdate=$(this).attr("alt");
          $("#player21_html5").attr("src",  $(this).attr("rel"));
          $("#mainEpisode").text(strTitle);
          $(".pubdate").text(strPubdate);
          $("#playbtn").click();
          if($(".mejs__controls div").hasClass("mejs__button mejs__playpause-button mejs__pause")){
            $("#playbtn2").text("Pause");
            $("#playicon").removeClass("icon-play");
            $("#playicon").addClass("icon-pause"); 
          }
          $(".close").click();
        });
      });
      
      }
      
      });



      
      $(document).ready(function(){
  
        $("#playbtn").click(function(){
          $(".mejs__playpause-button button").click();
          if($(".mejs__controls div").hasClass("mejs__button mejs__playpause-button mejs__play")){
            $("#playbtn2").text("Pause");
            $("#playicon").removeClass("icon-play");
            $("#playicon").addClass("icon-pause");
          }else{
            $("#playbtn2").text("Play");
            $("#playicon").removeClass("icon-pause");
            $("#playicon").addClass("icon-play");    
          }
         
          //}
          //$("#playbtn2").text(function(i, text){
          //return text === "Pause" ? "Play" : "Pause";
          //})
          //$("#playicon").toggleClass('icon-play icon-pause');
        });
      
        
      });
      

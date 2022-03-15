const RSS_URL = `https://anchor.fm/s/74a1080/podcast/rss`;
$.ajax(RSS_URL, {
  accepts: {
    xml: "application/rss+xml"
  },
  dataType: "xml",
  success: function(data) {
    const myitems = $(data).find("item");
    for(i = 0; i < myitems.length; i++){

        //Hero and Modal Video  
        let author = $(data).find("channel>author").text();
        let category="Spirituality";
        let rssSource = $(myitems[0]).find("enclosure").attr("url");

        //Video Modal 
        let vidText  = `<small>By ${author}<span class="sep"> | </span>${category} </small>`;
        let vidSummary = `${$(data).find("channel>itunes\\3Asummary").text()}`
    
        $("#author").text(author+" Podcast");
        $("#mainEpisode").html($(myitems[0]).find("title").text());
        $("#player21_html5").attr("src",  rssSource );
        $(".myauthor").text(author);
        $(".pubdate").text($(myitems[0]).find("pubDate").text())
        
        //Video modal
        $("#vidText").html(vidText);
        $("#vidAuthor").text(author);
        $("#vidSummary").html(vidSummary);

        //Modal Playlist
        let rssSource2 =$(myitems[i]).find("enclosure").attr("url");
        let descr = $(myitems[i]).find("description").text();
        let shortText = jQuery.trim(descr).substring(0, 260).trim(this) + "...";
        let modalTitle = $(myitems[i]).find("title").text();
        let modalPubDate = $(myitems[i]).find("pubDate").text()
        let modalImage = $(myitems[i]).find("itunes\\3Aimage").attr("href")

        

        const modalTemplate = `
        <div class="container margins david">
            <div class="row rowborders">
              <div class="col-lg-2 mb-3 col-sm-12">
              <img class="myimage2 image" src='${modalImage}');>
              <a href="#mainTop" id="btn-play" class="btn small playpad" rel="${rssSource2}" title="${modalTitle}" alt="${modalPubDate}"><span class="icon-play"></span> <span> Play</span></a>
            </div>
        <div class="col-lg-10 col-sm-12">
        <h5 class="font-weight-light head5">${modalTitle}</h5>
        <div class="text-white mb-3"><span class="text-black-opacity-06"><small>By ${author}<span class="sep"> |</span>${modalPubDate} </small></span></div>
        <div class="smaller">${shortText}</div>

        </div>
          </div>
        </div>`;
        document.getElementById("mycast2").insertAdjacentHTML("beforeend", modalTemplate);

        $("a.playpad").click(function(){
          
          let strTitle=$(this).attr("title");
          let strPubdate=$(this).attr("alt");
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
  }

        for(ri = 0; ri < 3; ri++){
          let rec_desc=$(myitems[ri]).find("title").text();
          let shortText2 = jQuery.trim(rec_desc).substring(0, 40).trim(this) + "...";
          let recImage = $(myitems[ri]).find("itunes\\3Aimage").attr("href");
          let rssSource3 =$(myitems[ri]).find("enclosure").attr("url");
          let modalPubDate2 = $(myitems[ri]).find("pubDate").text()
          

          const recPodcast = `
          <li class="mb-3">
              <a href="#" data-toggle="modal" data-target="#exampleModal" class="d-flex playpad2" rel="${rssSource3}" title="${rec_desc}" alt="${modalPubDate2}">
                <figure class="image mr-4">
                  <img src="${recImage}" alt="" class="img-fluid">
                </figure>
                <div class="text">
                  <h3 class="heading font-weight-light">${shortText2}</h3>
                </div>
                </a>
          </li>
          `;
          document.getElementById("recentPodcast").insertAdjacentHTML("beforeend", recPodcast);
        }

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
        });
      
        
      });
      

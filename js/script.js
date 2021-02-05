function deviantARTGalleryPlugin(gallery_id) {
  // Inject the gallery markup
  var gallery = document.getElementById('deviantART-gallery');
  gallery.innerHTML = '<div id="gallery"></div>';

  var deviations = [];

  (function queryYQL() {
      var url = 'http://backend.deviantart.com/rss.xml?q=gallery:' + "tekofx" + '/' + gallery_id;

      window['callback'] = callback;
      var s = document.createElement('script');
      s.src = "https://api.rss2json.com/v1/api.json?callback=callback&rss_url=" + escape(url);
      document.body.appendChild(s);
      
      function callback(json) {
          var items = json.items;

          for(var i = 0, l = items.length; i < l; i++) {
              var object = {};

              object.title = items[i].title;
              object.image = items[i].enclosure.link;

              deviations.push(object);
          }

          // async function is complete, move on
          var images = '';

          for(var i = 0, l = deviations.length; i < l; i++) {
              images += '<img id="gallery_image"src="' + deviations[i].image + '" alt="' + deviations[i].title + '"/>';
          }

          document.getElementById('gallery').innerHTML = images;
      }
  })();

}


function select(params) {
  deviantARTGalleryPlugin(params);
  
}


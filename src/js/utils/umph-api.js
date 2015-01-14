import archive from 'archive.org';
import cheerio from 'cheerio';
import request from 'request';
import { Promise } from 'es6-promise';

const umphAPI = module.exports = {

  crawler: function() {
    let self = this;
    archive.search({q: 'taper:kevin browning'}, function(err, res) {
      self.getTrackLinks('https://archive.org/details/' + res.response.docs[0].identifier)
        .then(function(links) {
          console.log(links);
        });
    });
  },

  getTrackLinks(url) {

    let self = this,
        songs = [];

    return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (!error) {
          let $ = cheerio.load(html),
              index = $('table.fileFormats thead tr th').filter(
            function() {
              return $(this).text() === 'VBR MP3';
            }).index();

            if(index) {
              index++;
              $('table.fileFormats tbody tr td:nth-child(' + index + ') a').each( function(){
                songs.push( $(this).attr('href') );
              });

              resolve(songs);
            }
        }

      });
    });

  }

};

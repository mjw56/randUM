import archive from 'archive.org';
import cheerio from 'cheerio';
import request from 'request';
import { Promise } from 'es6-promise';

const umphAPI = module.exports = {

  getATrack: function() {
    return new Promise((resolve, reject) => {
      archive.search({q: 'taper:kevin browning'}, (err, res) => {
        var shows = res.response.docs;

        this.getTrackLinks('https://archive.org/details/' + shows[Math.floor(Math.random() * shows.length)].identifier)
          .then((links) => {
            resolve('http://archive.org' + links[Math.floor(Math.random() * links.length)]);
          });
      });
    });
  },

  getTrackLinks(url) {
    let songs = [];

    return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (!error) {
          let $ = cheerio.load(html),

          index = $('table.fileFormats thead tr th')
            .filter(function() {
              return $(this).text() === 'VBR MP3';
            }).index();

          if(index) {
            index++;

            var reg = new RegExp('^.*\.(mp3)$')

            $('table.fileFormats tbody tr td:nth-child(' + index + ') a')
              .each( function(){
                if(reg.test($(this).attr('href') ))
                  songs.push( $(this).attr('href') );
              });

            resolve(songs);
          }
        }
      });
    });
  }

};

import archive from 'archive.org';
import cheerio from 'cheerio';
import request from 'request';
import { Promise } from 'es6-promise';

const umphAPI = module.exports = {

  getATrack: function() {
    return new Promise((resolve, reject) => {
      archive.search({q: 'taper:kevin browning'}, (err, res) => {

        var shows = res.response.docs;

        var tasks = shows.map((show) => {
          return this.getTrackLinks(show);
        });

        Promise.all(tasks).then((shows) => {
          resolve(shows);
        });

      });
    });
  },

  getTrackLinks(data) {
    let url = 'https://archive.org/details/' + data.identifier,
        show = { title: data.title, songs: [] };

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

            $('table.fileFormats tbody tr')
              .each( function(){

                if(reg.test($(this).find('td:nth-child(' + index + ') a').attr('href'))) {
                  show.songs.push({
                    title: $(this).find('td:nth-child(1)').text(),
                    link: 'https://archive.org' + $(this).find('td:nth-child(' + index + ') a').attr('href')
                  });
                }
              });

            resolve(show);
          }
        }
      });
    });
  }

};

import archive from 'archive.org';
import cheerio from 'cheerio';
import request from 'request';
import { Promise } from 'es6-promise';

export default {

  getShows: function() {
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

    let url = 'https://archive.org/download/' + data.identifier,
        show = { title: data.title, songs: [] };

    return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (!error) {
          let $ = cheerio.load(html);

          $('table tbody tr').each(function() {
            if($(this).find('td:nth-child(3) b').text() === 'VBR MP3') {
              show.songs.push({
                title: $(this).find('td:nth-child(2) a').text(),
                link: 'https://archive.org' + $(this).find('td:nth-child(2) a').attr('href')
              });
            }
          });
          resolve(show);
        }
      });
    });
  }

};

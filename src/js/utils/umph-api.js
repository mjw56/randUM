import archive from 'archive.org';
import cheerio from 'cheerio';
import request from 'request';
import { Promise } from 'es6-promise';

export default {


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

    let url = 'https://archive.org/download/' + data.identifier,
        show = { title: data.title, songs: [] };

    return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (!error) {
          let $ = cheerio.load(html);


        }
      });
    });
  }

};

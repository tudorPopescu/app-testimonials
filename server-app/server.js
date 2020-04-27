const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const chalk = require('chalk');
const cors = require('cors');

const app = express();
const url = 'https://assist-software.net/testimonials/';
const mainUrl = 'https://assist-software.net';
const port = 3000;
const outputResult = {
  'title': '',
  'subtitle': '',
  'secondSubtitle': '',
  'filtersTitle': '',
  'filtersData': [],
  'user': [],
  'contact': []
};

let wasErrorOccurred = false;
let pageCounter = 0;
let usersCount = 0;

app.use(cors());

app.listen(port, function () {
  console.log(chalk.green(`\nServer is listening on port: ${chalk.underline.bold(port)}`));
});

app.get('/testimonials', (req, res) => {
  console.log(chalk.yellow(`\nScraping of ${chalk.underline.bold(url)} initiated...\n`));

  if (outputResult.user.length === 0 || wasErrorOccurred) {
    getWebsiteContent(url).then(() => res.send(outputResult));
  } else {
    return res.send(outputResult);
  }
});

const getWebsiteContent = async (url) => {
  console.log(chalk.cyan(`Scraping: ${url}`));

  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  try {
    $('.heading-content').map((i, el) => {
      outputResult['title'] = $(el).find('.page-header').text().trim();
      outputResult['subtitle'] = $(el).find('.region-highlighted p').first().text().trim();
      outputResult['secondSubtitle'] = $(el).find('.heading-content .region-highlighted p').last().text().trim();
    });

    $('.view-id-testimonial_author_filters').map((i, el) => {
      outputResult['filtersTitle'] = $(el).find('.view-content span').first().text().trim();
    });

    if (pageCounter < 1) {
      $('.view-id-testimonial_author_filters .view-content ul li').map((i, el) => {
        let id = $(el).find('.country').text().trim();
        outputResult['filtersData'].push({ id: id });
      });

      $('.region-wide').map((i, el) => {
        let title = $(el).find('h2').text().trim();
        let subtitle = $(el).find('p').text().trim();
        let button = $(el).find('a').text().trim();

        let data = {
          title: title,
          subtitle: subtitle,
          button: button
        }

        outputResult['contact'].push(data);
      });
    }

    $('.views-field-field-company').map((i, el) => {
      let id = usersCount++;
      let image = $(el).find('.img-responsive').attr('src').trim();
      let name = $(el).find('p.testimonial-author').text().trim();
      let job = $(el).find('p.testimonial-job').text().trim();
      let company = $(el).find('p.testimonial-company').text().trim();

      let countries = [];
      $(el).find('.testimonial-country .country').each((number, element) => {
        countries.push($(element).text());
      });

      let data = {
        id: id,
        image: image,
        name: name,
        job: job,
        company: company,
        countries: countries
      }

      outputResult['user'].push(data);
    });

    const nextPageLink = $('.pagination').find('span').parent().next().find('a').attr('href');
    if (nextPageLink === undefined) {
      wasErrorOccurred = false;
      return outputResult;
    }

    pageCounter++;
    getWebsiteContent(mainUrl + nextPageLink);

  } catch (error) {
    wasErrorOccurred = true;
    console.log('Error occurred ' + error);
  }
}

const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');

const app = express();
const url = 'https://assist-software.net/testimonials/';
const mainUrl = 'https://assist-software.net';
const outputFile = '../../assets/data/testimonials.json';
const port = 3000;
const pageLimit = 10
const outputResults = {
  "title": "",
  "subtitle": "",
  "secondSubtitle": "",
  "filtersTitle": "",
  "filtersData": [],
  "user": []
};

let pageCounter = 0
let resultCount = 0

app.get('/testimonials', (req, res) => {
  console.log(chalk.yellow(`\nScraping of ${chalk.underline.bold(url)} initiated...\n`));

  const getWebsiteContent = async (url) => {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    try {
      $('.heading-content').map((i, el) => {
        const title = $(el).find('.page-header').text().trim();
        const subtitle = $(el).find('.region-highlighted p').first().text().trim();
        const secondSubtitle = $(el).find('.heading-content .region-highlighted p').last().text().trim();

        outputResults["title"] = title;
        outputResults["subtitle"] = subtitle;
        outputResults["secondSubtitle"] = secondSubtitle;
      });

      $('.view-id-testimonial_author_filters').map((i, el) => {
        const filtersTitle = $(el).find('.view-content span').first().text().trim();

        outputResults["filtersTitle"] = filtersTitle;
      });

      if (pageCounter < 1) {
        $('.view-id-testimonial_author_filters .view-content ul li').map((i, el) => {
          const id = $(el).find('.country').text().trim();

          const filtersData = {
            id: id
          }

          outputResults["filtersData"].push(filtersData);
        });
      }

      $('.views-field-field-company').map((i, el) => {
        const id = resultCount++;
        const image = $(el).find('.img-responsive').attr('src').trim();
        const name = $(el).find('p.testimonial-author').text().trim();
        const job = $(el).find('p.testimonial-job').text().trim();
        const company = $(el).find('p.testimonial-company').text().trim();

        let countries = [];

        $(el).find('.testimonial-country .country').each((number, element) => {
          countries.push($(element).text());
        });

        const data = {
          id: id,
          image: image,
          name: name,
          job: job,
          company: company,
          countries: countries
        }

          outputResults["user"].push(data);
      });

      const nextPageLink = $('.pagination').find('span').parent().next().find('a').attr('href');

      if (nextPageLink === undefined) {
        return exportResults(outputResults);
      }

      console.log(chalk.cyan(`Scraping: ${mainUrl + nextPageLink}`));

      pageCounter++

      if (pageCounter === pageLimit) {
        return exportResults(outputResults);
      }

      getWebsiteContent(mainUrl + nextPageLink);

    } catch (error) {
        exportResults(outputResults);
        console.log(`${(error)}`);
    }
  }

  const exportResults = (outputResults) => {
    fs.writeFile(outputFile, JSON.stringify(outputResults, null, 4), (err) => {
      if (err) {
        console.log(`${chalk.red(err)}`);
      }
      console.log(chalk.green(`\nResults exported successfully to ${chalk.underline.bold(outputFile)}`));
    })
  }

  getWebsiteContent(url)
});

app.listen(port, function () {
  console.log(chalk.green(`\nServer is listening on port: ${chalk.underline.bold(port)}`));
});

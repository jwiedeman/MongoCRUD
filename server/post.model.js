// post.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Client = new Schema({
  "client_name": {
    "type": "String"
  },
  "business_name": {
    "type": "String"
  },
  "url": {
    "type": "String"
  },
  "url_protocol": {
    "type": "String"
  },
  "last_crawl_date": {
    "type": "String"
  },
  "sitemap": {
    "type": "Array"
  },
  "crawl_history": {
    "type": "Array"
  },
  "sitemap_generated": {
    "type": "Boolean"
  },
  "sitemap_last_refresh": {
    "type": "String"
  }
},{
    collection: 'clients'
});

module.exports = mongoose.model('Client', Client);
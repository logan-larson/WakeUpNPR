const fetch = require("node-fetch");
const parser = require("fast-xml-parser");
const open = require("open");
const he = require("he");

var options = {
  attributeNamePrefix: "",
  attrNodeName: "attr", //default is 'false'
  textNodeName: "#text",
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ["parse-me-as-string"]
};

function getWakeUp() {

  return fetch("https://feeds.npr.org/510318/podcast.xml")
    .then(response => response.text())
    .then(data => {

      var json = parser.parse(data, options);

      var item = json.rss.channel.item[0];
      var link = item.enclosure.attr.url;

      console.log(link);

      open(link, { app: 'google chrome' });

    })
}

function getHowIBuiltThis() {

  return fetch("https://feeds.npr.org/510313/podcast.xml")
    .then(response => response.text())
    .then(data => {

      var json = parser.parse(data, options);

      var item = json.rss.channel.item[0];
      var link = item.enclosure.attr.url;

      console.log(link);

      open(link);

    })
}

//getHowIBuiltThis();
getWakeUp();
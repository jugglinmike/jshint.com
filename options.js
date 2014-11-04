"use strict";

var fs = require("fs")
var dox = require('dox');


dox.setMarkedOptions({
  breaks: false
});

var options = {
  src: fs.readFileSync('o.js', { encoding: 'utf-8' }),
  parsed: require('./o.js'),
  byCategory: {
    enforcers: [],
    relaxers: [],
    environments: [],
    legacy: []
  }
};

options.annotations = dox.parseComments(options.src);

function getCategory(tags) {
  var value = null;

  tags.filter(function(tag) {
    return tag.type === 'category';
  }).forEach(function(tag) {
    if (value) {
      console.error('`category` over-specified');
      process.exit(1);
    }
    value = tag.string;
  });

  return value;
}

options.annotations.map(function(annotation) {
  var name = annotation.code.split(':')[0];
  var option = options.parsed[name];

  annotation.name = name;
  annotation.category = getCategory(annotation.tags);
  annotation.dflt = option.dflt;
  annotation.type = option.type;

  return annotation;
}).forEach(function(annotation) {
  options.byCategory[annotation.category].push(annotation);
});

function table2html(annotations) {
  var header = "<table class='options table table-bordered table-striped'>";
  var footer = "</table>";

  return header + annotations.map(function(annotation) {
    var name = annotation.name;

    return [
      "<tr>",
        "<td class='name' id='" + name + "'><a href='#" + name + "'>" + name + "</a></td>",
        "<td class='desc'>" + annotation.description.full + "</td>",
      "</tr>"
    ].join("\n");
  }).join("\n") + footer;
}

module.exports = function (site, handlebars) {
  var cats = [ "enforcers", "environments", "legacy", "relaxers" ];

  cats.forEach(function (cat) {
    handlebars.registerHelper("show-" + cat, function () {
      return new handlebars.SafeString(table2html(options.byCategory[cat]))
    })
  })

  return site
}

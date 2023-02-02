// yoinked from https://github.com/almirfilho/metalsmith-feed-atom
// © Almir Filho
const xmlbuilder = require("xml2js").Builder;
const resolve = require("url").resolve;

const build = (feedmetadata, items, destination) => {
  var builder = new xmlbuilder({
    rootName: "feed",
    xmldec: {
      encoding: "utf-8",
      standalone: false,
    },
  });
  return builder.buildObject(feeddata(feedmetadata, items, destination));
};

const feeddata = (metadata, items, feedfile) => {
  var feed = { $: { xmlns: "http://www.w3.org/2005/Atom" } };

  if (metadata.url) {
    feed.id = metadata.url;
    feed.author = metadata.author;
    feed.link = [
      { $: { href: metadata.url } },
      { $: { href: resolve(metadata.url, feedfile), rel: "self" } },
    ];
  }

  if (metadata.title) feed.title = metadata.title;
  if (metadata.subtitle) feed.subtitle = metadata.subtitle;
  feed.updated = metadata.updated || new Date().toISOString();
  feed.entry = items.map(entrydata.bind(null, metadata));

  return feed;
};

const entrydata = (metadata, item) => {
  const url = resolve(metadata.url, item.path || "");
  var entry = {
    title: item.title,
    id: url,
    link: { $: { href: url } },
    updated: item.date.toISOString(),
    author: metadata.author,
    content: { $: { type: "html" }, _: item.contents.toString() },
  };

  return entry;
};

module.exports = {
  build: build,
  feeddata: feeddata,
  entrydata: entrydata,
};

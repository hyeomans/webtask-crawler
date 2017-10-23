
## Description

I've been searching for new apartment/house for Mexico. Every time I call an agent they say that the house I want is already gone. Even though the house is gone, they never remove the post from their pages.

I created this crawler to get the newest postings per day. This crawler is composed of two webtasks.

* `crawler-webtask.js` - will run daily to fetch all entries. Each post has a unique id, if the is already present we discard it. If the id has not
been seen, then we add the date the post was crawled.
* `crawler-viewer-webtask.js` - For now is just a JSON of `{{date}: [{posts}]}`, but it's easy to add a nice layout to it.

## Crawler deployment

The following command will run it at 4:05 am (timezone of DC) every day.

`wt cron create --bundle --schedule "5 4 * * *" crawler-webtask.js --secret MONGO_URL=[fillIn]`
wt cron create --bundle --schedule "5 4 * * *" crawler-webtask.js --secret MONGO_URL=mongodb://crawler-user:cmNQ9z3qt9xR@ds227555.mlab.com:27555/webtask-crawler


## Viewer deployment

`wt create crawler-viewer-webtask.js --secret MONGO_URL=[fillIn]`

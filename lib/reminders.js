const notifier = require('node-notifier');
const path = require('path');

// String
// notifier.notify('Go empty the dishwasher!');

// Object
notifier.notify({
  'title': 'David Walsh Blog',
  'subtitle': 'Daily Maintenance',
  'message': 'Go approve comments in moderation!',
  'icon': path.join(__dirname, 'bucket.png'),
  'contentImage': path.join(__dirname, 'broom.png'),
  'sound': true,
  'wait': true
});
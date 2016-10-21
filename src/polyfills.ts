import 'core-js/client/shim';
import 'reflect-metadata';
require('zone.js/dist/zone');

import 'intl';
import 'intl/locale-data/jsonp/ru.js';

import 'ts-helpers';

if (process.env.ENV === 'build') {
  // Production

} else {
  // Development

  Error['stackTraceLimit'] = Infinity;

  require('zone.js/dist/long-stack-trace-zone');
}

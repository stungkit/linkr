/* global config */
/* eslint-disable no-unused-expressions */

import bash from 'highlight.js/lib/languages/bash';
import browserHistory from 'react-router/lib/browserHistory';
import csjs from 'csjs-inject';
import dottie from 'dottie';
import js from 'highlight.js/lib/languages/javascript';
import PiwikReactRouter from 'piwik-react-router';
import python from 'highlight.js/lib/languages/python';
import Raven from 'raven-js';
import React from 'react';
import Router from 'react-router/lib/Router';
import {registerLanguage} from 'react-syntax-highlighter/dist/light';

import fonts from '../resources/blobs/fonts';
import routes from './routes';

/**
 * On client-side application initialization, inject global CSS styles into the document head.
 * WARNING: The operations taken by this function are *stateful* and *have side effects*. This
 * function should only be called once.
 */
function injectGlobalStyles() {
  const fontsMeta = [
    {
      name: 'karla-regular',
      data: fonts.karlaRegular,
      file: 'karla-regular.ttf'
    },
    {
      name: 'karla-bold',
      data: fonts.karlaBold,
      file: 'karla-bold.ttf'
    },
    {
      name: 'source-code-pro-regular',
      data: fonts.sourceCodeProRegular,
      file: 'source-code-pro-regular.ttf'
    },
    {
      name: 'source-code-pro-medium',
      data: fonts.sourceCodeProMedium,
      file: 'source-code-pro-medium.ttf'
    }
  ];

  fontsMeta.forEach((font) => csjs.csjs([fonts.fontFaceStyle(font.name, font.data, font.file)]));
}

injectGlobalStyles();

// Explicitly register supported languages for the syntax highlighter
registerLanguage('curl', bash);
registerLanguage('python', python);
registerLanguage('javascript', js);

// Piwik initialization
const piwik = dottie.get(config, 'options.piwik.url') && PiwikReactRouter(config.options.piwik);

// Client-side Sentry initialization
Raven.config && Raven.config(dottie.get(config, 'secrets.sentry_client_dsn')).install();

const App = () => (
  <Router history={piwik ? piwik.connectToHistory(browserHistory) : browserHistory}>
    {routes}
  </Router>
);

export default App;

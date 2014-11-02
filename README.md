Demo for New Releases Spotify Web API endpoint
===========

This is a simple demo for the Spotify Web API [New Releases endpoint](https://developer.spotify.com/web-api/get-list-new-releases/). It is built using the [Spotify Web API JS wrapper](https://github.com/JMPerez/spotify-web-api-js) and [Knockout.js](http://knockoutjs.com/). A version using [React](http://facebook.github.io/react/) is available on [jmperez/spotify-new-releases-demo-react](https://github.com/JMPerez/spotify-new-releases-demo-react).

## Usage

If you want to run it locally, change the `redirectUri` variable in `js/oauth-config.js` to
`http://localhost:8000`.

Then, start a server listening on port 8000. If you have python installed, you can run:

    python -m SimpleHTTPServer 8000

If you want to deploy the project on a site different from `http://localhost:8000` you will need to register your own Application on the [My Applications section of the Developer Site](https://developer.spotify.com/my-applications/). Register the desired redirect uri and edit the file `js/oauth-config.js` replacing the `clientId` and `redirectUri`.

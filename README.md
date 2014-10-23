Demo for New Releases Spotify Web API endpoint
===========

## Usage

Just start a server listening on port 8000. If you have python installed, you can run:

    python -m SimpleHTTPServer 8000

If you want to deploy the project on a site different from `http://localhost:8000` you will need to register your own Application on the [My Applications section of the Developer Site](https://developer.spotify.com/my-applications/). Register the desired redirect uri and edit the file `js/oauth-config.js` replacing the `clientId` and `redirectUri`.

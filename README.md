# Spotify API

![spotify-api](https://user-images.githubusercontent.com/1321544/143822182-a47209dd-0762-4a9b-bb9d-4646dd56cd7b.jpg)

This is my first Vue application, a sample application that sends a request to the [Spotify API](https://developer.spotify.com/documentation/web-api/reference/#/)

It is not for production and needs a lot of improvement.

## Instructin:

To run the project, please:
 1. Clone the project : `git clone git@github.com:iPazooki/spotify-api.git`
 2. Run this command in your terminal (Just for the first time): `yarn install`
 3. Go to your [Spotify dashboard](https://developer.spotify.com/dashboard/applications), copy **Client ID** and **Client Secret**, then past them in the **spotifyService.ts** file accordingly.
 4. Run this command to execute your application: `yarn serve`

## Testing:
 1. For E2E Testing:
    - Run `yarn test:e2e`
 2. For Unit Testing:
    - Run `yarn test:unit`

## Libraries:
  1. [vuejs](https://vuejs.org/)
  2. [BootstrapVue](https://bootstrap-vue.org/)
  3. [Inversify Props](https://github.com/CKGrafico/inversify-props#readme)
  4. [Lodash](https://lodash.com/)
  5. [Spotify Web API JS](https://github.com/JMPerez/spotify-web-api-js)
  
### TODO:

 1. Spotify **Client Id** and **Secret Id** are hard-coded which is wrong and it's a security issue. In the real world, this sensitive information should be replaced during CI/CD and they can be stored in *Azure vault* or *AWS secrets manager*
 2. E2E are Unit tests that are not completed and have poor code coverage.
 3. On refresh of the page, any applied filter should be persisted.
 4. Automatically update page every 30 seconds
 5. Using Docker

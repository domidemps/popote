<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-green"/>
  <a href="https://github.com/domidemps/popote/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="popote is released under the MIT license." />
  </a>
</p>

<p align="center">
  <img src="https://github.com/domidemps/popote/blob/master/src/images/popote_logo.png" width="450px;"/>
</p>

<h2 align="center">All your recipes, in one place.</h2>

- 🍳 Create many recipes
- 📒 Keep them organized for the long haul

A great alternative to bunch of index cards in a folder!

### Let's start

🚧 *As this project is early stage, it is not deployed yet.* 🚧


### Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/domidemps">
        <img src="https://avatars.githubusercontent.com/domidemps?s=100" width="100px;" alt=""/>
        <br />
        <sub>
          <b>Domitille Dempuré</b>
        </sub>
      </a>
    <td align="center">
      <a href="https://github.com/ldehaine">
        <img src="https://avatars.githubusercontent.com/ldehaine?s=100" width="100px;" alt=""/>
        <br />
        <sub>
          <b>Lou-Yann Dehaine</b>
        </sub>
      </a>
  </tr>
</table>

### Make a copy of the project

These instructions will get you a copy of the project up and running on your local machine, for development purposes.

#### Install dependencies

- Install JS dependencies: `yarn`
- Install **Python 3.7** dependencies: `pip install -r python/requirements.txt`

#### Configure credentials storage

The API needs credentials for some functionalities, including connecting to the database.

To make the API run properly, you'll need to set some **environment variables**:
* Either set "POPOTE_SECRET_JSON_PATH" to the path of your credentials JSON. It should resemble this:
  ```JSON
  {
    "security": {
      "jwt_key": {
        "password": <YOUR_JWT_SECRET_KEY>
    }
  },
    "db": {
      "account": {
        "username": <YOUR_DB_USERNAME>,
        "password": <YOUR_DB_PASSWORD>,
        "url": <YOUR_DB_URL>
        "database_name": <YOUR_DB_NAME>,
      }
    },
    "email": {
      "oauth2": {
        "email_address": <YOUR_EMAIL_ADDRESS>,,
        "google_client_id": <YOUR_GOOGLE_CLIENT_ID>,
        "google_client_secret": <YOUR_GOOGLE_CLIENT_SECRET>,
        "google_refresh_token": <YOUR_GOOGLE_REFRESH_TOKEN>
      }
    }
  }
  ```

* ... or, **better**, set "POPOTE_KEEPASS_PATH" to the path of your .kdbx file and "POPOTE_KEEPASS_PASSWORD" to the
 password of said file. The expected architecture of the Keepass database is copied from the above JSON example with:
  * "security" and "db" being groups
  * "account" and "jwt_key" being entries
  * "password", "username", "url" or "database_name" fields are the attributes of the entry
  * Some attributes (e.g. username) are default properties in Keepass but others(e.g. database_name) need to be set
   as custom properties
  * You can also put data in a JSON file attached to the entry
  * You should avoid naming conflicts between default properties, custom properties and attached JSON file but should
   any conflict occur, the app will prioritize values from attached JSON file, then custom properties, then default
   properties

Easier to setup with JSON but safer with the Keepass. If both solutions are available, the app will prioritize using
Keepass.
>>>>>>> Update README.md for Remote db usage

#### Launch popote

- Run back-end (port 5000): `yarn back:env`
- Run front-end: `yarn front:dev`
- Open popote: [popote](http://localhost:8080/)

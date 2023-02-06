# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Instructions
1. 
    * `Users` (`/user` route)
        * `GET /user` - get all users
        * `GET /user/:id` - get single user by id
        * `POST /user` - create user (following body should be used)
        ```json
            {
                "login": "Novak",
                "password": "backhand"
            }
        ```
        * `PUT /user/:id` - update user's password
        ```json
            {
                "oldPassword": "backhand", // previous password
                "newPassword": "forehand" // new password
            }
        ```
        * `DELETE /user/:id` - delete user
---
2. 
    * `Tracks` (`/track` route)
        * `GET /track` - get all tracks
        * `GET /track/:id` - get single track by id
        * `POST /track` - create new track
        ```json
            {
                "name": "track",
                "duration": "3:50",
                "artistId": "artistId", // optional
                "albumId": "albumId" // optional
            }
        ```
        * `PUT /track/:id` - update track info. You can use the same `body` as for POST
        * `DELETE /track/:id` - delete track
---
3.  
    * `Artists` (`/artist` route)
        * `GET /artist` - get all artists
        * `GET /artist/:id` - get single artist by id
        * `POST /artist` - create new artist
            ```json
                {
                    "name": "Roger",
                    "grammy": false,
                }
            ```
        * `PUT /artist/:id` - update artist info. You can use the same `body` as for POST
        * `DELETE /artist/:id` - delete album
---
4.  
    * `Albums` (`/album` route)
        * `GET /album` - get all albums
        * `GET /album/:id` - get single album by id
        * `POST /album` - create new album
        ```json
            {
                "name": "the best",
                "year": "2023",
                "artistId": "artistId", // optional
            }
        ```
        * `PUT /album/:id` - update album info. You can use the same `body` as for POST
        * `DELETE /album/:id` - delete album
---
5.  
    * `Favorites`
        * `GET /favs` - get all favorites. For below routes you need specific `id` of the entity.
        * `POST /favs/track/:id` - add track to the favorites
        * `DELETE /favs/track/:id` - delete track from favorites
        * `POST /favs/album/:id` - add album to the favorites
        * `DELETE /favs/album/:id` - delete album from favorites
        * `POST /favs/artist/:id` - add artist to the favorites
        * `DELETE /favs/artist/:id` - delete artist from favorites
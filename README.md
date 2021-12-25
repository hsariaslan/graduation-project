## Graduation Project

This repository is my graduation project for my bachelor degree, it is a graduation project matcher between teachers and students - *and yes, I am developing a graduation project matcher for my graduation project.*


## Laravel Backend Setup

```bash
# change directory to server
$ cd server

# install dependencies
$ composer install

# copy .env.example file into .env then update your database name and database credentials
$ cp .env.example .env

# generate new app key
$ php artisan key:generate

# run migrations and seeds
$ php artisan migrate --seed

# serve at localhost:8000
$ php artisan serve
```


## React Frontend Setup

```bash
# change directory to client
$ cd client

# install dependencies
$ npm install

# copy .env.example file into .env
$ cp .env.example .env

# compiles and hot-reloads for development under localhost:3000
$ npm start
```

## Configuring Crypt Keys

Do not forget to change the value of the crypt keys in **server/.env (CRYPT_KEY)** and **client/.env (REACT_APP_CRYPT_KEY)** files. These keys must match to work the encryption and decryption functions correctly between backend to frontend.

## License

Graduation Project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
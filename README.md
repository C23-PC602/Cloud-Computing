## Documentation

ada update route version bisa cek di dokumentasi
https://documenter.getpostman.com/view/14589899/2s93m8yLLB

## URL Deploy

1. For Authentication
https://cloud-computing-eta.vercel.app/

2. For Model Prediction
https://dcoffee-hzinsvzgoq-uc.a.run.app/docs

## How to install

#### Fork and clone this repository using

```bash
git clone https://github.com/C23-PC602/Cloud-Computing.git
```

#### Install dependencies and dev dependency using

```bash
npm install
npm install -D nodemon
```

Or

```bash
yarn install
yarn add -D nodemon
```

#### Copy File .env.example and rename .env

#### Start the server locally at _localhost:5000_ using

```bash
yarn dev
```

Or

```bash
npm dev
```

## How To Test

```bash
After install and run server use npm and yarn
```
```sh
> Create Database -> auth_db -> Import -> Done 
```

## Example test 
```sh
> Open postman -> POST -> raw -> JSON -> Enter Code
{
    "name": "testing",
    "email": "coba@gmail",
    "password": "tes",
    "confPassword": "tes"
}
```

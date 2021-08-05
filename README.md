# [Messenger](https://chat-app-yandex.herokuapp.com/)


## Description

Messenger is a web-based messaging application.

This project is written in pure TypeScript / JavaScript, no frameworks are used.
The application has implemented such utilities as:
- **Block** Class for creating blocks (components) with their own life cycle (React-like)
- **Router** Class for creating a roaming in the application.
- **XHR**
- **Store (state)** Analogue of Redux store
- **Event-bus** Class for implementing the Observer pattern
- **Event-delegarion**


## Used tools and functionality

The src folder contains the source files for the application. The project uses:

[TypeScript] (https://github.com/microsoft/TypeScript) You can separately compile all .ts files of the application with the command

    npm build-ts

Template engine [PUG] (https://github.com/pugjs/pug) You can separately compile all .pug application files using the command

    npm build-pug

[POSTCSS] (https://github.com/postcss/postcss) You can separately compile all .css files of the application with the command

    npm postcss

[Webpack] is used to build the project (https://github.com/webpack/webpack)

    npm run build

The project uses [ESLint] (https://github.com/eslint/eslint) to analyze the code

    npm run eslinter

Critical utilities of the project are covered by [Mocha] tests (https://github.com/mochajs/mocha)

    npm test

To check the code before committing, use [Husky] (https://github.com/typicode/husky) 🐶

    npm run prepare

## Design

- [Layout design (Yandex.Praktikum)] (https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1)

- [Chat delete menu and delete confirmation] (https://www.figma.com/file/qkWXtG2jIVAeKZFghNkCQI/Chat?node-id=0%3A1)

## How to start

    npm start

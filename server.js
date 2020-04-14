const express = require('express');
const request = require('request');
const proxy = require('cors-anywhere');

const app = express();

//Setting up own proxy server for adding cors-header
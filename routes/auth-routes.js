const express         = require('express');
const bcrypt          = require('bcrypt');
const passport        = require('passport');
const request         = require('request');

const User = require('../models/user-model');

const authRoute = express.Router();

// github id and secret
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;




module.exports = authRoute;

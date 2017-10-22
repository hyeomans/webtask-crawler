const path = require('path');
const fs = require('fs');
const sinon = require('sinon');
const chai = require('chai');
const Promise = require('bluebird');
const readFile = Promise.promisify(fs.readFile);

chai.use(require('chai-as-promised'));

global.path = path;
global.sinon = sinon;
global.expect = chai.expect;
global.readFile = readFile;

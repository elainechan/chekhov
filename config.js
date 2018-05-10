'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/chekhov_dev';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test_chekhov_dev';
exports.PORT = process.env.PORT || 8080;
exports.SECRET = process.env.SECRET || 'SECRET';
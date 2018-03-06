'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/tasket_dev';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test_tasket_dev';
exports.PORT = process.env.PORT || 8080;
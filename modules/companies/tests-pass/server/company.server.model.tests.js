'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Company = mongoose.model('Company');

/**
 * Globals
 */
var user,
  company,
  company2;

/**
 * Unit tests
 */
describe('Company Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function () {
      company = new Company({
        name: 'Company Name',
        address: 'Company Address',
        taxid: 'Company TaxId',
        brunch: 'Company Brunch',
        telofficeno: 'Company TelOfficeNo',
        mobile: 'Company Mobile',
        faxno: 'Company FaxNo',
        email: 'Company Email',
        contact: 'Company Contact',
        website: 'Company Website',
        note: 'Company Note',
        accountno: '1001',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return company.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save duplicate name', function (done) {

      company2 = new Company({
        name: 'Company Name',
        address: 'Company Address',
        taxid: 'Company TaxId',
        brunch: 'Company Brunch',
        telofficeno: 'Company TelOfficeNo',
        mobile: 'Company Mobile',
        faxno: 'Company FaxNo',
        email: 'Company Email',
        contact: 'Company Contact',
        website: 'Company Website',
        note: 'Company Note',
        accountno: '1001',
        user: user
      });

      this.timeout(0);
      return company.save(function (err) {
        company2.save(function (err) {
          should.exist(err);
          company.remove(function (err) {
            should.not.exist(err);
            done();
          });
        });
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      company.name = '';

      return company.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without address', function (done) {
      company.address = '';

      return company.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without accountno', function (done) {
      company.accountno = '';

      return company.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save duplicate taxid', function (done) {

      company2 = new Company({
        name: 'Company Name2',
        address: 'Company Address',
        taxid: 'Company TaxId',
        brunch: 'Company Brunch',
        telofficeno: 'Company TelOfficeNo',
        mobile: 'Company Mobile',
        faxno: 'Company FaxNo',
        email: 'Company Email',
        contact: 'Company Contact',
        website: 'Company Website',
        note: 'Company Note',
        accountno: 1001,
        user: user
      });

      this.timeout(0);
      return company.save(function (err) {
        company2.save(function (err) {
          should.exist(err);
          company.remove(function (err) {
            should.not.exist(err);
            done();
          });
        });
      });
    });

    it('should be able to show an error when try to save without taxid', function (done) {
      company.taxid = '';

      return company.save(function (err) {
        should.exist(err);
        done();
      });
    });

  });

  afterEach(function (done) {
    Company.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});

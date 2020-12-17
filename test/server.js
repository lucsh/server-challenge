'use strict';

const { expect } = require('chai');
const axios = require('axios');
const { v4: uuid } = require('uuid');

describe('Timezones API', () => {
  describe('Get all the timezones', function () {
    this.timeout(20000);
    const url = 'http://localhost:3030/timezones/';
    it('Should receive a 200 status', async () => {
      const r = await axios({
        method: 'GET',
        url
      });
      expect(r.status).to.equal(200);
    });
  });
  describe('Get a timezone', function () {
    this.timeout(20000);
    const url = 'http://localhost:3030/timezones/America%2FArgentina%2FBuenos_Aires';
    it('Should receive a 200 status', async () => {
      const r = await axios({
        method: 'GET',
        url
      });
      expect(r.status).to.equal(200);
    });
  });
  describe('Put a timezone', () => {
    const idempotenceKey = uuid();
    const url = 'http://localhost:3030/timezones/America%2FArgentina%2FBuenos_Aires';
    it('Should receive a 200 status', async () => {
      const r = await axios({
        method: 'PUT',
        url,
        headers: {
          'x-idempotence-key': idempotenceKey
        }
      });
      expect(r.status).to.equal(201);
    });
    it('Using the same idempotence key should receive a 304', async () => {
      await axios({
        method: 'PUT',
        url,
        headers: {
          'x-idempotence-key': idempotenceKey
        }
      }).catch((err) => {
        expect(err.response.status).to.equal(304);
      });
    });
  });
  describe('Delete a timezone', () => {
    const idempotenceKey = uuid();
    const url = 'http://localhost:3030/timezones/America%2FArgentina%2FBuenos_Aires';
    it('Should receive a 204', async () => {
      const r = await axios({
        method: 'DELETE',
        url,
        headers: {
          'x-idempotence-key': idempotenceKey
        }
      });
      expect(r.status).to.equal(204);
    });
    it('Using the same idempotence key should receive a 304', async () => {
      await axios({
        method: 'DELETE',
        url,
        headers: {
          'x-idempotence-key': idempotenceKey
        }
      }).catch((err) => {
        expect(err.response.status).to.equal(304);
      });
    });
  });
});

'use-strict';

var Schema = require('../lib/schema.js'),
    schemaMocks = require('./fixtures/schema-mocks'),
    _ = require('lodash'),
    should = require('should');

describe('Schema', function(){

  it('detects type definitions', function(done){
    var schema = new Schema(schemaMocks.types);
    _.forOwn(schemaMocks.types, function(v, k){
      schema.mappings.should.have.property(k);
      schema.mappings[k].should.have.property('type');
    });
    done();
  });

  it('detects single level nested type definitions', function(done){
    var schema = new Schema(schemaMocks.nestedSingleLevel);
    _.forOwn(schema.mappings.nestedDocumentOne, function(v, k){
      if(k !=='type') v.should.have.property('type');
    });
    _.forOwn(schema.mappings.nestedDocumentTwo, function(v, k){
      if(k !=='type') v.should.have.property('type');
    });
    done();
  });

  it('validates a valid document', function(done){
    var schema = new Schema({
      name: String,
      createdOn: Date
    });
    var errors = schema.validate({name: 'Jim', createdOn: new Date().toISOString()});
    should.not.exist(errors);
    done();
  });

  it('returns errors for a bad document', function(done){
    var schema = new Schema({
      name: String
    });
    var errors = schema.validate({name: 44});
    should.exist(errors);
    done();
  });
});

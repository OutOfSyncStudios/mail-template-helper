// test/index.js

// Dependancies
const chai = require('chai');
const expect = chai.expect;

const MailTemplatesHelper = require('../');
const templates = {
  ['PlainTest']: {
    subject: 'Test',
    body: 'Test'
  },
  ['Test2']: {
    subject: '{testData1} {testData2}',
    body: '{bodyData} - {testData2} -- {embedded.value}'
  }
};

const data = {
  unusedValue: 'unused',
  testData1: '1234',
  testData2: 'QWER',
  bodyData: 'This is some body data',
  embedded: { value: '1a2b3c4d' }
};

describe('Mail Templates Helper', () => {
  let mailTemplateHelper;

  before(async() => {
    mailTemplateHelper = new MailTemplatesHelper(templates);
  });

  it('constructor', () => {
    expect(mailTemplateHelper).to.be.an.instanceof(MailTemplatesHelper);
  });

  it('should .getTemplate that exists', () => {
    const tmpl = mailTemplateHelper.getTemplate('PlainTest');
    expect(tmpl).to.exist;
  });

  it('should not .getTemplate that does not exists', () => {
    const tmpl = mailTemplateHelper.getTemplate('FakeTest');
    expect(tmpl).to.not.exist;
  });

  it('should not .getFilledSubject that does not exists', () => {
    const tmpl = mailTemplateHelper.getFilledSubject('FakeTest', data);
    expect(tmpl).to.not.exist;
  });

  it('should .getFilledSubject that exists but has no escapes', () => {
    const str = mailTemplateHelper.getFilledSubject('PlainTest', data);
    expect(str).to.have.string('Test');
    expect(str).to.not.have.string(data.unusedValue);
  });

  it('should .getFilledSubject that exists and had data', () => {
    const str = mailTemplateHelper.getFilledSubject('Test2', data);
    expect(str).to.not.have.string('Test');
    expect(str).to.not.have.string(data.unusedValue);
    expect(str).to.not.have.string(data.bodyData);
    expect(str).to.have.string(data.testData1);
    expect(str).to.have.string(data.testData2);
  });

  it('should not .getFilledBody that does not exists', () => {
    const tmpl = mailTemplateHelper.getFilledBody('FakeTest', data);
    expect(tmpl).to.not.exist;
  });

  it('should .getFilledBody that exists but has no escapes', () => {
    const str = mailTemplateHelper.getFilledBody('PlainTest', data);
    expect(str).to.have.string('Test');
    expect(str).to.not.have.string(data.unusedValue);
  });

  it('should .getFilledBody that exists and had data', () => {
    const str = mailTemplateHelper.getFilledBody('Test2', data);
    expect(str).to.not.have.string('Test');
    expect(str).to.not.have.string(data.unusedValue);
    expect(str).to.have.string(data.bodyData);
    expect(str).to.not.have.string(data.testData1);
    expect(str).to.have.string(data.testData2);
    expect(str).to.have.string(data.embedded.value);
  });

  it('should not .getCustomFilled with non-existant', () => {
    const tmpl = mailTemplateHelper.getCustomFilled(null, data);
    expect(tmpl).to.not.exist;
  });

  it('should .getCustomFilled with empty', () => {
    const tmpl = mailTemplateHelper.getCustomFilled('', data);
    expect(tmpl).to.exist;
  });

  it('should .getCustomFilled with good template and had data', () => {
    const str = mailTemplateHelper.getCustomFilled(templates.Test2.body, data);
    expect(str).to.not.have.string('Test');
    expect(str).to.not.have.string(data.unusedValue);
    expect(str).to.have.string(data.bodyData);
    expect(str).to.not.have.string(data.testData1);
    expect(str).to.have.string(data.testData2);
    expect(str).to.have.string(data.embedded.value);
  });
});

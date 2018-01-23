// mailTemplatesHelper.js

// Dependencies
const __ = require('@mediaxpost/lodashext');
const Sugar = require('sugar');

class MailTemplatesHelper {
  constructor(templates) {
    this.templates = templates;
  }

  getTemplate(templateName) {
    if (Object.keys(this.templates).includes(templateName)) {
      return this.templates[templateName];
    }
    return null;
  }

  getFilledSubject(templateName, data) {
    const tmpl = this.getTemplate(templateName);
    if (__.hasValue(tmpl)) {
      return Sugar.String.format(tmpl.subject, data);
    }
    return null;
  }

  getFilledBody(templateName, data) {
    const tmpl = this.getTemplate(templateName);
    if (__.hasValue(tmpl)) {
      return Sugar.String.format(tmpl.body, data);
    }
    return null;
  }

  getCustomFilled(template, data) {
    if (__.hasValue(template)) {
      return Sugar.String.format(template, data);
    }
    return null;
  }
}

module.exports = MailTemplatesHelper;

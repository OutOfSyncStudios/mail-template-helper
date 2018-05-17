# mail-template-helper

[![NPM](https://nodei.co/npm/@mediaxpost/mail-template-helper.png?downloads=true)](https://nodei.co/npm/@mediaxpost/mail-template-helper/)

[![Actual version published on npm](http://img.shields.io/npm/v/@mediaxpost/mail-template-helper.svg)](https://www.npmjs.org/package/@mediaxpost/mail-template-helper)
[![Travis build status](https://travis-ci.org/MediaXPost/mail-template-helper.svg)](https://www.npmjs.org/package/@mediaxpost/mail-template-helper)
[![Total npm module downloads](http://img.shields.io/npm/dt/@mediaxpost/mail-template-helper.svg)](https://www.npmjs.org/package/@mediaxpost/mail-template-helper)
[![Package Quality](http://npm.packagequality.com/badge/@mediaxpost/mail-template-helper.png)](http://packagequality.com/#?package=@mediaxpost/mail-template-helper)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/43225424afb04627afd2e026712d5281)](https://www.codacy.com/app/chronosis/mail-template-helper?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MediaXPost/mail-template-helper&amp;utm_campaign=Badge_Grade)
[![Codacy Coverage  Badge](https://api.codacy.com/project/badge/Coverage/43225424afb04627afd2e026712d5281)](https://www.codacy.com/app/chronosis/mail-template-helper?utm_source=github.com&utm_medium=referral&utm_content=MediaXPost/mail-template-helper&utm_campaign=Badge_Coverage)
[![Dependencies badge](https://david-dm.org/MediaXPost/mail-template-helper/status.svg)](https://david-dm.org/MediaXPost/mail-template-helper?view=list)


`mail-template-helper` is a helper module to assist with compilation of email templates.

# [Installation](#installation)
<a name="installation"></a>

```shell
npm install @mediaxpost/mail-template-helper
```

# [Usage](#usage)
<a name="usage"></a>

```js
const MailTemplatesHelper = require('@mediaxpost/mail-template-helper');

const templates = {
  ['Test2']: {
    subject: '{testData1} {testData2}',
    template: '{bodyData} - {testData2} -- {embedded.value}'
  }
};

const mailTemplateHelper = new MailTemplatesHelper(templates);

console.log(mailTemplateHelper.getFilledTemplate('Test2', {
  testData1: 'a',
  testData2: 'b',
  bodyData: 'test',
  embedded: {
    value: 'qwerty'
  }
}));
```

# [API Reference](#api)
<a name="api"></a>

## MailTemplatesHelper constructor(templates) &#x27fe; instanceof MailTemplatesHelper
Create an instance of MailTemplatesHelper with the `templates` collection provided.

## MailTemplatesHelper.getTemplate(templateName) &#x27fe; object(mail template) / null
Returns the template with the `templateName` provided or `null` if the template does not exist

## MailTemplatesHelper.getFilledSubject(templateName, data) &#x27fe; string / null
Returns the template subject from the `templateName` provided, using the `data` to fill any `{}` placeholders, or `null` if no template by that name exists.

## MailTemplatesHelper.getFilledBody(templateName, data) &#x27fe; string / null
Returns the template body from the `templateName` provided, using the `data` to fill any `{}` placeholders, or `null` if no template by that name exists.

## MailTemplatesHelper.getCustomFilled(template, data) &#x27fe; string / null
Returns custom `template` filled using the `data` to fill any `{}` placeholders, or `null` if the `template` is `null` or `undefined`

# [Templates and Collections](#templates)
<a name="templates"></a>

## Template
A template is just a string with `{}` placeholders for data in data dictionary. The placeholders can reference nested data objects and array indices.

```js
const template = 'This is a template with { data }. Hello { name }.';
```

## Mail Template
A mail template is an object which contains two template strings labelled `body` and `subject`.

```js
const mailTemplate = {
  subject: 'Mail Subject -- { data1 }',
  body: 'This is a template with { data }. Hello { name }.'
};
```

## Template Collection
A template collection is an object with named indices which each contain a Mail Template.

```js
const templates = {
  ['Test1']: {
    subject: 'Mail Subject -- { data1 }',
    body: 'This is a template with { data }. Hello { name }.'
  },
  ['Test2']: {
    subject: 'Mail Subject -- { data1 }',
    body: 'This is a template with { data }. Hello { name }.'
  }
};
```

# [License](#license)
<a name="license"></a>

Copyright (c) 2018 Jay Reardon -- Licensed under the MIT license.


'use strict';

const SampleComponent1 = {
  additionalProperties: false,
  title: 'Sample Component',
  type: 'object',
  properties: {
    sampleField1One: {
      type: 'string',
      description: 'A sample field.',
    },
    sampleField1Two: {
      type: 'string',
      description: 'Another sample field.',
    },
  },
};

module.exports = { SampleComponent1 };

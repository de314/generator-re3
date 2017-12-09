'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const _ = require('lodash')

module.exports = class extends Generator {
  prompting() {
    const that = this
    const hocChoices = [
      { name: 'Enhanced (export raw)', value: 'enhanced', checked: true },
      { name: 'Redux connect', value: 'redux', checked: true },
      { name: 'With Auth', value: 'auth', checked: false },
      { name: 'With Router', value: 'router', checked: false },
    ]
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Component name? No not include a path or file extension?',
        validate: val => !_.isNil(val.match(/^[A-Z][a-zA-Z0-9]+$/)),
      },
      {
        type: 'input',
        name: 'location',
        message:
          'Where should the component be saved? This will be prefixed with "./src/components/"',
        default: ({ name }) => _.camelCase(name),
        validate: val => !_.isNil(val.match(/^(?:[a-z][a-zA-Z0-9]+\/)*[a-z][a-zA-Z0-9]+$/)),
      },
      {
        type: 'confirm',
        name: 'proptypes',
        message: 'Will this component use proptypes?',
        default: true,
        store: true,
      },
      {
        type: 'checkbox',
        name: 'hoc',
        message: 'Which Component features should be added?',
        choices: hocChoices,
        store: true,
      },
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
      hocChoices.forEach(feature => (props[feature.value] = props.hoc.includes(feature.value)))
    })
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('__component.tpl.js'),
      this.destinationPath(`src/components/${this.props.location}/${this.props.name}.js`),
      this.props
    )
  }
}

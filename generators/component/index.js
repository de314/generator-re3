'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const _ = require('lodash')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('name', { type: String, required: false })
    this.argument('location', { required: false, default: false })
  }

  prompting() {
    const opts = this.options
    const hocChoices = [
      { name: 'Enhanced (export raw)', value: 'enhanced', checked: true },
      { name: 'Redux connect', value: 'redux', checked: true },
      { name: 'With Auth', value: 'auth', checked: false },
      { name: 'With Router', value: 'router', checked: false },
    ]
    const validateName = val => !_.isNil(val.match(/^[A-Z][a-zA-Z0-9]+$/))
    const validateLocation = val =>
      !_.isNil(val.match(/^(?:[a-z][a-zA-Z0-9]+\/)*[a-z][a-zA-Z0-9]+$/))
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Component name? No not include a path or file extension?',
        default: this.options.name,
        validate: validateName,
        when: () => _.isNil(opts.name) || !validateName(opts.name),
      },
      {
        type: 'input',
        name: 'location',
        message:
          'Where should the component be saved? This will be prefixed with "./src/components/"',
        default: ({ name }) => _.camelCase(name),
        validate: validateLocation,
        when: () => _.isNil(opts.location),
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
      props.name = _.defaultTo(props.name, opts.name)
      props.location = _.defaultTo(props.location, opts.location)
      hocChoices.forEach(feature => (props[feature.value] = props.hoc.includes(feature.value)))
      this.props = props
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

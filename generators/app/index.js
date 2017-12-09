'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const _ = require('lodash')

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('React, Redux, and Recompose ==> ' + chalk.red('RE3') + ' generator!'))

    const prompts = [
      {
        type: 'input',
        name: 'title',
        message: 'Webpage title?',
        default: process
          .cwd()
          .split(path.sep)
          .pop(),
      },
      {
        type: 'confirm',
        name: 'withReduxSagas',
        message: 'Would you like to use redux sagas?',
        default: true,
        store: true,
      },
      {
        type: 'confirm',
        name: 'withAuth',
        message: 'Would you like to use authentication for public and private pages?',
        default: true,
        store: true,
      },
      {
        type: 'checkbox',
        name: 'ui',
        message: 'Which UI features should be added?',
        choices: [
          { name: 'Bootstrap 4', value: 'bootstrap4', checked: true },
          { name: 'Font Awesome', value: 'fontawesome', checked: true },
        ],
        store: true,
      },
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  configuring() {
    this.config.save()
  }

  writing() {
    this._writePublic()
    this.log(
      'Installing a .env file. You will need to restart the dev webpack server if it is already running!'
    )
    const copies = [
      '.env',
      'src/rdx',
      'src/index.js',
      'src/components/App.js',
      'src/components/layout',
    ]
    copies.forEach(f => this.fs.copy(this.templatePath(f), this.destinationPath(f)))
    this._writeComponents()
  }

  _writePublic() {
    let src = this.fs.read(this.destinationPath('public/index.html'))
    src = src.replace(/<title>[^<]+<\/title>/, `<title>${this.props.title}</title>`)
    if (this.props.ui.includes('fontawesome')) {
      src = src.replace(
        /(\s+)(<title>[^<]+<\/title>)\s*\n/,
        '$1$2$1<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha256-NuCn4IvuZXdBaFKJOAcsU2Q3ZpwbdFisd5dux4jkQ5w=" crossorigin="anonymous" />'
      )
    }
    if (this.props.ui.includes('bootstrap4')) {
      src = src.replace(
        /(\s+)(<title>[^<]+<\/title>)\s*\n/,
        '$1$2$1<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">'
      )
      src = src.replace(
        /(\s+)<div id="root"><\/div>/,
        '$1<div id="root"></div>' +
          '$1<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>' +
          '$1<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>' +
          '$1<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>'
      )
    }
    this.fs.write(this.destinationPath('public/index.html'), src)
  }

  _writeComponents() {
    const deletes = ['src/App.js', 'src/App.css', 'src/App.spec.js']
    deletes.forEach(f => this.fs.delete)
    const copies = ['App.js', 'layout/EnhancedHeader.js']
    copies.forEach(f =>
      this.fs.copy(
        this.templatePath(`src/components/${f}`),
        this.destinationPath(`src/components/${f}`)
      )
    )
    const templates = ['layout/AnonHeader.js', 'layout/AuthHeader.js']
    templates.forEach(f =>
      this.fs.copyTpl(
        this.templatePath(`src/components/${f}`),
        this.destinationPath(`src/components/${f}`),
        this.props
      )
    )
  }

  install() {
    this.npmInstall('lodash recompose react-router-dom redux redux-localstorage react-redux')
  }
}

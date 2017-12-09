'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const _ = require('lodash')

const AUTH = 'auth'
const ANON = 'anon'
const COMMON = 'common'

const INSERT_AUTH = {
  routeFile: 'AuthRoutes',
  importPattern: '// ::IMPORT_AUTH::',
  routePattern: /(\s*)\{\/\* ::ROUTE_AUTH:: \*\/}/,
  routeConst: '{/* ::ROUTE_AUTH:: */}',
}

const INSERT_ANON = {
  routeFile: 'AnonRoutes',
  importPattern: '// ::IMPORT_ANON::',
  routePattern: /(\s*)\{\/\* ::ROUTE_ANON:: \*\/}/,
  routeConst: '{/* ::ROUTE_ANON:: */}',
}

const INSERT_COMMON = {
  importPattern: '// ::IMPORT_COMMON::',
  routePattern: /(\s*)\{\/\* ::ROUTE_COMMON:: \*\/}/,
  routeConst: '{/* ::ROUTE_COMMON:: */}',
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('name', { type: String, required: false })
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Route name? (Do not include a path or file extension)',
        validate: val => !_.isNil(val.match(/^[A-Z][a-zA-Z0-9]+$/)),
        default: this.options.name,
      },
      {
        type: 'input',
        name: 'location',
        message: 'Where should the component be saved? This will be prefixed with "./src/routes/"',
        default: ({ name }) => _.camelCase(name),
        validate: val => !_.isNil(val.match(/^(?:[a-z][a-zA-Z0-9]+\/)*[a-z][a-zA-Z0-9]+$/)),
      },
      {
        type: 'input',
        name: 'path',
        message: 'What is the url path?',
        default: ({ name }) => _.kebabCase(name),
        validate: val => !_.isNil(val.match(/^\/?(?:[a-z][a-z0-9-]*\/)*[a-z][a-z0-9-]*$/)),
      },
      {
        type: 'list',
        name: 'visibility',
        message: 'Is this route restricted by authentication?',
        choices: [
          { name: 'Only Anonymous (Public)', value: 'anon' },
          { name: 'Only Authenticated (Private)', value: 'auth' },
          { name: 'Common (Private and Public)', value: 'common' },
        ],
        default: 'auth',
      },
      {
        type: 'confirm',
        name: 'component',
        message: 'Should this route have a component?',
        default: true,
        store: true,
      },
    ]

    return this.prompt(prompts).then(props => {
      if (props.path.charAt(0) !== '/') {
        props.path = '/' + props.path
      }
      this.props = props
    })
  }

  writing() {
    switch (this.props.visibility) {
      case AUTH:
        this._applyRoute(INSERT_AUTH)
        break
      case ANON:
        this._applyRoute(INSERT_ANON)
        break
      case COMMON:
        this._applyRoute(INSERT_COMMON, INSERT_AUTH.routeFile)
        this._applyRoute(INSERT_COMMON, INSERT_ANON.routeFile)
        break
      default:
    }
    this._writeComponent()
  }

  _applyRoute(writeDef, routeFile) {
    const { importPattern, routePattern, routeConst } = writeDef
    if (_.isNil(routeFile)) {
      routeFile = writeDef.routeFile
    }
    const { name, location, visibility, path } = this.props
    let src = this.fs.read(this.destinationPath(`src/routes/${routeFile}.js`))
    src = src.replace(
      importPattern,
      `import ${name} from 'routes/${visibility}/${name}'\n${importPattern}`
    )
    src = src.replace(
      routePattern,
      `$1<Route exact path="${path}" component="${name}" />$1${routeConst}`
    )
    this.fs.write(this.destinationPath(`src/routes/${routeFile}.js`), src)
  }

  _writeComponent() {
    if (this.props.component) {
      this.composeWith(require.resolve('../component'), {
        name: this.props.name,
        location: this.props.location,
      })
    }
  }
}

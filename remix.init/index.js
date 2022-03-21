const crypto = require('crypto')
const fs = require('fs/promises')
const path = require('path')

const sort = require('sort-package-json')

function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getRandomString(length) {
  return crypto.randomBytes(length).toString('hex')
}

async function main({ rootDirectory }) {
  const README_PATH = path.join(rootDirectory, 'README.md')
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, '.env.example')
  const ENV_PATH = path.join(rootDirectory, '.env')
  const PACKAGE_JSON_PATH = path.join(rootDirectory, 'package.json')

  const REPLACER = 'indie-stack-template'

  const DIR_NAME = path.basename(rootDirectory)
  const SUFFIX = getRandomString(2)
  const APP_NAME = DIR_NAME + '-' + SUFFIX

  const [readme, env, packageJson] = await Promise.all([
    fs.readFile(README_PATH, 'utf-8'),
    fs.readFile(EXAMPLE_ENV_PATH, 'utf-8'),
    fs.readFile(PACKAGE_JSON_PATH, 'utf-8'),
  ])

  const newEnv = env.replace(/^SESSION_SECRET=.*$/m, `SECRET_SESSION="${getRandomString(16)}"`)

  console.log(newEnv)

  const newReadme = readme.replace(new RegExp(escapeRegExp(REPLACER), 'g'), APP_NAME)

  const newPackageJson = JSON.stringify(sort({ ...JSON.parse(packageJson), name: APP_NAME }), null, 2) + '\n'

  await Promise.all([
    fs.writeFile(README_PATH, newReadme),
    fs.writeFile(ENV_PATH, newEnv),
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
  ])
  console.log('🚀 ~ file: index.js ~ line 18 ~ main ~ README_PATH', {
    README_PATH,
    EXAMPLE_ENV_PATH,
    ENV_PATH,
    PACKAGE_JSON_PATH,
    REPLACER,
    DIR_NAME,
    SUFFIX,
    APP_NAME,
  })

  console.log(`✅  Project is ready! Start development with "npm run dev"`)
}

module.exports = main

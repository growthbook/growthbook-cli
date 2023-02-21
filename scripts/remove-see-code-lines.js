// The lines starting with `_See code` are linking to the wrong place because of TypeScript and source maps.
// Remove them.

const Fs = require('node:fs')
const Path = require('node:path')

const readmePath = Path.resolve(process.cwd(), './README.md')

const readmeText = Fs.readFileSync(readmePath, 'utf-8')
const replacedReadme = readmeText.replaceAll(/^_See code.*$/gm, '')

Fs.writeFileSync(readmePath, replacedReadme)

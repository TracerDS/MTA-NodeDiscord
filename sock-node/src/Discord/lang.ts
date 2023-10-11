import * as fs from 'node:fs/promises'
import * as fsSync from 'node:fs'
import path from 'node:path'

const LANGS: { [lang: string]: object } = {}

async function fetchLanguages() {
    const langsPath = path.join(__dirname, 'langs')
    const files = await (await fs.readdir(langsPath)).filter(f => f.endsWith('.json'))
    for(let file of files) {
        const langFile = path.parse(file.toLowerCase()).name
        if(LANGS[langFile]) continue

        LANGS[langFile] = (await import(path.join(langsPath, file))).default
    }
    return LANGS
}
function fetchLanguagesSync() {
    const langsPath = path.join(__dirname, 'langs')
    const files = fsSync.readdirSync(langsPath).filter(f => f.endsWith('.json'))

    for(let file of files) {
        const langFile = path.parse(file.toLowerCase()).name
        if(LANGS[langFile]) continue
        
        import(path.join(langsPath, file)).then(val => { LANGS[langFile] = val.default })
    }
    return LANGS
}

export {
    LANGS, fetchLanguages, fetchLanguagesSync
}
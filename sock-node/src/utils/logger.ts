import Color from './colors'

class Logger {
    static color(color: string) { console.log(color) }
    static log(text: any, color: number, g?: number, b?: number) {
        let r
        if(!g && !b) {
            r = r || color & 0xFF0000
            g = g || color & 0x00FF00
            b = b || color & 0x0000FF
        }
        r = color        
        Color.printRGB(text, r,g,b)
    }
    static confirm(text: string) { Color.printRGB(text, 75, 255, 75) }
    static info(text: string) { Color.printRGB(text, 0, 150, 255) }
    static warn(text: string) { Color.printRGB(text, 255, 150, 0) }
    static err(text: string) { Color.printRGB(text, 255, 0, 0) }

    static yellow(text: string) { Color.printYellow(text) }
    static magenta(text: string) { Color.printMagenta(text) }
    static cyan(text: string) { Color.printCyan(text) }
    static white(text: string) { Color.printWhite(text) }
    static lightBlack(text: string) { Color.printLightBlack(text) }
    static lightRed(text: string) { Color.printLightRed(text) }
    static lightGreen(text: string) { Color.printLightGreen(text) }
    static lightYellow(text: string) { Color.printLightYellow(text) }
    static lightBlue(text: string) { Color.printLightBlue(text) }
    static lightMagenta(text: string) { Color.printLightMagenta(text) }
    static lightCyan(text: string) { Color.printLightCyan(text) }
    static lightWhite(text: string) { Color.printLightWhite(text) }
}

export default Logger
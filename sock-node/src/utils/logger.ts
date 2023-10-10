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
}

export default Logger
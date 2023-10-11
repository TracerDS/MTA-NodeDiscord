enum ForegroundColors {
    Black = 30,
    Red = 31,
    Green = 32,
    Yellow = 33,
    Blue = 34,
    Magenta = 35,
    Cyan = 36,
    White = 37,
    Default = 39,
    LightBlack = 90,
    LightRed = 91,
    LightGreen = 92,
    LightYellow = 93,
    LightBlue = 94,
    LightMagenta = 95,
    LightCyan = 96,
    LightWhite = 97,
}
enum BackgroundColors {
    Black = 40,
    Red = 41,
    Green = 42,
    Yellow = 43,
    Blue = 44,
    Magenta = 45,
    Cyan = 46,
    White = 47,
    Default = 49,
    LightBlack = 100,
    LightRed = 101,
    LightGreen = 102,
    LightYellow = 103,
    LightBlue = 104,
    LightMagenta = 105,
    LightCyan = 106,
    LightWhite = 107,
}
enum Special {
    Bold = 1,
    Faint = 2,
    Italic = 3,
    Underline = 4,
    Blinking = 5,
    Inverse = 7,
    Hidden = 8,
    Strikethrough = 9,
}
enum SpecialReset {
    Bold = 22,
    Faint = 22,
    Italic = 23,
    Underline = 24,
    Blinking = 25,
    Inverse = 27,
    Hidden = 28,
    Strikethrough = 29,
}

class Color {
    static bold(text: string): string {
        return `\x1b[${Special.Bold}m${text}\x1b[${SpecialReset.Bold}m`
    }
    static black(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.Black}m${text}\x1b[${colorEnum.Default}m`
    }
    static red(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.Red}m${text}\x1b[${colorEnum.Default}m`
    }
    static green(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.Green}m${text}\x1b[${colorEnum.Default}m`
    }
    static yellow(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.Yellow}m${text}\x1b[${colorEnum.Default}m`
    }
    static blue(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.Blue}m${text}\x1b[${colorEnum.Default}m`
    }
    static magenta(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.Magenta}m${text}\x1b[${colorEnum.Default}m`
    }
    static cyan(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.Cyan}m${text}\x1b[${colorEnum.Default}m`
    }
    static white(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.White}m${text}\x1b[${colorEnum.Default}m`
    }
    static lightBlack(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.LightBlack}m${text}\x1b[${colorEnum.Default}m`
    }
    static lightRed(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.LightRed}m${text}\x1b[${colorEnum.Default}m`
    }
    static lightGreen(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.LightGreen}m${text}\x1b[${colorEnum.Default}m`
    }
    static lightYellow(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.LightYellow}m${text}\x1b[${colorEnum.Default}m`
    }
    static lightBlue(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.LightBlue}m${text}\x1b[${colorEnum.Default}m`
    }
    static lightMagenta(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.LightMagenta}m${text}\x1b[${colorEnum.Default}m`
    }
    static lightCyan(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.LightCyan}m${text}\x1b[${colorEnum.Default}m`
    }
    static lightWhite(text: string, background?: boolean): string {
        const colorEnum = (background ? BackgroundColors : ForegroundColors)
        return `\x1b[${colorEnum.LightWhite}m${text}\x1b[${colorEnum.Default}m`
    }
    static rgb(text: string, r?: number, g?: number, b?: number, background?: boolean): string {
        const colorCode = (background ? 48 : 38)
        const colorReset = (background ? BackgroundColors : ForegroundColors).Default
        return `\x1b[${colorCode};2;${r};${g};${b}m${text}\x1b[${colorReset}m`
    }
    static printRed(text: string) { console.log(this.red(text)) }
    static printGreen(text: string) { console.log(this.green(text)) }
    static printBlue(text: string) { console.log(this.blue(text)) }
    static printYellow(text: string) { console.log(this.yellow(text))}
    static printMagenta(text: string) { console.log(this.magenta(text))}
    static printCyan(text: string) { console.log(this.cyan(text))}
    static printWhite(text: string) { console.log(this.white(text))}
    static printLightBlack(text: string) { console.log(this.lightBlack(text))}
    static printLightRed(text: string) { console.log(this.lightRed(text))}
    static printLightGreen(text: string) { console.log(this.lightGreen(text))}
    static printLightYellow(text: string) { console.log(this.lightYellow(text))}
    static printLightBlue(text: string) { console.log(this.lightBlue(text))}
    static printLightMagenta(text: string) { console.log(this.lightMagenta(text))}
    static printLightCyan(text: string) { console.log(this.lightCyan(text))}
    static printLightWhite(text: string) { console.log(this.lightWhite(text))}

    static printRGB(text: string, r?: number, g?: number, b?: number, background?: boolean) {
        console.log(this.rgb(text,r,g,b,background))
    }
}

export default Color
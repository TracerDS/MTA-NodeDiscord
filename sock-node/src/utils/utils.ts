function format(text: string, ...args: any): string {
    let temp: string | null

    while(temp = (/\%[^\%]/i.exec(text)) as string|null) {
        const type = temp[0]!.substring(1).toLowerCase()

        for(let key in args) {
            const val = args[key]
            if(
                !(typeof val === 'number' && (type === 'i' || type == 'd' || type == 'f')) &&
                !(typeof val === 'string' && (type === 's' || type === 'c'))
            ) continue
            
            text = text.replace(temp![0]!, val.toString())
            delete args[key]
            break
        }
    }

    return text
}

export {
    format
}
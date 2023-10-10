interface PayloadData {
    type: string
    payload: object|string
}

interface AuthPayloadData extends PayloadData {
    payload: string
}

export {
    type PayloadData,
    type AuthPayloadData
}

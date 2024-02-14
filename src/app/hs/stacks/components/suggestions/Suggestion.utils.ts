export const getSuccessText= (type: string) => {
    return {
        message: `${type} suggestion saved, thank you!`,
        description: 'We will review your suggestion and add it to the list if it fits the requirements.'
    }
}

export const getErrorText = (type: string) => {
    return {
        message: `Error saving ${type} suggestion`,
        description: 'Please try again later or contact support.'
    }
}
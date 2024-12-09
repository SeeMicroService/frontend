const {createHash} = await import('crypto-browserify');

export function createSHA256Hash(inputString) {
    const hash = createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}
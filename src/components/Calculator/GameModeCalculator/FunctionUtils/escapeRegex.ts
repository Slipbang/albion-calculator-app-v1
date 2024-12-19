export const escapeRegex = (input: string) => {
    return input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
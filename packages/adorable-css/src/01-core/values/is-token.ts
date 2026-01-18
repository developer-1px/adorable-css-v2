export function isToken(value: string, category: 'spacing' | 'font' | 'size' | 'container'): boolean {
    if (category === 'font' || category === 'spacing' || category === 'size' || category === 'container') {
        // Check for xl pattern (2xl, 3xl, 10xl, 15xl, etc.)
        if (value.match(/^\d+xl$/)) {
            return true;
        }

        // Check for basic size tokens (xs, sm, md, lg, xl)
        if (['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'].includes(value)) {
            return true;
        }
    }
    return false;
}

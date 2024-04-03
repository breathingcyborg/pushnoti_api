export function extractBearerToken(authHeader: string) {
    const match = authHeader.match(/Bearer\s(\S+)/);
    return match ? match[1] : null;
}

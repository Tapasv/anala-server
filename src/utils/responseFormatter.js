export function formatDate(date) {
    return new Date(date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }) + " IST";
}

export function sanitizeUser(user) {

    const { password, ...safeUser } = user; // Object destructuring with the rest operator to exclude the password field, Remove the password from the user object and keep the remaining data in safeUser.

    return {
        ...safeUser,
        createdAt: formatDate(user.createdAt),
        updatedAt: formatDate(user.updatedAt)
    };
}
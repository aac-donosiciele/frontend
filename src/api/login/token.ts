
export function getToken() {
    return localStorage.getItem("token") || '';
}

export function setToken(token?: string | null) {
    if (token)
        localStorage.setItem('token', token);
    else
        localStorage.removeItem('token');
}

export function getUserName() {
    return localStorage.getItem("userName");
}

export function setUserName(userName?: string | null) {
    if (userName)
        localStorage.setItem('userName', userName);
    else
        localStorage.removeItem('userName');
}

export function getRole() {
    return localStorage.getItem("role");
}

export function setRole(role?: string | null) {
    if (role)
        localStorage.setItem('role', role);
    else
        localStorage.removeItem('role');
}

function RoleToInt(role: string | undefined | null) {
    switch (role) {
        case 'user':
            return 0;
        case 'official':
            return 1;
        case 'admin':
            return 2;
        default:
            return -1;
    }
}

export function RoleFromInt(role: number | undefined | null) {
    switch (role) {
        case 0:
            return 'user';
        case 1:
            return 'official';
        case 2:
            return 'admin';
        default:
            return 'error';
    }
}

export function HasRole(userRole: string | undefined | null, requiredRole: string | undefined | null) {
    return RoleToInt(userRole) >= RoleToInt(requiredRole)
}
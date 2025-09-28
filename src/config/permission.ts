type Permissions = {
    [key: string]: string[];
};

export const permission = {
    admin: {
        "author": ["read", "write", "update", "delete"],
        "book": ["read", "write", "update", "delete"],
        "bookCopy": ["read", "write", "update", "delete"]
    },

    manager: {
        "author": ["read", "write", "update"],
        "book": ["read", "write", "update"],
        "bookCopy": ["read", "write", "update", "delete"]
    },

    user: {
        "author": ["read"],
        "book": ["read", "write"],
        "bookCopy": ["read"]
    }
} as const;

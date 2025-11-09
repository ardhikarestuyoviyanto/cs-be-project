export interface Users {
    id: bigint | null;
    name: string;
    email: string;
    password: string | null;
    isActive: string;
    isAdmin: string;
}

export interface Company {
    id: bigint | null;
    name: string;
    address?: string | null;
    email?: string | null;
    phoneNumber: string;
}

export interface UserCompany {
    id: bigint;
    userId: bigint;
    companyId: bigint;
}

export interface Role {
    id: bigint;
    companyId: bigint;
    name: string;
}

export interface UserRole {
    id: bigint;
    userId: bigint;
    roleId: bigint;
}

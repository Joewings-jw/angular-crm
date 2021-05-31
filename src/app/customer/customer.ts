export interface Customer {
    id: number,
    avatar: string | null,
    first_name: string | null,
    last_name: string | null,
    rewards: string | number,
    email: string | null,
    membership: boolean | null,
    mobile: string | null,
    phone: string | null
}
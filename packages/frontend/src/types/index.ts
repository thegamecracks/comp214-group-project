export type Country = {
    country_id: string
    region_id: number | null
    name: string
}

export type Department = {
    department_id: number
    manager_id: number | null
    location_id: number
    name: string
}

export type Employee = {
    employee_id: number
    first_name: string | null
    last_name: string
    email: string
    phone_number: string | null
    hire_date: string
    job_id: string
    salary: number | null
    commission_pct: number | null
    manager_id: number | null
    department_id: number | null
}

export type Job = {
    job_id: string
    job_title: string
    job_description: string
    min_salary: number | null
    max_salary: number | null
}

export type Location = {
    location_id: number
    country_id: string | null
    city: string
    street_address: string | null
    postal_code: string | null
    state_province: string | null
}

export type Region = {
    region_id: number
    name: string
}

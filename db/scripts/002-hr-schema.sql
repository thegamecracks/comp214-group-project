CREATE TABLE region (
    region_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(25) -- region_name
);

CREATE TABLE country (
    country_id CHAR(2) PRIMARY KEY,
    region_id BIGINT REFERENCES region (region_id),
    name VARCHAR(40) -- country_name
);
CREATE INDEX ix_country_region_id ON country (region_id);

CREATE TABLE location (
    location_id BIGSERIAL PRIMARY KEY,
    country_id CHAR(2) REFERENCES country (country_id),
    city VARCHAR(30) NOT NULL,
    street_address VARCHAR(40),
    postal_code VARCHAR(12),
    state_province VARCHAR(25)
);
CREATE INDEX ix_location_country_id ON location (country_id);

CREATE TABLE department (
    department_id BIGSERIAL PRIMARY KEY,
    manager_id BIGINT, -- deferred foreign key constraint
    location_id BIGINT REFERENCES location (location_id),
    name VARCHAR(30) NOT NULL -- department_name
);
CREATE INDEX ix_department_manager_id ON department (manager_id);
CREATE INDEX ix_department_location_id ON department (location_id);

CREATE TABLE job (
    job_id VARCHAR(10) PRIMARY KEY,
    job_title VARCHAR(35) NOT NULL,
    min_salary NUMERIC(6),
    max_salary NUMERIC(6)
);

CREATE TABLE employee (
    employee_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(25) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    hire_date DATE NOT NULL,
    job_id VARCHAR(10) NOT NULL REFERENCES job (job_id),
    salary NUMERIC(8,2),
    commission_pct NUMERIC(2,2),
    manager_id BIGINT REFERENCES employee (employee_id),
    department_id BIGINT REFERENCES department (department_id)
);
CREATE INDEX ix_employee_job_id ON employee (job_id);
CREATE INDEX ix_employee_manager_id ON employee (manager_id);
CREATE INDEX ix_employee_department_id ON employee (department_id);
ALTER TABLE department ADD FOREIGN KEY (manager_id) REFERENCES employee (employee_id);

CREATE TABLE job_history (
    employee_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    job_id VARCHAR(10) NOT NULL REFERENCES job (job_id),
    department_id BIGINT NOT NULL REFERENCES department (department_id),
    PRIMARY KEY (employee_id, start_date)
);
CREATE INDEX ix_job_history_job_id ON job_history (job_id);

CREATE TABLE job_grade (
    grade_level VARCHAR(3),
    lowest_sal NUMERIC(8,2),
    highest_sal NUMERIC(8,2)
);

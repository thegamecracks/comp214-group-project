CREATE PROCEDURE hire_employee(
    first_name employee.first_name%TYPE,
    last_name employee.last_name%TYPE,
    email employee.email%TYPE,
    phone_number employee.phone_number%TYPE,
    hire_date employee.hire_date%TYPE,
    job_id employee.job_id%TYPE,
    salary employee.salary%TYPE,
    manager_id employee.manager_id%TYPE,
    department_id employee.department_id%TYPE
) AS $$
BEGIN
    INSERT INTO employee (first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
    VALUES (first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id);
END;
$$ LANGUAGE plpgsql;

CREATE PROCEDURE check_salary(
    p_job_id job.job_id%TYPE,
    p_salary job.min_salary%TYPE
) AS $$
DECLARE
    v_min_salary job.min_salary%TYPE;
    v_max_salary job.max_salary%TYPE;
BEGIN
    SELECT min_salary, max_salary INTO v_min_salary, v_max_salary
    FROM job WHERE job_id = p_job_id;

    IF p_salary < v_min_salary OR p_salary > v_max_salary THEN
        RAISE EXCEPTION
            'Invalid salary %. Salaries for job % must be between % and %.',
            p_salary,
            p_job_id,
            v_min_salary,
            v_max_salary;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION fn_employee_check_salary() RETURNS trigger AS $$
BEGIN
    CALL check_salary(NEW.job_id, NEW.salary);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tg_employee_check_salary
    BEFORE INSERT OR UPDATE ON employee
    FOR EACH ROW
    EXECUTE FUNCTION fn_employee_check_salary();

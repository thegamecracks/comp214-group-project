CREATE PROCEDURE new_job(
    job_id job.job_id%TYPE,
    job_title job.job_title%TYPE,
    min_salary job.min_salary%TYPE,
    max_salary job.max_salary%TYPE DEFAULT NULL
) AS $$
DECLARE
    v_max_salary max_salary%TYPE := COALESCE(max_salary, min_salary * 2);
BEGIN
    INSERT INTO job (job_id, job_title, min_salary, max_salary)
    VALUES (job_id, job_title, min_salary, v_max_salary);
END;
$$ LANGUAGE plpgsql;

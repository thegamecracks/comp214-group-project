CREATE PROCEDURE new_job(
    job_id job.job_id%TYPE,
    job_title job.job_title%TYPE,
    min_salary job.min_salary%TYPE
) AS $$
DECLARE
    max_salary job.max_salary%TYPE := min_salary * 2;
BEGIN
    INSERT INTO job (job_id, job_title, min_salary, max_salary)
    VALUES (job_id, job_title, min_salary, max_salary);
END;
$$ LANGUAGE plpgsql;

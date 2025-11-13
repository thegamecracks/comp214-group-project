CREATE TABLE account (
    account_id UUID PRIMARY KEY DEFAULT uuidv4(),
    name VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE account_login (
    account_id UUID PRIMARY KEY REFERENCES account (account_id) ON DELETE CASCADE,
    password TEXT
);

CREATE FUNCTION fn_account_login_insert() RETURNS trigger AS $$
BEGIN
    INSERT INTO account_login (account_id) VALUES (new.account_id);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tg_account_login_insert
    AFTER INSERT ON account
    FOR EACH ROW
    EXECUTE FUNCTION fn_account_login_insert();

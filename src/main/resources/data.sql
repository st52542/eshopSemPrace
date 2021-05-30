INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_PM');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
INSERT INTO uzivatel (jmeno,prijmeni,email,heslo,adresa,username) VALUES ('root','root','test@test.cz','root','bbb','root');
INSERT INTO user_roles (user_id, role_id) VALUES (1,3);

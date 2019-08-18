INSERT INTO users
    (displayname, username)
values
    ('alice','l33th4x0r'),
    ('bob','puppy_lover')
;
select * from users;
INSERT INTO todos 
    (priority, task, user_id)
VALUES
    (1, 'feed the cat',1),
    (2, 'pet the cat',1),
    (3, 'worship the cat',1),
    (99, 'go to work',1),
    (1, 'feed the cat',2),
    (2, 'pet the cat',2),
    (3, 'worship the cat',2)
;
select * from todos;

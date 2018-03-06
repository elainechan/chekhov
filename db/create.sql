CREATE TABLE case (
	id STRING PRIMARY KEY,
	client_id SERIAL NOT NULL,
	manager VARCHAR NOT NULL,
	workers ARRAY NOT NULL,
	active BOOLEAN NOT NULL,
	time_logged NUMERIC NOT NULL,
	est_closing DATE NOT NULL,
	task_ids ARRAY NOT NULL
);
/*
lecture video
https://www.youtube.com/watch?v=Eda-NmcE5mQ&feature=em-subs_digest
slides
https://cs50.github.io/web/resources/3/lecture3.pdf

SELECT * FROM case;

who worked the most hours in active cases
SELECT workers FROM case WHERE time_logged > 10 AND active = TRUE;

what cases the client has
SELECT * FROM case WHERE client_id = '1234';

what cases were spent the least time on
SELECT COUNT(*) FROM case WHERE time_logged < 10;

substring
SELECT * FROM case WHERE id LIKE '%a%'
*/
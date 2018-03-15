# Database Notes

## Steps
1. CONNECT to db
2. START server
3. SEED db with test data
4. REQUEST to API
5. INSPECT
	- response
	- state of db

## Mongoose
- [defining schemas](http://mongoosejs.com/docs/guide.html)
- [schema prototype](http://mongoosejs.com/docs/api.html#schema-date-js)
- [SchemaTypes](http://mongoosejs.com/docs/schematypes.html)
- [plugging in promises library](http://mongoosejs.com/docs/promises.html#plugging-in-your-own-promises-library)

## Schema
- tasks
- bills
- cases
- clients

## Schema References
- fullcalendar (JavaScript)
	- [API docs](https://fullcalendar.io/docs/)
- Google Calendar
	- [Goals: using ML to find when you have time slot](https://techcrunch.com/2016/04/12/google-calendar-goals/)
	- [API reference](https://developers.google.com/google-apps/calendar/v3/reference/)
- Todoist (JavaScript, Python)
	- [Integrations](https://en.todoist.com/integrations)
	- [Smart scheduling with AI](https://blog.todoist.com/2016/11/16/todoist-smart-schedule/)
	- [Python API](https://github.com/Doist/todoist-python)
	- [API reference](https://developer.todoist.com/sync/v7/)
	- [React components for reuse](https://github.com/Doist/reactist)
- TaskJuggler (Ruby) - unmaintained
	- [Source code](https://github.com/taskjuggler/TaskJuggler)
	- [Docs](http://taskjuggler.org/tj3/doc/)
	- [Manual](http://taskjuggler.org/tj3/manual/index.html)
- SkedPal
	- [manual with some hint on data model](https://www.skedpal.com/knowledge-base/)
	- [Fuzzy planning](http://www.skedpal.net/help_1_7/fixed-flexible-tasks/)
- Timely
	- [API docs](https://dev.timelyapp.com/)
	- [App](https://timelyapp.com/ultimate-manager)
- TimeCamp
	- [JS client source code](https://github.com/timecamp/timecamp-v2-javascript-client)
	- [API docs](https://github.com/timecamp/timecamp-api/blob/master/README.md)

## Database
- [Mongo data modeling intro](https://docs.mongodb.com/manual/core/data-modeling-introduction/)
- [Mongo CRUD operations](https://docs.mongodb.com/manual/crud/)
- [Learn MariaDB](https://mariadb.org/learn/)
- MongoDB
	- [cheatsheet](https://tf-curricula-prod.s3.amazonaws.com/pdfs/Mongo.pdf)
	- [start](https://docs.mongodb.com/manual/tutorial/getting-started/)
	- [npm](https://www.npmjs.com/package/mongodb)
	- [node driver](https://github.com/mongodb/node-mongodb-native)
	- [core-driver](https://github.com/mongodb-js/mongodb-core)

## Glossary
- access control list (ACL)
	- a list of permissions attached to an object.
- conflict resolution
	- [Hacker News thread](https://news.ycombinator.com/item?id=16309533)
	- e.g. Google Docs collarborative editing
	- conflict-free replicated data type (CRDT)
		- autmatically privilege one version over the other in event of conflict
		- [Wikipedia](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)
		- [Automerge: CRDT JSON project repo](https://github.com/automerge/automerge)
			- [paper](https://arxiv.org/abs/1608.03960)
		- [podcast](https://softwareengineeringdaily.com/2017/12/08/decentralized-objects-with-martin-kleppman/)
		- [podcast transcript](https://softwareengineeringdaily.com/wp-content/uploads/2017/12/SED477-CRDTs-Decentralized-Files.pdf)
	- operational transformation
		- [tutorial](https://operational-transformation.github.io/index.html)
		- [wikipedia](https://en.m.wikipedia.org/wiki/Operational_transformation)
		- [algorithm visualization](https://operational-transformation.github.io/visualization.html)
		- [ShareDB using OT](https://github.com/share/sharedb)
		- [Webstrates, experimental solution](https://github.com/Webstrates/Webstrates)
- concurrent data structures
	- [wikipedia](https://en.wikipedia.org/wiki/Concurrent_data_structure)
- [cache-oblivious data structures](https://rcoh.me/posts/cache-oblivious-datastructures/)
- [coroutine](https://lewissbaker.github.io/2017/09/25/coroutine-theory)

- faking, mocking and stubbing
	- [stackoverflow](https://stackoverflow.com/questions/346372/whats-the-difference-between-faking-mocking-and-stubbing)
	- [blogpost with code snippets](https://blog.pragmatists.com/test-doubles-fakes-mocks-and-stubs-1a7491dfa3da)
	- [blogpost with charts](https://www.linkedin.com/pulse/what-difference-between-stub-mock-virtual-service-wojciech-bulaty/)
	- [java example](https://spring.io/blog/2007/01/15/unit-testing-with-stubs-and-mocks/)
- [spy-based testing]
	- [paper](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2016/EECS-2016-116.pdf)
	- [jasmine spy](https://stackoverflow.com/questions/32512876/how-jasmine-spy-example-works)

## Postgres
- [official tutorial](https://www.postgresql.org/docs/9.2/static/tutorial.html)
- [query plan visualization](http://tatiyants.com/postgres-query-plan-visualization/)
- [exercises](https://pgexercises.com/questions/basic/)
- [SQL window functions quiz](http://www.windowfunctions.com/)
- [SQL tricks](https://postgres.cz/wiki/PostgreSQL_SQL_Tricks)
- [Expert Oracle Database Architecture](https://javidhasanov.files.wordpress.com/2012/01/expert-oracle-database-architecture.pdf)
- [Postgres GUI - Postico](https://eggerapps.at/postico/)
- [Mongo GUI](https://robomongo.org/)
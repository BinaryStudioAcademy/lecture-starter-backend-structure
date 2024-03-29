# Backend Structure Homework

### :bangbang: Attention  :bangbang:
**The code was written by the professionals for educational purposes. Don't repeat at home.**

### Prerequisites:
1. `npm install`
2.  create `.env` file, copy values from `.example.env`

## Start options (pick one):

### Option 1:
#### To run the server with a containerized database:
1. `npm run docker:dev:db` (runs database in docker container)
2. `npm run migrate:latest && npm run seed` (run only once, next time you start the server - skip this step)
3. `npm run dev`
#### To run the tests under the fully containerized environment:
1. `npm run docker:test`

### Option 2:
#### To run the server with a system DB instance:
1. Download and install the official Postgres **v.12** package for your OS - https://www.postgresql.org/download/
2. Using a DB observer tool (PGAdmin, Dbeaver, etc.) create a database
3. Update the `.env` with the relevant values:
   * `DATABASE_PORT` (default during installation is `5432`)
   * `DATABASE_NAME` (name of a newly created database)
   * `DATABASE_USER` (default username during installation is `postgres`)
   * `DATABASE_ACCESS_KEY` (password to the `postgres` user, which was also set during installation)
4. apply the migrations: `npm run migrate:latest && npm run seed` (run only once, next time you start the server - skip this step)
5. run the test and verify that the DB instance can be reached and everything passes: `npm run test`
6. run the server: `npm run dev`

### Troubleshooting:
* __Issue__: running the `npm run docker:test` command fails with:
```log
1 error occurred:
        * checking context: can't stat ...
```
* __Solution__: run `sudo chown -R $USER .docker_pgdata_test/` in terminal, while on the repo top level
* __Another solution__: drop all related existing containers and re-run the command
---
* __Issue__: running the `npm run docker:test` command fails with:
```log
failed to solve: failed to solve with frontend dockerfile.v0: failed to build LLB: 
  error from sender: 
    open ./lecture-starter-backend-structure/.docker_pgdata: permission denied
```
* __Solution__: apparently, the `docker:dev:db` command was invoked before, which conflicts with the previously created container data. Simply delete the pg related folder `sudo rm -rf ./docker_pgdata`

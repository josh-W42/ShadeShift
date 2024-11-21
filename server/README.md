# Shade Shift Server Code:

This is the flask backend server code for the color web app I have yet to name.

## Migrations:

This repo is currently using the ```flask-migrate``` lib to handle migrations.
Here a few commands to help perform database migrations:

1. Migrate

```commandline
flask db migrate -m "Migration Comment"
```

You would run this command after making a change to any model and
a migration file will be populated in `./migrations/versions`.

2. Apply Migration

```commandline
flask db upgrade
```

You would run this command to actually apply the migrations to the current database.


## Notes:

The `extract_colors` function would resolve problem `1` in the list above.

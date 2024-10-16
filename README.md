# Lienzo Lima Platform

## Initial Setup

```
pnpm install
```

```
pnpm dev
```

## DB Setup

Remove the local database and create a new one.

```
rm local.db
```

```
touch local.db
```

Push the schema to the database.

```
pnpm drizzle-kit push
```

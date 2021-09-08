# Awesome Project Build with TypeORM

## Development build

```sh
docker-compose up --force-recreate
```

## Production build

```sh
docker build -t rn-binance-signals .
```

## Sync schema

```sh
yarn typeorm schema:sync
```

## Run migrations

```sh
yarn typeorm migration:run
```

[More about typeorm cli](https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md)

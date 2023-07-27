# inventory-app
Inventory tracking app for a supermarket built using expressjs, mongodb and tailwindcss.

## Schemas
- Item
    + `name`: string
    + `description`: string
    + `price`: number
    + `category`: Category
    + `inStock`: number
    + (virtual) `url`: string

- Category
    + `name`: string
    + `description`: string
    + (virtual) `url`: string

## Building

``` sh
$ npm run build:css
$ npm run build
```

## TODO
- [ ] Remove trace from error screen

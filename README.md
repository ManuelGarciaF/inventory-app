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

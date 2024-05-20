# GraphQL API with TypeGraphQL, TypeGoose & TypeScript

### What technology are used?

- [TypeGraphQL](https://typegraphql.com/)
- [TypeGoose](https://typegoose.github.io/typegoose/)

---

## Queries & mutations

### Create user

Query

```
mutation createUser($input: CreateUserInput!){
  createUser(input: $input) {
    email
    _id
    name
  }
}
```

Input

```
{
  "input": {
    "email": "1@example.com",
    "name": "Jane Doe",
    "password": "password"
  }
}
```

### Get current user

Query

```
query {
  me {
    _id
    name
    email
  }
}
```

### Login

Query

```
mutation login($input: LoginInput!){
  login(input: $input)
}
```

Input

```
{
  "input": {
    "email": "1@example.com",
    "password": "password"
  }
}
```

### Create a product

Query

```
mutation createProduct($input: CreateProductInput!){
  createProduct(input: $input){
    _id
    price
    productId
    name
    description
  }
}
```

Input

```
{
  "input": {
    "name": "A test product111",
    "description": "blah blah blah blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah",
    "price": 24.99

  }
}
```

### Get products

```
query products {
  products {
    productId
    name
    description
    productId
  }
}
```

### Get a single product

Query

```
query product($input: GetProductInput!) {
  product(input: $input) {
    _id
    productId
    price
    name
    description
  }
}
```

Input

```
{
  "input": {
    "productId": "product_23cn3k61h8"
  }
}
```

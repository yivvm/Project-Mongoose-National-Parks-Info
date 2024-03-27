# Project-Mongoose-National-Parks-Info

# National Parks Information API Application - Mongoose Project

This API application provides endpoints to manage information about national parks, park codes, and associated images.

## Available Routes - CRUD Operations

### Parks

- **GET /parks**: Retrieve all parks.
- **GET /parks/:parkCode**: Retrieve a park by park code.
- **POST /parks**: Create a new park.
- **PATCH /parks/:parkCode**: Update a park by park code.
- **DELETE /parks/:parkCode**: Delete a park by park code.

### Images

- **GET /images**: Retrieve all images.
- **GET /images/:id**: Retrieve an image by ID.
- **POST /parks**: Create a new image.
- **PATCH /parks/:id**: Update a image by ID.
- **DELETE /parks/:id**: Delete a image by ID.

### Park Codes

- **GET /parkcode/:parkCode**: Retrieve park code information by park code.
- **GET /parks/:parkCode**: Retrieve a park code information by park code.
- **POST /parks**: Create a new park code information set.
- **PATCH /parks/:parkCode**: Update park code information by park code.
- **DELETE /parks/:parkCode**: Delete park code information by park code.

## Sample Park Code Validation

The park code field in the Parks collection is validated using the following regex pattern: `/[A-Za-z]{4}/`. This ensures that park codes consist of exactly four alphabetical characters.

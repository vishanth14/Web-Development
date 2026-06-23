# Blog REST API

A REST API for managing blog posts, built with Node.js and Express.js. Supports Create, Read, Update, and Delete operations with input validation and proper HTTP status codes.

## Tech Stack

- Node.js
- Express.js
- JavaScript (ES6+)
- JSON (file-based storage, no external database)

## Project Structure

```
blog-rest-api/
├── server.js              # Entry point, starts the HTTP server
├── app.js                 # Express app setup, middleware, route mounting
├── routes/
│   └── posts.js           # Route definitions for /api/posts
├── controllers/
│   └── postsController.js # Request/response logic for each endpoint
├── middleware/
│   ├── validate.js         # Input validation for post body and id params
│   └── errorHandler.js     # 404 and centralized error handling
├── utils/
│   └── dataStore.js        # Read/write helpers for the JSON data file
├── data/
│   └── posts.json          # Persisted blog post data
├── package.json
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm

### Installation

```bash
git clone <your-repo-url>
cd blog-rest-api
npm install
```

### Running the server

```bash
npm start
```

For auto-restart on file changes during development:

```bash
npm run dev
```

The server runs on `http://localhost:3000` by default. You can override the port with an environment variable: `PORT=4000 npm start`.

## API Endpoints

| Method | Endpoint          | Description                  | Success Status |
|--------|--------------------|-------------------------------|-----------------|
| GET    | `/api/posts`        | Get all blog posts            | 200             |
| GET    | `/api/posts/:id`    | Get a single post by id       | 200             |
| POST   | `/api/posts`        | Create a new blog post        | 201             |
| PUT    | `/api/posts/:id`    | Update an existing post       | 200             |
| DELETE | `/api/posts/:id`    | Delete a post                 | 200             |

### Post object shape

```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the body of the post.",
  "author": "Jane Doe",
  "createdAt": "2026-06-23T09:48:47.237Z",
  "updatedAt": "2026-06-23T09:48:47.237Z"
}
```

`author` is optional on create and defaults to `"Anonymous"`.

## Example Requests

### Create a post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Post", "content": "This is the body.", "author": "Jane Doe"}'
```

### Get all posts
```bash
curl http://localhost:3000/api/posts
```

### Get a single post
```bash
curl http://localhost:3000/api/posts/1
```

### Update a post
```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"content": "Updated content."}'
```

### Delete a post
```bash
curl -X DELETE http://localhost:3000/api/posts/1
```

## Validation & Error Handling

- `POST /api/posts` requires both `title` and `content` as non-empty strings. Missing or invalid fields return `400 Bad Request` with a list of validation errors.
- `PUT /api/posts/:id` allows partial updates, but any field that is provided must still be a non-empty string.
- Any `:id` param that isn't a positive integer returns `400 Bad Request`.
- Requesting, updating, or deleting a post that doesn't exist returns `404 Not Found`.
- Unmatched routes return `404 Not Found`.
- Unexpected server errors are caught by a centralized error handler and return `500 Internal Server Error`.

All responses follow a consistent shape:

```json
{
  "success": true,
  "data": { ... }
}
```

or, on failure:

```json
{
  "success": false,
  "message": "Description of what went wrong"
}
```

## Data Persistence

Posts are stored in `data/posts.json`. This keeps data persisted across server restarts without needing a database setup, which is useful for a project of this scope. The file is read and written through helper functions in `utils/dataStore.js`, so swapping in a real database later would only mean changing that one file.

## Testing

The endpoints above were manually verified with `curl` for each CRUD operation, including edge cases (missing fields, invalid ids, and requests for posts that don't exist). A Postman collection can be built from the table above if preferred.

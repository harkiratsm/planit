# PlanIt

![PlanIt](https://socialify.git.ci/harkiratsm/planit/image?font=Inter&name=1&owner=1&pattern=Circuit%20Board&theme=Light)

<p align="center">
  <strong>Stay organized with all your tasks in one place. </strong>
  <br>
  <a href="https://planit-marketing.vercel.app/"><strong>Learn more »</strong></a>
</p>

## Table of Contents
- [About planit](#about-planit)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Example API Request](#example-api-request)
- [Contributing](#contributing)
- [License](#license)

## About PlanIt

PlanIt is a comprehensive task management application designed to help users stay organized and efficient. With its user-friendly interface and powerful features, PlanIt allows individuals and teams to manage their tasks seamlessly. Whether you're tracking personal projects or collaborating with colleagues, PlanIt provides the tools you need to prioritize, schedule, and complete your tasks effectively. Its integration with modern technologies ensures a secure and responsive experience, making it the ideal choice for anyone looking to enhance their productivity.

## Features

- Centralized Task Management application 
- Intuitive user interface for easy navigation
- Powerful search functionality
- Secure authentication using NextAuth.js
- RESTful API for integration with other applications

## Tech Stack

- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [Next.js](https://nextjs.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **API:** [tRPC](https://trpc.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/harkiratsm/planit.git
   cd planit
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary variables. Refer to `.env.example` for the required variables.

4. Set up the database:
   Ensure PostgreSQL is running and create a new database. Update the database connection settings in the `.env` file.

5. Run database migrations:
   ```sh
   npm run migrate
   ```

6. Start the development server:
   ```sh
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

This Turborepo includes the following packages and apps:

- `marketing`: Landing page for PlanIt
- `web`: Main PlanIt application
- `@repo/ui`: Shared React component library
- `@repo/api`: API layer for handling requests and responses
- `@repo/drizzle`: ORM for database interactions
- `@repo/trpc`: Type-safe remote procedure calls for client-server communication
- `@repo/lib`: Shared utility functions and helpers
- `@repo/tailwind-config`: Configuration for Tailwind CSS styling
- `@repo/typescript-config`: Shared TypeScript configurations

## API Documentation

The PlanIt API provides access to various functionalities of the application. For detailed information about the available endpoints, request/response formats, and example usage, please refer to our Swagger documentation:

```
http://localhost:3000/api/v1/openapi
```

### Authentication

To access the API, you need to authenticate your requests using an API token. Follow these steps to obtain and use your API token:

1. Navigate to `http://localhost:3000/settings/apitoken` in your browser.
2. Click on the "Generate Token" button to create a new API token.
3. Copy the generated token and store it securely.
4. Include the token in your API requests using the `Authorization` header:
   ```
   Authorization: Bearer YOUR_API_TOKEN
   ```

### Example API Request

Here's an example of how to make an authenticated API request using curl:

```sh
curl --location 'YOUR_API_ENDPOINT' \
--header 'Authorization: Bearer YOUR_API_TOKEN'
```

## Contributing

We welcome contributions to PlanIt! Please read our contributing guidelines (link to CONTRIBUTING.md) for details on how to submit pull requests, report issues, and suggest improvements.

## License

PlanIt is released under the [MIT License](LICENSE).
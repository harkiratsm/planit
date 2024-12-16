import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '../../trpc/server/router';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'PlanIt Api',
  description: 'The PlanIt API for managing tasks',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000/api',
  docsUrl: 'https://github.com/harkiratsm/planit',
  tags: ['note', 'folder'],
});

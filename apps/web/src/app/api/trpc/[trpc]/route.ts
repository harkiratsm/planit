import { auth } from "@/auth";
import { appRouter } from "@repo/trpc/server/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextApiRequest, NextApiResponse } from 'next';
import { createOpenApiNextHandler } from 'trpc-openapi';

const createContext = async () => {
  const session = await auth();
  return { session: session || null };
};

const trpcHandler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

const openApiHandler = createOpenApiNextHandler({
  router: appRouter,
  createContext,
  responseMeta: () => ({}),
  onError: () => ({}),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.url?.startsWith('/api/trpc')) {
    return trpcHandler(req as unknown as Request);
  } else {
    return openApiHandler(req, res);
  }
};

export { handler as GET, handler as POST };

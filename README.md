
## Getting Started

If you wish to run the application yourself, duplicate the file `.env.example` as `.env.local`
and paste in the required values from your **App registration** in the [Microsoft Entra admin center](https://entra.microsoft.com).

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Slides
The slides of this presentation can be viewed [here](https://github.com/DalexKraus/fh-aut4-entra-id/blob/main/slides.html).

## References
* https://nextjs.org/docs/pages/api-reference/create-next-app
* https://next-auth.js.org/getting-started/example#add-api-route
* https://next-auth.js.org/configuration/initialization#route-handlers-app
* https://next-auth.js.org/providers/azure-ad

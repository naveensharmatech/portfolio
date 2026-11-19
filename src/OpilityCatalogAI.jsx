export default function OpilityCatalogAI() {
  return (
    <article id="opility-catalog-ai" className="mt-8 grid gap-6 rounded-3xl border border-ink/10 bg-surface p-6 md:grid-cols-2 md:p-8">
      <div>
        <h3 className="text-2xl font-semibold">Opility Catalog AI</h3>
        <p className="mt-3 text-sm leading-6 text-muted">
          Ella drafts e-commerce listings from seller-provided facts. In a captured test of the published Dify agent, Ella generated English and Hebrew Shopify listing copy and flagged details for review before publication.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          During setup, the Dify editor returned a runtime parameter error. The build record captures the recovery and the successful hosted run. A separate Next.js frontend uses a server-side Dify API proxy. Live Service API validation for that frontend is pending.
        </p>
        <a className="mt-5 inline-block text-sm font-semibold underline" href="https://udify.app/agent/hAhLK7FhuM6NwNvd">
          Open the hosted Ella prototype
        </a>
      </div>
      <figure>
        <a href="/projects/opility-catalog-ai/hosted-shopify-output.png">
          <img className="w-full rounded-xl" src="/projects/opility-catalog-ai/hosted-shopify-output.png" alt="Captured conversation in Ella’s published Dify app during the Shopify listing test" loading="lazy" />
        </a>
        <figcaption className="mt-2 text-sm text-muted">Cropped screenshot from the published Dify app test.</figcaption>
      </figure>
    </article>
  )
}

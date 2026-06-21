import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Epicon'
const SITE_URL = 'https://epiconml.github.io'
const DEFAULT_OG_IMAGE = '/banner.png'
const TWITTER_HANDLE = '@epiconml'

export default function SEO({ title, description, ogImage = DEFAULT_OG_IMAGE, canonicalUrl, jsonLd }) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} · Lightweight Machine Learning Library`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl || SITE_URL} />
      <meta property="og:type" content={jsonLd?.type === 'SoftwareApplication' ? 'website' : 'article'} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}

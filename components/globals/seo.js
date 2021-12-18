import Head from 'next/head'

function SEO({ title, description, keywords, imagePreview }) {

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta name="twitter:creator" content="@CSweeting_" key="twhandle" />

      {/* Open Graph */}
      <meta property="og:url" content="https://charliesweeting.com/" key="ogurl" />
      <meta property="og:image" content={imagePreview} key="ogimage" />
      <meta property="og:site_name" content="Charlie Sweeting" key="ogsitename" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <title>{title}</title>
    </Head>
  )
}

export default SEO

import React, { useEffect } from 'react';
import type { SEOData } from '@/types';

interface SEOProps {
  seo: SEOData;
  schema?: object | object[];
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export const SEO: React.FC<SEOProps> = ({ seo, schema }) => {
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  useEffect(() => {
    // Title
    document.title = seo.title;

    // Description
    setMetaTag('name', 'description', seo.description);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.canonical);

    // Open Graph
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:url', seo.canonical);
    setMetaTag('property', 'og:type', seo.ogType || 'website');
    if (seo.ogImage) {
      setMetaTag('property', 'og:image', seo.ogImage);
    }

    // Twitter
    setMetaTag('name', 'twitter:card', seo.twitterCard || 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);
    if (seo.ogImage) {
      setMetaTag('name', 'twitter:image', seo.ogImage);
    }

    // Schema.org JSON-LD
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld]');
    existingScripts.forEach((el) => el.remove());

    schemas.forEach((s) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });

    return () => {
      const jsonLdScripts = document.querySelectorAll('script[data-seo-jsonld]');
      jsonLdScripts.forEach((el) => el.remove());
    };
  }, [seo, schemas]);

  return null;
};

export default SEO;

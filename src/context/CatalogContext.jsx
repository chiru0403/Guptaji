import { createContext, useContext, useEffect, useState } from 'react';
import { getCategories, getGallery, getProducts, getSite } from '../api';
import { galleryImages as fallbackGallery } from '../data/products';
import { adoptSite, site as fallbackSite } from '../data/site';

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState(fallbackGallery);
  const [site, setSite] = useState(fallbackSite);
  const [siteFromApi, setSiteFromApi] = useState(false);
  const [siteError, setSiteError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [categoryResult, productResult, galleryResult, siteResult] = await Promise.allSettled([
        getCategories(),
        getProducts(),
        getGallery(),
        getSite(),
      ]);
      if (cancelled) return;
      if (categoryResult.status === 'fulfilled' && Array.isArray(categoryResult.value)) {
        setCategories(categoryResult.value);
      }
      if (productResult.status === 'fulfilled' && Array.isArray(productResult.value)) {
        setProducts(productResult.value);
      }
      if (galleryResult.status === 'fulfilled' && Array.isArray(galleryResult.value) && galleryResult.value.length) {
        setGallery(galleryResult.value);
      }
      if (siteResult.status === 'fulfilled' && siteResult.value?.name) {
        setSite({ ...adoptSite(siteResult.value) });
        setSiteFromApi(true);
        setSiteError('');
      } else {
        setSiteFromApi(false);
        setSiteError(
          siteResult.status === 'rejected'
            ? siteResult.reason?.message || 'Could not load shop details.'
            : 'Shop details were missing from the site API.',
        );
      }
      setReady(true);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <CatalogContext.Provider value={{ products, categories, gallery, site, siteFromApi, siteError, ready }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const catalog = useContext(CatalogContext);
  if (!catalog) throw new Error('useCatalog must be used within CatalogProvider');
  return catalog;
}

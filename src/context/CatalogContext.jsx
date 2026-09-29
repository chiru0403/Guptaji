import { createContext, useContext, useEffect, useState } from 'react';
import { getCategories, getGallery, getProducts, getSite } from '../api';
import { galleryImages as fallbackGallery, products as fallbackProducts } from '../data/products';
import { adoptSite, site as fallbackSite } from '../data/site';

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(fallbackProducts);
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState(fallbackGallery);
  const [site, setSite] = useState(fallbackSite);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [nextCategories, nextProducts, nextGallery] = await Promise.all([
          getCategories(),
          getProducts(),
          getGallery(),
        ]);
        if (cancelled) return;
        if (Array.isArray(nextCategories) && nextCategories.length) setCategories(nextCategories);
        if (Array.isArray(nextProducts) && nextProducts.length) setProducts(nextProducts);
        if (Array.isArray(nextGallery) && nextGallery.length) setGallery(nextGallery);
        const remoteSite = await getSite();
        if (cancelled) return;
        if (remoteSite && typeof remoteSite === 'object' && remoteSite.name) {
          setSite({ ...adoptSite(remoteSite) });
        }
      } catch {
        // The bundled catalogue stays in place when the API is offline.
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <CatalogContext.Provider value={{ products, categories, gallery, site }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const catalog = useContext(CatalogContext);
  if (!catalog) throw new Error('useCatalog must be used within CatalogProvider');
  return catalog;
}

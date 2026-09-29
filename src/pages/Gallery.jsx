import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { getGallery } from '../api';

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getGallery()
      .then((images) => {
        if (!cancelled) setGallery(Array.isArray(images) ? images : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load gallery.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <>
      <PageMeta
        title="Gallery"
        description="A taste of Gupta Namkin — product and snack moments from our Yavatmal shop."
      />

      <section className="mx-auto max-w-[1180px] px-5 py-16 md:px-7 md:py-20">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-saffron">
          A Taste of Gupta Namkin
        </span>
        <h1 className="mt-2 mb-10 font-display text-[clamp(2.4rem,4.5vw,4rem)] leading-tight tracking-tight text-maroon">
          Snack moments, <em className="italic text-saffron">made better.</em>
        </h1>

        {loading ? (
          <p className="py-16 text-center text-muted">Loading gallery...</p>
        ) : error ? (
          <p className="py-16 text-center text-muted">{error}</p>
        ) : gallery.length === 0 ? (
          <p className="py-16 text-center text-muted">No gallery photos yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {gallery.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActive(i)}
                className={`group cursor-pointer overflow-hidden rounded-2xl border-0 p-0 ${
                  i === 0
                    ? 'col-span-2 row-span-2 min-h-[280px] md:min-h-[420px]'
                    : 'min-h-[160px] md:min-h-[200px]'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {active !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <X size={24} />
          </button>
          <img
            src={gallery[active].src}
            alt={gallery[active].alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

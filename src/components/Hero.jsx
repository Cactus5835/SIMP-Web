import { useSiteContent } from '../utils/useSiteContent'
import { useContentJson } from '../utils/useContent'

const FALLBACK = {
  header: { clubName: 'Student Institution of miHoYo Players' },
  hero: {
    kicker: 'Student Institution of miHoYo Players · UniMelb',
    title: 'Connecting Hoyoverse Gamers at UniMelb',
    subtitle: 'Genshin Impact · Honkai: Star Rail · Zenless Zone Zero',
    primaryCta: { label: 'See Events', href: '#events' },
    secondaryCta: { label: 'Join & Contact', href: '#explore' },
  },
}

export default function Hero({ lang = 'en' }) {
  const site = useSiteContent(lang, FALLBACK)
  const hero = site?.hero || FALLBACK.hero

  // Optional: Uni-Con promo buttons (managed in CMS)
  const unicon = useContentJson(`/content/unicon_${lang}.json`, null)
  const promo = unicon?.heroButtons
  const promoEnabled = !!promo?.enabled
  const promoButtons = Array.isArray(promo?.buttons) ? promo.buttons.filter(Boolean).slice(0, 2) : []
  const hideSecondary = !!promo?.hideDefaultSecondaryCta

  return (
    <section className="hero" id="top">
      <div className="heroPanel">
        <div className="kicker">{hero.kicker}</div>
        <h1 className="heroTitle">{hero.title}</h1>
        <p className="heroSub">{hero.subtitle}</p>

        <div className="heroCtas">
          {promoEnabled && promoButtons.length ? (
            <>
              <a className="btn primary" href={promoButtons[0]?.href || '#unicon-forms'}>
                {promoButtons[0]?.label || 'Uni-Con Form'}
              </a>
              <a className="btn secondary" href={promoButtons[1]?.href || '#unicon-forms'}>
                {promoButtons[1]?.label || 'Another Form'}
              </a>
            </>
          ) : (
            <>
              <a className="btn primary" href={hero.primaryCta?.href || '#events'}>
                {hero.primaryCta?.label || 'See Events'}
              </a>
              {!hideSecondary ? (
                <a className="btn secondary" href={hero.secondaryCta?.href || '#explore'}>
                  {hero.secondaryCta?.label || 'Join & Contact'}
                </a>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

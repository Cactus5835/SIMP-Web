import { useContentJson } from '../utils/useContent'
import Explore from '../components/Explore'
import Footer from '../components/Footer'

const FALLBACK = {
  title: 'About SIMP UniMelb',
  text: 'We are a student club at the University of Melbourne that connects Hoyoverse gamers across Genshin Impact, Honkai: Star Rail and Zenless Zone Zero.',
  image: '',
  contact: {
    email: 'simp.unimelb@example.com',
    hours: 'Weekdays 9:00–17:00',
  },
  feedback: {
    title: 'Feedback',
    text: 'Have ideas or suggestions? Let us know via the form.',
    formUrl: '#',
    ctaLabel: 'Open form',
  },
  social: {
    title: 'Social media',
    instagramUrl: '',
    discordUrl: '',
    rednoteQr: '',
    wechatQr: '',
  },
}

export default function About({ lang = 'en' }) {
  const data = useContentJson(`/content/about_${lang}.json`, FALLBACK)

  return (
    <main className="page">
      <section className="section pageHero">
        <h1 className="pageTitle">{data.title || FALLBACK.title}</h1>
        <div className="pageGrid">
          <div className="pageText">
            <p className="lead">{data.text || FALLBACK.text}</p>

            <div className="pageBlock">
              <div id="contact" className="blockTitle">{data.contactTitle || 'Contact'}</div>
              <div className="muted">{data?.contact?.email || FALLBACK.contact.email}</div>
              <div className="muted">{data?.contact?.hours || FALLBACK.contact.hours}</div>
            </div>

            <div className="pageBlock">
              <div className="blockTitle">{data?.social?.title || FALLBACK.social.title}</div>
              <div className="socialGrid">
                <a
                  className={`socialLink ${data?.social?.instagramUrl ? '' : 'disabled'}`}
                  href={data?.social?.instagramUrl || '#'}
                  target={data?.social?.instagramUrl ? '_blank' : undefined}
                  rel={data?.social?.instagramUrl ? 'noreferrer' : undefined}
                  onClick={(e) => {
                    if (!data?.social?.instagramUrl) e.preventDefault()
                  }}
                >
                  Instagram
                </a>
                <a
                  className={`socialLink ${data?.social?.discordUrl ? '' : 'disabled'}`}
                  href={data?.social?.discordUrl || '#'}
                  target={data?.social?.discordUrl ? '_blank' : undefined}
                  rel={data?.social?.discordUrl ? 'noreferrer' : undefined}
                  onClick={(e) => {
                    if (!data?.social?.discordUrl) e.preventDefault()
                  }}
                >
                  Discord
                </a>
              </div>

              <div className="qrMiniGrid">
                <div className="qrMini">
                  <div className="muted">RedNote</div>
                  {data?.social?.rednoteQr ? <img src={data.social.rednoteQr} alt="RedNote QR" /> : <div className="qrMiniPh" />}
                </div>
                <div className="qrMini">
                  <div className="muted">WeChat</div>
                  {data?.social?.wechatQr ? <img src={data.social.wechatQr} alt="WeChat QR" /> : <div className="qrMiniPh" />}
                </div>
              </div>
            </div>

            <div className="pageBlock feedback">
              <div>
                <div className="blockTitle">{data?.feedback?.title || FALLBACK.feedback.title}</div>
                <div className="muted">{data?.feedback?.text || FALLBACK.feedback.text}</div>
              </div>
              <a
                className="btn primary"
                href={data?.feedback?.formUrl || '#'}
                target={data?.feedback?.formUrl && data.feedback.formUrl !== '#' ? '_blank' : undefined}
                rel={data?.feedback?.formUrl && data.feedback.formUrl !== '#' ? 'noreferrer' : undefined}
                onClick={(e) => {
                  if (!data?.feedback?.formUrl || data.feedback.formUrl === '#') e.preventDefault()
                }}
              >
                {data?.feedback?.ctaLabel || FALLBACK.feedback.ctaLabel}
              </a>
            </div>
          </div>

          <div className="pageMedia">
            {data.image ? <img className="pageImage" src={data.image} alt="" /> : <div className="pageImage ph" />}
          </div>
        </div>
      </section>

      <Explore lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}

import { useContentJson } from '../utils/useContent'

const FALLBACK = {
  anchorId: 'unicon-forms',
  sectionTitle: 'Uni-Con Forms',
  sectionSubtitle: 'Please help us plan Uni-Con by filling in the forms below.',
  heroButtons: {
    enabled: true,
    hideDefaultSecondaryCta: true,
    buttons: [
      { label: 'Uni-Con EOI', href: '#unicon-forms' },
      { label: 'Favourite miHoYo Character', href: '#unicon-forms' },
    ],
  },
  forms: [
    {
      key: 'eoi',
      title: 'Uni-Con (Unimelb Anime Convention) — Expression of Interest',
      desc: 'Tell us if you’d attend, volunteer, or help out. Your input shapes the event.',
      formUrl: '',
      buttonLabel: 'Open form',
      qrImage: '',
    },
    {
      key: 'mihoyo',
      title: 'Favourite miHoYo Character',
      desc: 'Vote for your favourite character — we’ll use results for activities and merch ideas.',
      formUrl: '',
      buttonLabel: 'Vote now',
      qrImage: '',
    },
  ],
}

function isValidUrl(url) {
  if (!url) return false
  try {
    // allow hash links too
    if (String(url).startsWith('#')) return true
    // eslint-disable-next-line no-new
    new URL(url)
    return true
  } catch {
    return false
  }
}

export default function UniconQrSection({ lang = 'en' }) {
  const data = useContentJson(`/content/unicon_${lang}.json`, FALLBACK)
  const anchorId = data?.anchorId || FALLBACK.anchorId
  const forms = Array.isArray(data?.forms) && data.forms.length ? data.forms : FALLBACK.forms

  return (
    <section id={anchorId} className="section">
      <div className="sectionHead">
        <div>
          <h2 className="h2">{data?.sectionTitle || FALLBACK.sectionTitle}</h2>
          {data?.sectionSubtitle ? <p className="muted">{data.sectionSubtitle}</p> : null}
        </div>
      </div>

      <div className="qrGrid">
        {forms.map((f, idx) => {
          const url = f?.formUrl || ''
          const ok = isValidUrl(url) && !String(url).startsWith('#')
          return (
            <div key={f?.key || idx} className="qrCard">
              <div className="qrCardTop">
                <div className="qrTitle">{f?.title || 'Form'}</div>
                {f?.desc ? <div className="muted">{f.desc}</div> : null}
              </div>

              <div className="qrBody">
                <div className={`qrSlot ${f?.qrImage ? 'has' : ''}`}>
                  {f?.qrImage ? <img src={f.qrImage} alt="QR code" loading="lazy" /> : <div className="muted">Add QR image in CMS</div>}
                </div>

                <a
                  className={`btn primary ${ok ? '' : 'disabled'}`}
                  href={ok ? url : '#'}
                  target={ok ? '_blank' : undefined}
                  rel={ok ? 'noreferrer' : undefined}
                  onClick={(e) => {
                    if (!ok) e.preventDefault()
                  }}
                >
                  {f?.buttonLabel || 'Open form'}
                </a>

                {!ok && url ? <div className="muted small">(Set a valid Google Form link in CMS)</div> : null}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

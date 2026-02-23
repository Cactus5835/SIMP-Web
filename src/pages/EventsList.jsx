import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadEvents } from '../utils/loadEvents'
import { useContentJson } from '../utils/useContent'

const FALLBACK = {
  events: {
    title: 'Events',
    subtitle: 'All upcoming and past events.',
    noEvents: 'No events',
  },
}

export default function EventsList({ lang = 'en' }) {
  const [events, setEvents] = useState([])
  const copy = useContentJson(`/content/events_${lang}.json`, FALLBACK)
  const labels = copy?.events || FALLBACK.events

  useEffect(() => {
    let cancelled = false
    loadEvents(lang).then((list) => {
      if (!cancelled) setEvents(Array.isArray(list) ? list : [])
    })
    return () => {
      cancelled = true
    }
  }, [lang])

  const sorted = useMemo(() => {
    return [...events].sort((a, b) => String(b.date).localeCompare(String(a.date)))
  }, [events])

  const byYear = useMemo(() => {
    const map = new Map()
    for (const e of sorted) {
      const y = (e?.date || '').slice(0, 4) || 'Other'
      if (!map.has(y)) map.set(y, [])
      map.get(y).push(e)
    }
    return map
  }, [sorted])

  return (
    <main className="pageWrap">
      <section className="section pageSection">
        <h1 className="sectionTitle">{labels.title || 'Events'}</h1>
        {labels.subtitle ? <p className="sectionSubtitle">{labels.subtitle}</p> : null}

        {sorted.length === 0 ? (
          <div className="emptyState">{labels.noEvents || 'No events'}</div>
        ) : (
          <div className="eventsYears">
            {['2026', '2025'].map((y) => {
              const list = byYear.get(y) || []
              if (!list.length) return null
              return (
                <div key={y} className="eventsYearBlock">
                  <h2 className="eventsYearTitle">{y}</h2>
                  <div className="eventsRows">
                    {list.map((e) => (
                      <Link key={e.id} to={`/events/${e.slug}`} className="eventRow">
                        <div className="eventRowLeft">
                          <div className="eventRowTitle">
                            {e.title}
                            {e.tag ? <span className="pill tiny">{e.tag}</span> : null}
                          </div>
                          <div className="muted eventRowMeta">
                            {e.location ? <span>{e.location}</span> : null}
                            {e.time ? <span> · {e.time}</span> : null}
                          </div>
                        </div>
                        <div className="eventRowDate">{e.date}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Any other years */}
            {Array.from(byYear.keys())
              .filter((k) => k !== '2026' && k !== '2025')
              .sort((a, b) => String(b).localeCompare(String(a)))
              .map((y) => (
                <div key={y} className="eventsYearBlock">
                  <h2 className="eventsYearTitle">{y}</h2>
                  <div className="eventsRows">
                    {(byYear.get(y) || []).map((e) => (
                      <Link key={e.id} to={`/events/${e.slug}`} className="eventRow">
                        <div className="eventRowLeft">
                          <div className="eventRowTitle">
                            {e.title}
                            {e.tag ? <span className="pill tiny">{e.tag}</span> : null}
                          </div>
                          <div className="muted eventRowMeta">
                            {e.location ? <span>{e.location}</span> : null}
                            {e.time ? <span> · {e.time}</span> : null}
                          </div>
                        </div>
                        <div className="eventRowDate">{e.date}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </main>
  )
}

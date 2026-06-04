import '../styles/PagePlaceholder.css'

export default function PlaceholderPage({ sectionTitle }) {
  const titleId = `${sectionTitle.toLowerCase().replace(/\s+/g, '-')}-placeholder-title`

  return (
    <section className="page-placeholder" aria-labelledby={titleId}>
      <div className="page-placeholder__card">
        <p className="page-placeholder__label">{sectionTitle}</p>
        <h1 id={titleId}>Информация скоро появится</h1>
        <p>Мы уже готовим этот раздел.</p>
      </div>
    </section>
  )
}

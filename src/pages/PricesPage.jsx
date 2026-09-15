import '../styles/DocumentsPage.css'
import '../styles/PricesPage.css'

const priceListUrl = '/documents/price-list-2026-06-10.pdf'

export default function PricesPage() {
  return (
    <section className="documents-page prices-page" aria-labelledby="prices-page-title">
      <div className="documents-page__inner">
        <p className="documents-page__eyebrow">Цены</p>
        <h1 className="documents-page__title" id="prices-page-title">
          Стоимость услуг
        </h1>
        <p className="documents-page__subtitle">
          Ознакомьтесь с ценами на услуги клиники в прайс-листе.
        </p>

        <article className="documents-page__panel prices-page__file">
          <span className="prices-page__file-icon" aria-hidden="true">PDF</span>
          <div className="prices-page__file-info">
            <h2>Прайс-лист от 10.06.2026</h2>
            <p>PDF · 17,2 МБ</p>
          </div>
          <div className="prices-page__actions">
            <a className="prices-page__open" href={priceListUrl} target="_blank" rel="noopener noreferrer">
              Открыть PDF <span className="prices-page__sr-only">(в новой вкладке)</span>
            </a>
            <a className="prices-page__download" href={priceListUrl} download="Прайс-лист Арктик Дент от 10.06.2026.pdf">
              Скачать
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

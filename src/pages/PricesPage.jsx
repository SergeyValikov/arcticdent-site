import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import PriceListViewer from '../components/PriceListViewer.jsx'
import priceList from '../data/priceList.json'
import '../styles/DocumentsPage.css'
import '../styles/PricesPage.css'

const priceListUrl = priceList.pdf
const priceListSize = (priceList.bytes / 1024 / 1024).toLocaleString('ru-RU', { maximumFractionDigits: 1 })

export default function PricesPage() {
  const [isViewerOpen, setIsViewerOpen] = useState(false)

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
          <span className="prices-page__file-icon" aria-hidden="true">
            <Icon name="priceList" />
          </span>
          <div className="prices-page__file-info">
            <h2>Прайс-лист от 10.06.2026</h2>
            <p>{priceList.pages.length} страниц · PDF · {priceListSize} МБ</p>
          </div>
          <div className="prices-page__actions">
            <button className="prices-page__open" type="button" aria-expanded={isViewerOpen} aria-controls="price-list-viewer" onClick={() => setIsViewerOpen(!isViewerOpen)}>
              {isViewerOpen ? 'Скрыть прайс' : 'Посмотреть прайс'}
            </button>
            <a className="prices-page__download" href={priceListUrl} download="Прайс-лист Арктик Дент от 10.06.2026.pdf">
              Скачать
            </a>
          </div>
        </article>
        {isViewerOpen && <PriceListViewer pages={priceList.pages} pdf={priceListUrl} />}
      </div>
    </section>
  )
}

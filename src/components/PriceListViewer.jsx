import { useEffect, useRef, useState } from 'react'

export default function PriceListViewer({ pages, pdf }) {
  const [pageIndex, setPageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [loadedPage, setLoadedPage] = useState(null)
  const [failedPage, setFailedPage] = useState(null)
  const viewerRef = useRef(null)
  const viewportRef = useRef(null)
  const page = pages[pageIndex]

  useEffect(() => {
    viewerRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
  }, [])

  const changePage = (index) => {
    setPageIndex(index)
    setLoadedPage(null)
    setFailedPage(null)
    viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  return (
    <section className="price-list-viewer" id="price-list-viewer" ref={viewerRef} aria-label="Просмотр прайс-листа">
      <div className="price-list-viewer__toolbar">
        <div className="price-list-viewer__pagination">
          <button type="button" aria-label="Предыдущая страница прайса" disabled={pageIndex === 0} onClick={() => changePage(pageIndex - 1)}>←</button>
          <label>
            Страница{' '}
            <select aria-label="Страница прайса" value={pageIndex} onChange={(event) => changePage(Number(event.target.value))}>
              {pages.map((item, index) => <option key={item.src} value={index}>{index + 1}</option>)}
            </select>
            {' '}из {pages.length}
          </label>
          <button type="button" aria-label="Следующая страница прайса" disabled={pageIndex === pages.length - 1} onClick={() => changePage(pageIndex + 1)}>→</button>
        </div>
        <button type="button" aria-pressed={isZoomed} onClick={() => setIsZoomed(!isZoomed)}>
          {isZoomed ? 'По ширине' : 'Увеличить'}
        </button>
      </div>
      <p className="price-list-viewer__hint">
        {isZoomed ? 'Прокручивайте страницу в стороны и вниз, чтобы прочитать нужные строки.' : 'Увеличьте страницу, чтобы прочитать мелкий текст и цены.'}
      </p>
      <div className="price-list-viewer__viewport" ref={viewportRef} data-zoomed={isZoomed} tabIndex={0} role="region" aria-label={`Страница ${pageIndex + 1} прайс-листа`} aria-busy={loadedPage !== pageIndex && failedPage !== pageIndex}>
        {failedPage === pageIndex ? (
          <p role="alert">Не удалось загрузить страницу. <a href={pdf} target="_blank" rel="noopener noreferrer">Открыть PDF</a></p>
        ) : (
          <>
            {loadedPage !== pageIndex && <p className="price-list-viewer__loading" role="status">Загрузка страницы…</p>}
            <img key={page.src} src={page.src} width={page.width} height={page.height} alt={`Прайс-лист Арктик Дент от 10.06.2026, страница ${pageIndex + 1} из ${pages.length}`} decoding="async" onLoad={() => setLoadedPage(pageIndex)} onError={() => setFailedPage(pageIndex)} />
          </>
        )}
      </div>
    </section>
  )
}

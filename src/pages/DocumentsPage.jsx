import '../styles/DocumentsPage.css'

const clinicDocuments = [
  {
    title: 'Выписка из реестра лицензий',
    detail: 'На 06.08.2026',
    preview: 'license-extract-2026-08-06.pdf',
  },
  {
    title: 'Договор на оказание медицинских услуг',
    preview: 'medical-services-contract.pdf',
    original: 'medical-services-contract.docx',
    format: 'DOCX',
  },
  {
    title: 'Договор на оказание медицинских услуг с представителем',
    preview: 'medical-services-contract-representative.pdf',
    original: 'medical-services-contract-representative.rtf',
    format: 'RTF',
  },
  {
    title: 'Порядок рассмотрения обращений, жалоб и претензий',
    detail: 'От 10.06.2026',
    preview: 'complaints-procedure-2026-06-10.pdf',
  },
  {
    title: 'Положение о гарантийных сроках стоматологических услуг',
    detail: 'От 10.06.2026',
    preview: 'dental-warranty-2026-06-10.pdf',
  },
]

const companyDetails = [
  {
    label: 'Юридический адрес',
    value: '183038, Мурманская область, г. Мурманск, пр-д Флотский, дом 3, 103',
  },
  {
    label: 'Почтовый адрес',
    value: '183038, Мурманская область, г. Мурманск, пр-д Флотский, дом 3, 103',
  },
  {
    label: 'Телефон',
    value: <a href="tel:+78152216216">8 (8152) 216-216</a>,
  },
  {
    label: 'ИНН / КПП',
    value: '190016206 / 519001001',
  },
  {
    label: 'ОГРН',
    value: '1135190000791 от 25.01.2013',
  },
  {
    label: 'E-mail',
    value: <a href="mailto:sk.arcticdent@mail.ru">sk.arcticdent@mail.ru</a>,
  },
  {
    label: 'Режим работы клиники',
    value: 'с 09:00 до 20:00 ежедневно, воскресенье — выходной',
  },
]

export default function DocumentsPage() {
  return (
    <section className="documents-page" aria-labelledby="documents-page-title">
      <div className="documents-page__inner">
        <p className="documents-page__eyebrow">Документы и реквизиты</p>
        <h1 className="documents-page__title" id="documents-page-title">
          Информация об организации
        </h1>
        <p className="documents-page__subtitle">
          Общество с ограниченной ответственностью «Стоматологическая клиника „Арктик Дент“»
        </p>

        <div className="documents-page__panel">
          <div className="documents-page__company">
            <p className="documents-page__short-name">ООО «СК „АРКТИК ДЕНТ“»</p>
            <span className="documents-page__status">Действующая организация</span>
          </div>

          <dl className="documents-page__details">
            {companyDetails.map((detail) => (
              <div className="documents-page__detail" key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>

          <div className="documents-page__license" aria-label="Сведения о лицензии">
            <span className="documents-page__license-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M12 3.5 18.5 6v5.3c0 4.3-2.7 7.7-6.5 9.2-3.8-1.5-6.5-4.9-6.5-9.2V6L12 3.5Z" />
                <path d="m9.1 12.1 1.9 1.9 4-4.2" />
              </svg>
            </span>
            <div>
              <p>Лицензия на осуществление медицинской деятельности</p>
              <strong>Л041-01163-51/00359939</strong>
              <span>Лицензирующий орган: Министерство здравоохранения Мурманской области</span>
            </div>
          </div>
        </div>

        <section className="documents-page__files" aria-labelledby="clinic-documents-title">
          <h2 id="clinic-documents-title">Документы клиники</h2>
          <p className="documents-page__files-intro">
            Откройте документ для просмотра или скачайте его на устройство.
          </p>
          <ul className="documents-page__file-list">
            {clinicDocuments.map((document) => (
              <li className="documents-page__file" key={document.preview}>
                <span className="documents-page__file-icon" aria-hidden="true">PDF</span>
                <div className="documents-page__file-info">
                  <h3>{document.title}</h3>
                  <p>{document.detail ? `${document.detail} · PDF` : 'PDF для просмотра'}</p>
                </div>
                <div className="documents-page__file-actions">
                  <a
                    className="documents-page__file-view"
                    href={`/documents/${document.preview}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Просмотреть: ${document.title} (PDF, в новой вкладке)`}
                  >
                    Просмотреть
                  </a>
                  <a
                    className="documents-page__file-download"
                    href={`/documents/${document.original || document.preview}`}
                    download
                    aria-label={`Скачать: ${document.title} (${document.format || 'PDF'})`}
                  >
                    Скачать {document.format || 'PDF'}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}

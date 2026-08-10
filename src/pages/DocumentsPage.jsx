import '../styles/DocumentsPage.css'

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
      </div>
    </section>
  )
}

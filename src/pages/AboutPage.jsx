import ClinicGallery from '../components/ClinicGallery.jsx'
import '../styles/AboutPage.css'

const clinicImages = [
  {
    src: '/images/about/clinic-01.jpg',
    alt: 'Современные стоматологические материалы в кабинете клиники Арктик Дент',
    caption: 'Современные материалы',
  },
  {
    src: '/images/about/clinic-02.jpg',
    alt: 'Стоматологические инструменты на рабочем модуле врача',
    caption: 'Точная работа врача',
  },
  {
    src: '/images/about/clinic-03.jpg',
    alt: 'Диагностическое оборудование в стоматологическом кабинете',
    caption: 'Точная диагностика',
  },
  {
    src: '/images/about/clinic-04.jpg',
    alt: 'Учебная модель зубов и зубная щётка',
    caption: 'Понятная профилактика',
  },
  {
    src: '/images/about/clinic-05.jpg',
    alt: 'Оснащённый стоматологический кабинет Арктик Дент',
    caption: 'Комфортные кабинеты',
  },
  {
    src: '/images/about/clinic-06.jpg',
    alt: 'Аппарат для проведения анестезии в клинике',
    caption: 'Лечение во сне',
  },
  {
    src: '/images/about/clinic-07.jpg',
    alt: 'Набор стоматологических инструментов',
    caption: 'Микрохирургическая точность',
  },
  {
    src: '/images/about/clinic-08.jpg',
    alt: 'Монитор и наркозно-дыхательный аппарат',
    caption: 'Контроль состояния пациента',
  },
  {
    src: '/images/about/clinic-09.jpg',
    alt: 'Оборудование анестезиологического кабинета',
    caption: 'Безопасность на каждом этапе',
  },
  {
    src: '/images/about/clinic-10.jpg',
    alt: 'Стойка регистрации клиники Арктик Дент',
    caption: 'Добро пожаловать',
  },
  {
    src: '/images/about/clinic-11.jpg',
    alt: 'Стоматологическое лечение ребёнка в клинике',
    caption: 'Забота о детях',
  },
  {
    src: '/images/about/clinic-12.jpg',
    alt: 'Современный стоматологический кабинет',
    caption: 'Современное оснащение',
  },
  {
    src: '/images/about/clinic-13.jpg',
    alt: 'Врач обсуждает план лечения с пациенткой',
    caption: 'Понятный план лечения',
  },
  {
    src: '/images/about/clinic-14.jpg',
    alt: 'Врач держит диагностическую модель зубов',
    caption: 'Внимание к деталям',
  },
]

export default function AboutPage() {
  return (
    <article className="about-page" aria-labelledby="about-page-title">
      <section className="about-hero">
        <div className="about-hero__inner">
          <div className="about-hero__content">
            <p className="about-hero__eyebrow">О клинике</p>
            <h1 className="about-hero__title" id="about-page-title">
              Добро пожаловать в пространство стоматологии <span>«Арктик Дент»</span>
            </h1>
            <p className="about-hero__lead">
              Лечение зубов во сне и в седации для взрослых и детей. Зубосохраняющая микрохирургия.
            </p>

            <dl className="about-hero__facts">
              <div>
                <dt>10+ лет</dt>
                <dd>заботимся о пациентах</dd>
              </div>
              <div>
                <dt>Взрослым и детям</dt>
                <dd>спокойное лечение</dd>
              </div>
              <div>
                <dt>Сохраняем зубы</dt>
                <dd>когда это возможно</dd>
              </div>
            </dl>
          </div>

          <ClinicGallery images={clinicImages} />
        </div>
      </section>

      <section className="about-story" aria-labelledby="about-care-title">
        <div className="about-story__inner">
          <header className="about-story__heading">
            <p>Спокойствие и доверие</p>
            <h2 id="about-care-title">Лечение, в котором важны и результат, и ваши ощущения</h2>
          </header>

          <div className="about-story__columns">
            <div className="about-story__copy">
              <p>
                Мы понимаем, что посещение стоматолога часто связано с волнением, страхом и переживаниями.
                Поэтому в «Арктик Дент» мы создаём спокойную, безопасную и доверительную атмосферу, где лечение
                проходит максимально комфортно.
              </p>
              <p>
                Для взрослых и детей в клинике доступно{' '}
                <strong>лечение во сне под общей анестезией, а также лечение в седации</strong> — по медицинским
                показаниям и после необходимой подготовки. Такой подход позволяет пройти даже большой объём
                стоматологического лечения без лишнего стресса и эмоционального напряжения.
              </p>
            </div>

            <aside className="about-story__principle">
              <span aria-hidden="true">“</span>
              <p>
                Современная стоматология — это технологии, профессионализм и внимательное отношение к состоянию
                каждого пациента.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="about-focus" aria-labelledby="about-focus-title">
        <div className="about-focus__inner">
          <div className="about-focus__number" aria-hidden="true">01</div>
          <div className="about-focus__content">
            <p className="about-focus__eyebrow">Зубосохраняющая микрохирургия</p>
            <h2 id="about-focus-title">Сначала оцениваем возможность сохранить собственный зуб</h2>
            <p>
              Отдельное направление нашей работы — <strong>зубосохраняющая микрохирургия</strong>. В сложных
              клинических ситуациях мы стремимся прежде всего оценить возможность сохранить собственный зуб, его
              функцию и естественную эстетику.
            </p>
            <p>
              Для нас современная стоматология — это не только технологии и профессионализм, но и внимательное
              отношение к каждому пациенту, его состоянию, эмоциям и ощущению безопасности на каждом этапе лечения.
            </p>
          </div>
        </div>
      </section>

      <section className="about-mission" aria-labelledby="about-mission-title">
        <div className="about-mission__inner">
          <header className="about-mission__heading">
            <p>Наша миссия</p>
            <h2 id="about-mission-title">Предсказуемый результат и осознанный план лечения</h2>
          </header>

          <div className="about-mission__grid">
            <p>
              Наша миссия — обеспечивать пациентам высококачественное стоматологическое лечение, придерживаясь
              современных стандартов и протоколов, глубоко вникая в каждую клиническую ситуацию и стремясь к
              максимально предсказуемому и стабильному результату.
            </p>
            <p>
              Уже более 10 лет клиника «Арктик Дент» помогает взрослым и детям сохранять здоровье зубов, уверенность
              в себе и качество жизни. За это время нам доверили лечение тысячи пациентов, многие из которых приходят
              к нам семьями и рекомендуют нашу клинику своим близким.
            </p>
            <p>
              В нашей клинике работает сильная команда врачей с большим клиническим опытом. Специалисты постоянно
              развиваются, используют современные методы диагностики и лечения и находят оптимальные решения даже в
              сложных клинических ситуациях.
            </p>
          </div>
        </div>
      </section>

      <section className="about-conclusion" aria-label="Главный принцип Арктик Дент">
        <div className="about-conclusion__inner">
          <span className="about-conclusion__mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" focusable="false">
              <path d="M18 8c-7 2-10 10-8 19 2 10 7 25 13 29 4 3 5-12 9-12s5 15 9 12c6-4 11-19 13-29 2-9-1-17-8-19-5-2-9 2-14 2s-9-4-14-2Z" />
              <path d="m23 32 6 6 13-15" />
            </svg>
          </span>
          <p>
            Самое главное для нас —{' '}
            <strong>сохранить ваши собственные зубы, когда это возможно и клинически обоснованно</strong>, сделать
            лечение максимально спокойным и понятным и добиться стабильного результата.
          </p>
        </div>
      </section>
    </article>
  )
}

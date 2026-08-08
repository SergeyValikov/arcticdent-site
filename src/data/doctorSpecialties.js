const createDoctors = (slug, title, count, imageOrder) => {
  const orderedImages = imageOrder ?? Array.from({ length: count }, (_, index) => index + 1)

  return orderedImages.map((imageIndex) => {
    const number = String(imageIndex).padStart(2, '0')

    return {
      id: `${slug}-${number}`,
      name: 'Подробнее о специалисте',
      role: title,
      description: 'Подробная информация о враче скоро появится.',
      image: `/images/doctors/${slug}/doctor-${number}.jpg`,
    }
  })
}

export const doctorSpecialties = [
  {
    slug: 'leadership',
    title: 'Руководители направлений',
    doctors: createDoctors('leadership', 'Руководители направлений', 3, [3, 1, 2]),
  },
  {
    slug: 'therapists',
    title: 'Стоматологи-терапевты',
    doctors: createDoctors('therapists', 'Стоматологи-терапевты', 7),
  },
  {
    slug: 'surgeons',
    title: 'Стоматологи-хирурги',
    doctors: createDoctors('surgeons', 'Стоматологи-хирурги', 3),
  },
  {
    slug: 'implantologists',
    title: 'Стоматологи-имплантологи',
    doctors: createDoctors('implantologists', 'Стоматологи-имплантологи', 1),
  },
  {
    slug: 'orthodontists',
    title: 'Стоматологи-ортодонты',
    doctors: createDoctors('orthodontists', 'Стоматологи-ортодонты', 1),
  },
  {
    slug: 'orthopedists',
    title: 'Стоматологи-ортопеды',
    doctors: createDoctors('orthopedists', 'Стоматологи-ортопеды', 2),
  },
  {
    slug: 'periodontists',
    title: 'Стоматологи-пародонтологи',
    doctors: createDoctors('periodontists', 'Стоматологи-пародонтологи', 1),
  },
  {
    slug: 'anesthesiologists',
    title: 'Анестезиологи-реаниматологи',
    doctors: createDoctors('anesthesiologists', 'Анестезиологи-реаниматологи', 3),
  },
  {
    slug: 'pediatric-dentists',
    title: 'Детские стоматологи',
    doctors: createDoctors('pediatric-dentists', 'Детские стоматологи', 5),
  },
  {
    slug: 'hygienists',
    title: 'Стоматологи-гигиенисты',
    doctors: createDoctors('hygienists', 'Стоматологи-гигиенисты', 2),
  },
]

export const defaultDoctorSpecialty = doctorSpecialties[0]

export const getDoctorSpecialty = (slug) => (
  doctorSpecialties.find((specialty) => specialty.slug === slug) ?? defaultDoctorSpecialty
)

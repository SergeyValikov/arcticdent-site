import { doctorProfiles } from './doctorProfiles.js'

const createDoctors = (slug, title, imageFiles) => {
  return imageFiles.map(([filename, profileId], index) => {
    const number = String(index + 1).padStart(2, '0')

    return {
      id: `${slug}-${number}`,
      ...doctorProfiles[profileId],
      profileId,
      role: title,
      description: 'Подробная информация о враче скоро появится.',
      image: `/images/doctors/${slug}/${filename}`,
    }
  })
}

export const doctorSpecialties = [
  {
    slug: 'leadership',
    title: 'Руководители направлений',
    doctors: createDoctors('leadership', 'Руководители направлений', [
      ['doctor-01-c5cffeb5.png', 'chekanchi'],
      ['doctor-02-982a9f66.png', 'tarasova'],
      ['doctor-03-6f4efc59.jpg', 'lipatova'],
    ]),
  },
  {
    slug: 'therapists',
    title: 'Стоматологи-терапевты',
    doctors: createDoctors('therapists', 'Стоматологи-терапевты', [
      ['doctor-01-c5cffeb5.png', 'chekanchi'],
      ['doctor-02-bf71bd02.png', 'suslova'],
      ['doctor-03-6db36bb6.png', 'kambulova'],
      ['doctor-04-07109199.png', 'nurullina'],
      ['doctor-05-788792d8.png', 'veremeeva'],
      ['doctor-06-117fd944.png', 'zubovich'],
      ['doctor-07-f4ab455d.png', 'turamurodov'],
    ]),
  },
  {
    slug: 'surgeons',
    title: 'Стоматологи-хирурги',
    doctors: createDoctors('surgeons', 'Стоматологи-хирурги', [
      ['doctor-01-6418129f.jpg', 'omarov'],
      ['doctor-02-bf71bd02.png', 'suslova'],
      ['doctor-03-0081a27c.png', 'chechetova'],
      ['doctor-04-75fd869d.png', 'semenov'],
      ['doctor-05-1b1cd938.jpg', 'zinovyeva'],
    ]),
  },
  {
    slug: 'implantologists',
    title: 'Стоматологи-имплантологи',
    doctors: createDoctors('implantologists', 'Стоматологи-имплантологи', [
      ['doctor-01-6418129f.jpg', 'omarov'],
      ['doctor-02-0081a27c.png', 'chechetova'],
    ]),
  },
  {
    slug: 'orthodontists',
    title: 'Стоматологи-ортодонты',
    doctors: createDoctors('orthodontists', 'Стоматологи-ортодонты', [
      ['doctor-01-d488f83f.png', 'ostyukevich'],
    ]),
  },
  {
    slug: 'orthopedists',
    title: 'Стоматологи-ортопеды',
    doctors: createDoctors('orthopedists', 'Стоматологи-ортопеды', [
      ['doctor-01-a76d6e15.png', 'yunusov'],
      ['doctor-02-673017cd.png', 'sakhaltueva'],
      ['doctor-03-5fc0ad0c.png', 'veremeeva'],
    ]),
  },
  {
    slug: 'periodontists',
    title: 'Стоматологи-пародонтологи',
    doctors: createDoctors('periodontists', 'Стоматологи-пародонтологи', [
      ['doctor-01-0081a27c.png', 'chechetova'],
    ]),
  },
  {
    slug: 'anesthesiologists',
    title: 'Анестезиологи-реаниматологи',
    doctors: createDoctors('anesthesiologists', 'Анестезиологи-реаниматологи', [
      ['doctor-01-b08b1c13.png', 'golovko'],
      ['doctor-02-fbfa5fe6.png', 'hattunen'],
      ['doctor-03-1765cb7c.png', 'verkhovod'],
      ['doctor-04-82ec26b4.png', 'olshansky'],
      ['doctor-05-6f4efc59.jpg', 'lipatova'],
    ]),
  },
  {
    slug: 'pediatric-dentists',
    title: 'Детские стоматологи',
    doctors: createDoctors('pediatric-dentists', 'Детские стоматологи', [
      ['doctor-01-982a9f66.png', 'tarasova'],
      ['doctor-02-73fd9df8.png', 'kovaleva'],
      ['doctor-03-f62eb175.png', 'kostyuchenkova'],
    ]),
  },
  {
    slug: 'hygienists',
    title: 'Стоматологи-гигиенисты',
    doctors: createDoctors('hygienists', 'Стоматологи-гигиенисты', [
      ['doctor-01-c5cffeb5.png', 'chekanchi'],
      ['doctor-02-ea28b515.png', 'zhoglenko'],
    ]),
  },
]

export const defaultDoctorSpecialty = doctorSpecialties[0]

export const getDoctorSpecialty = (slug) => (
  doctorSpecialties.find((specialty) => specialty.slug === slug) ?? defaultDoctorSpecialty
)

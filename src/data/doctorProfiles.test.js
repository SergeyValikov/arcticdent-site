import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { doctorProfiles } from './doctorProfiles.js'
import { doctorSpecialties } from './doctorSpecialties.js'

const cards = doctorSpecialties.flatMap(({ doctors }) => doctors)

test('every portrait has a profile, with shared education across specialties', () => {
  const portraits = new Map()
  assert.equal(cards.length, 32)
  assert.equal(doctorSpecialties.length, 10)
  for (const card of cards) {
    const profile = doctorProfiles[card.profileId]
    assert.ok(profile, card.id)
    assert.equal(card.name, profile.name)
    assert.equal(card.education, profile.education)
    const bytes = readFileSync(new URL(`../../public${card.image}`, import.meta.url))
    const hash = createHash('sha256').update(bytes).digest('hex')
    if (portraits.has(hash)) assert.equal(card.profileId, portraits.get(hash))
    portraits.set(hash, card.profileId)
  }
  // These two different portraits are the same physician in separate specialties.
  const veremeeva = cards.filter(({ profileId }) => profileId === 'veremeeva')
  assert.equal(veremeeva.length, 2)
  assert.equal(veremeeva[0].education, veremeeva[1].education)
})

test('missing education stays absent and certificates are not listed as degrees', () => {
  const missing = Object.entries(doctorProfiles)
    .filter(([, profile]) => profile.education.length === 0)
    .map(([id]) => id).sort()
  assert.deepEqual(missing, ['chechetova', 'golovko', 'kambulova', 'semenov', 'yunusov'])
  assert.equal(Object.values(doctorProfiles).filter(({ education }) => education.length).length, 18)
  assert.equal(cards.filter(({ education }) => education.length).length, 25)
  for (const profile of Object.values(doctorProfiles)) {
    const titles = profile.education.map(({ title }) => title.toLocaleLowerCase('ru').replaceAll('ё', 'е'))
    assert.equal(new Set(titles).size, titles.length, profile.name)
    for (const item of profile.education) {
      assert.doesNotMatch(item.title, /сертификат|аккредитация|аттестация/iu)
      assert.match(item.year, /^(?:\d{4})?$/u)
      if (item.institution !== undefined) assert.ok(item.institution.trim())
    }
  }
})

test('distinct stages of education remain while renewed identical courses appear once', () => {
  const lipatova = doctorProfiles.lipatova.education
  assert.ok(lipatova.some(({ title }) => title === 'Интернатура — Анестезиология-реаниматология'))
  assert.equal(lipatova.filter(({ title }) => title === 'Повышение квалификации — Анестезиология-реаниматология').length, 1)
  const chekanchi = doctorProfiles.chekanchi.education
  assert.deepEqual(chekanchi.map(({ year }) => year), ['2021', '2024', '2024'])
  assert.equal(chekanchi[1].institution, undefined)
  assert.ok(doctorProfiles.zhoglenko.education.every(({ institution }) => institution === undefined))
})

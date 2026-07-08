import { createContext, useContext, useEffect, useState } from 'react'

export const LANGS = ['pl', 'ua', 'en']

const dict = {
  pl: {
    nav: { about: 'O nas', properties: 'Nieruchomości', services: 'Usługi', team: 'Zespół', career: 'Kariera', contact: 'Kontakt' },
    hero: {
      kicker: 'Agencja nieruchomości / Poznań',
      tagline: 'Klucz do Twojego nowego adresu.',
      sub: 'Wynajem, sprzedaż i kupno nieruchomości w Poznaniu. Prowadzimy cały proces od pierwszego oglądania do przekazania kluczy.',
      cta: 'Zobacz oferty',
      cta2: 'Skontaktuj się',
      scroll: 'przewiń w dół',
    },
    about: {
      title: 'O nas',
      lead: 'Avenue Estate to agencja nieruchomości działająca w Poznaniu.',
      body1: 'Od kilku lat pracujemy na poznańskim rynku i znamy go od podszewki. Pomagamy wynająć, sprzedać i kupić mieszkania, domy oraz lokale komercyjne.',
      body2: 'Współpracujemy również z zagranicznymi agencjami nieruchomości, więc obsługujemy klientów z Polski i z zagranicy w trzech językach.',
      points: ['Rynek poznański', 'Partnerzy zagraniczni', 'Obsługa w 3 językach', 'Pełne wsparcie transakcji'],
      est: 'od 2024 w nowej odsłonie',
    },
    properties: {
      title: 'Nieruchomości',
      lead: 'Aktualne oferty z naszego kanału. Baza odświeża się automatycznie.',
      all: 'Wszystkie oferty',
      rent: 'Wynajem',
      sale: 'Sprzedaż',
      rooms: 'pokoje',
      floor: 'piętro',
      groundFloor: 'parter',
      fee: 'czynsz adm.',
      deposit: 'kaucja',
      view: 'Zobacz ogłoszenie',
      empty: 'Wkrótce pojawią się tu nowe oferty. Zajrzyj na nasz Telegram.',
      more: 'Wszystkie oferty',
      updated: 'aktualizacja',
    },
    services: {
      title: 'Usługi',
      cta: 'Zostaw zgłoszenie',
      list: [
        {
          id: 'turnkey',
          no: '01',
          name: 'Wykończenie pod klucz',
          text: 'Mamy ekipę, która wykona remont od A do Z. Projekt wnętrza, materiały, prace wykończeniowe i odbiór. Ty podejmujesz decyzje, my pilnujemy całej reszty.',
          tags: ['remont', 'projekt wnętrza', 'nadzór'],
        },
        {
          id: 'brokerage',
          no: '02',
          name: 'Pośrednictwo',
          text: 'Przyjmujemy nieruchomość do oferty i wystawiamy ją na wszystkich liczących się platformach. Weryfikujemy najemców, prowadzimy oglądania i negocjacje, przygotowujemy umowy.',
          tags: ['przyjęcie oferty', 'platformy', 'umowy'],
        },
        {
          id: 'marketing',
          no: '03',
          name: 'Marketing nieruchomości',
          text: 'Przyjeżdżamy, robimy profesjonalne zdjęcia i przygotowujemy ogłoszenie, które się wyróżnia. Promujemy nieruchomość na portalach, w social mediach i w kampaniach targetowanych.',
          tags: ['sesja zdjęciowa', 'social media', 'kampanie'],
        },
      ],
    },
    team: {
      title: 'Zespół',
      lead: 'Ludzie, którzy otwierają drzwi.',
      soon: 'zdjęcie wkrótce',
      roles: ['Agentka nieruchomości', 'Agentka nieruchomości', 'Agent nieruchomości'],
    },
    career: {
      title: 'Kariera',
      lead: 'Chcesz zostać agentem nieruchomości?',
      body: 'Szukamy ludzi, którzy lubią pracę z klientem i chcą się rozwijać w nieruchomościach. Doświadczenie mile widziane, ale nie jest warunkiem. Nauczymy Cię wszystkiego.',
      cta: 'Zostaw zgłoszenie już teraz',
    },
    contact: {
      title: 'Kontakt',
      lead: 'Napisz, czego szukasz. Odezwiemy się tego samego dnia roboczego.',
      phone: 'Telefon',
      email: 'E-mail',
      hours: 'Godziny pracy',
      hoursValue: 'pn.-pt. 9:00-18:00, sob. 10:00-14:00',
      socials: 'Social media',
      form: {
        title: 'Zostaw zgłoszenie',
        name: 'Imię i nazwisko',
        phone: 'Numer telefonu',
        email: 'E-mail',
        interest: 'Co Cię interesuje?',
        interests: ['Wynajem nieruchomości', 'Sprzedaż nieruchomości', 'Kupno nieruchomości', 'Nieruchomość komercyjna', 'Kariera w Avenue Estate'],
        comment: 'Komentarz (opcjonalnie)',
        commentPh: 'Napisz, czego szukasz: dzielnica, metraż, budżet...',
        send: 'Wyślij zgłoszenie',
        sending: 'Wysyłanie...',
        ok: 'Dziękujemy! Zgłoszenie dotarło. Odezwiemy się wkrótce.',
        error: 'Coś poszło nie tak. Napisz do nas na Telegramie lub spróbuj ponownie.',
      },
    },
    footer: {
      city: 'Poznań, Polska',
      rights: 'Wszelkie prawa zastrzeżone.',
      credit: 'Projekt i realizacja strony:',
      madeFor: 'Nieruchomości poziom wyżej.',
    },
  },

  ua: {
    nav: { about: 'Про нас', properties: 'Нерухомість', services: 'Послуги', team: 'Команда', career: 'Карʼєра', contact: 'Контакти' },
    hero: {
      kicker: 'Агенція нерухомості / Познань',
      tagline: 'Ключ до вашої нової адреси.',
      sub: 'Оренда, продаж і купівля нерухомості в Познані. Ведемо весь процес: від першого перегляду до передачі ключів.',
      cta: 'Дивитися оферти',
      cta2: 'Звʼязатися',
      scroll: 'гортайте вниз',
    },
    about: {
      title: 'Про нас',
      lead: 'Avenue Estate. Агенція нерухомості, що працює в Познані.',
      body1: 'Уже кілька років ми працюємо на ринку Познані та знаємо його зсередини. Допомагаємо орендувати, продати й купити квартири, будинки та комерційні приміщення.',
      body2: 'Також співпрацюємо із закордонними агенціями нерухомості, тож обслуговуємо клієнтів з Польщі та з-за кордону трьома мовами.',
      points: ['Ринок Познані', 'Закордонні партнери', 'Обслуговування 3 мовами', 'Повний супровід угоди'],
      est: 'з 2024 у новому форматі',
    },
    properties: {
      title: 'Нерухомість',
      lead: 'Актуальні оферти з нашого каналу. База оновлюється автоматично.',
      all: 'Усі оферти',
      rent: 'Оренда',
      sale: 'Продаж',
      rooms: 'кімнати',
      floor: 'поверх',
      groundFloor: 'партер',
      fee: 'чинш',
      deposit: 'кауція',
      view: 'Дивитися оголошення',
      empty: 'Скоро тут зʼявляться нові оферти. Загляньте в наш Telegram.',
      more: 'Усі оферти',
      updated: 'оновлено',
    },
    services: {
      title: 'Послуги',
      cta: 'Залишити заявку',
      list: [
        {
          id: 'turnkey',
          no: '01',
          name: 'Виконання під ключ',
          text: 'Маємо екіпу, яка зробить ремонт від А до Я. Дизайн-проект, матеріали, оздоблювальні роботи та приймання. Ви ухвалюєте рішення, ми пильнуємо все інше.',
          tags: ['ремонт', 'дизайн-проект', 'нагляд'],
        },
        {
          id: 'brokerage',
          no: '02',
          name: 'Посередництво',
          text: 'Приймаємо нерухомість в оферту та виставляємо її на всіх помітних платформах. Перевіряємо орендарів, проводимо перегляди й переговори, готуємо договори.',
          tags: ['приймання оферти', 'платформи', 'договори'],
        },
        {
          id: 'marketing',
          no: '03',
          name: 'Маркетинг нерухомості',
          text: 'Приїжджаємо, робимо професійні фото та готуємо оголошення, яке вирізняється. Промоутимо нерухомість на порталах, у соцмережах і в таргетованих кампаніях.',
          tags: ['фотосесія', 'соцмережі', 'кампанії'],
        },
      ],
    },
    team: {
      title: 'Команда',
      lead: 'Люди, які відчиняють двері.',
      soon: 'фото скоро',
      roles: ['Агентка з нерухомості', 'Агентка з нерухомості', 'Агент з нерухомості'],
    },
    career: {
      title: 'Карʼєра',
      lead: 'Хочеш бути агентом нерухомості?',
      body: 'Шукаємо людей, які люблять роботу з клієнтами та хочуть розвиватися в нерухомості. Досвід вітається, але не обовʼязковий. Усього навчимо.',
      cta: 'Залишай заявку просто зараз',
    },
    contact: {
      title: 'Контакти',
      lead: 'Напишіть, що ви шукаєте. Відповімо того ж робочого дня.',
      phone: 'Телефон',
      email: 'Пошта',
      hours: 'Графік роботи',
      hoursValue: 'пн-пт 9:00-18:00, сб 10:00-14:00',
      socials: 'Соцмережі',
      form: {
        title: 'Залиш заявку',
        name: 'Імʼя та прізвище',
        phone: 'Номер телефону',
        email: 'Пошта',
        interest: 'Що вас цікавить?',
        interests: ['Оренда нерухомості', 'Продаж нерухомості', 'Купівля нерухомості', 'Комерційна нерухомість', 'Карʼєра в Avenue Estate'],
        comment: 'Коментар (необовʼязково)',
        commentPh: 'Напишіть, що шукаєте: район, метраж, бюджет...',
        send: 'Надіслати заявку',
        sending: 'Надсилаємо...',
        ok: 'Дякуємо! Заявка дійшла. Скоро звʼяжемося.',
        error: 'Щось пішло не так. Напишіть нам у Telegram або спробуйте ще раз.',
      },
    },
    footer: {
      city: 'Познань, Польща',
      rights: 'Усі права захищено.',
      credit: 'Дизайн і розробка сайту:',
      madeFor: 'Нерухомість на рівень вище.',
    },
  },

  en: {
    nav: { about: 'About', properties: 'Properties', services: 'Services', team: 'Team', career: 'Career', contact: 'Contact' },
    hero: {
      kicker: 'Real estate agency / Poznań',
      tagline: 'The key to your next address.',
      sub: 'Rent, sell and buy property in Poznań. We handle the whole process, from the first viewing to the handover of keys.',
      cta: 'Browse listings',
      cta2: 'Get in touch',
      scroll: 'scroll down',
    },
    about: {
      title: 'About us',
      lead: 'Avenue Estate is a real estate agency based in Poznań.',
      body1: 'We have been working on the Poznań market for several years and know it inside out. We help clients rent, sell and buy apartments, houses and commercial spaces.',
      body2: 'We also cooperate with real estate agencies abroad, so we serve clients from Poland and beyond in three languages.',
      points: ['Poznań market', 'International partners', 'Service in 3 languages', 'Full transaction support'],
      est: 'renewed since 2024',
    },
    properties: {
      title: 'Properties',
      lead: 'Live listings from our channel. The feed updates automatically.',
      all: 'All listings',
      rent: 'Rent',
      sale: 'Sale',
      rooms: 'rooms',
      floor: 'floor',
      groundFloor: 'ground floor',
      fee: 'admin fee',
      deposit: 'deposit',
      view: 'View listing',
      empty: 'New listings are coming soon. Check our Telegram in the meantime.',
      more: 'All listings',
      updated: 'updated',
    },
    services: {
      title: 'Services',
      cta: 'Leave a request',
      list: [
        {
          id: 'turnkey',
          no: '01',
          name: 'Turnkey finishing',
          text: 'Our crew takes the renovation from start to finish. Interior design, materials, finishing works and final inspection. You make the decisions, we take care of the rest.',
          tags: ['renovation', 'interior design', 'supervision'],
        },
        {
          id: 'brokerage',
          no: '02',
          name: 'Brokerage',
          text: 'We take your property into our portfolio and list it on every platform that matters. We vet tenants, run viewings and negotiations, and prepare the contracts.',
          tags: ['property intake', 'platforms', 'contracts'],
        },
        {
          id: 'marketing',
          no: '03',
          name: 'Property marketing',
          text: 'We come over, shoot professional photos and build a listing that stands out. Then we promote it across portals, social media and targeted campaigns.',
          tags: ['photo shoot', 'social media', 'campaigns'],
        },
      ],
    },
    team: {
      title: 'Team',
      lead: 'The people who open doors.',
      soon: 'photo coming soon',
      roles: ['Real estate agent', 'Real estate agent', 'Real estate agent'],
    },
    career: {
      title: 'Career',
      lead: 'Want to become a real estate agent?',
      body: 'We are looking for people who enjoy working with clients and want to grow in real estate. Experience helps but is not required. We will teach you everything.',
      cta: 'Apply right now',
    },
    contact: {
      title: 'Contact',
      lead: 'Tell us what you are looking for. We reply the same working day.',
      phone: 'Phone',
      email: 'E-mail',
      hours: 'Working hours',
      hoursValue: 'Mon-Fri 9:00-18:00, Sat 10:00-14:00',
      socials: 'Social media',
      form: {
        title: 'Leave a request',
        name: 'Full name',
        phone: 'Phone number',
        email: 'E-mail',
        interest: 'What are you interested in?',
        interests: ['Renting a property', 'Selling a property', 'Buying a property', 'Commercial property', 'Career at Avenue Estate'],
        comment: 'Comment (optional)',
        commentPh: 'Tell us what you need: district, size, budget...',
        send: 'Send request',
        sending: 'Sending...',
        ok: 'Thank you! Your request is in. We will get back to you shortly.',
        error: 'Something went wrong. Message us on Telegram or try again.',
      },
    },
    footer: {
      city: 'Poznań, Poland',
      rights: 'All rights reserved.',
      credit: 'Site design and development:',
      madeFor: 'Real estate, a level above.',
    },
  },
}

const LangContext = createContext(null)

function detectLang() {
  const saved = localStorage.getItem('ae-lang')
  if (saved && LANGS.includes(saved)) return saved
  const nav = (navigator.language || 'pl').toLowerCase()
  if (nav.startsWith('uk') || nav.startsWith('ru')) return 'ua'
  if (nav.startsWith('pl')) return 'pl'
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(detectLang)
  useEffect(() => {
    localStorage.setItem('ae-lang', lang)
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang
  }, [lang])
  return (
    <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

import en from './locales/en.json';
import sv from './locales/sv.json';

const locales = { en, sv };

let translations = en;
let currentLocale = 'en';

export function initI18n() {
    const lang = localStorage.getItem('lang') || navigator.language.split('-')[0];
    setLocale(locales[lang] ? lang : 'en');
}

export function setLocale(locale) {
    currentLocale = locale;
    translations = locales[locale];
    localStorage.setItem('lang', locale);
    document.documentElement.lang = locale;
    applyTranslations();
}

export function getCurrentLocale() {
    return currentLocale;
}

export function t(key) {
    return translations[key] ?? key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });
}

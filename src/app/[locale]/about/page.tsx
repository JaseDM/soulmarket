import {setRequestLocale, getTranslations} from 'next-intl/server';

type Props = {params: {locale: string}};

export default async function AboutPage({params: {locale}}: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('About');
  return (
    <main className="p-8 space-y-2">
      <h1 className="text-2xl font-semibold">{t('title')}</h1>
      <p className="text-gray-600 dark:text-gray-300">{t('intro')}</p>
    </main>
  );
}
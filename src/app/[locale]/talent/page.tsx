import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { TalentDirectory } from '@/components/talent/TalentDirectory';

export const metadata: Metadata = {
  title: '人才库 · ghfind',
  description: '从开源作品出发，发现值得认识的开发者。',
  robots: { index: false, follow: false },
};

export default async function TalentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TalentDirectory />;
}

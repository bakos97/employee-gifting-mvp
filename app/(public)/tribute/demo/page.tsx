import { Metadata } from 'next';
import { TributePage } from '@/app/components/tribute/TributePage';
import { demoTributeData } from '@/app/lib/demo-data';

export const metadata: Metadata = {
  title: 'Demo | Hyllest',
  description: 'Se hvordan en hyllestside ser ut — en demo med fiktive data.',
};

export default function DemoTributePage() {
  return <TributePage data={demoTributeData} />;
}

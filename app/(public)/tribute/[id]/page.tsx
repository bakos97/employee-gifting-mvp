import { getCelebration } from '@/app/lib/db/celebrations';
import { getResponses } from '@/app/lib/db/responses';
import { getQuestions } from '@/app/lib/db/questions';
import { TributePage } from '@/app/components/tribute/TributePage';
import { TributePageData } from '@/app/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const celebration = await getCelebration(params.id);

  if (!celebration) return { title: 'Tribute' };

  return {
    title: `${celebration.title} | TributePage`,
    description: `En tribute til ${celebration.employee.name} fra kollegaer`,
  };
}

export default async function TributeRoute(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const celebration = await getCelebration(params.id);

  if (!celebration || celebration.status !== 'published') return notFound();

  const [questions, responses] = await Promise.all([
    getQuestions(celebration.id),
    getResponses(celebration.id),
  ]);

  const contributors = [...new Set(responses.map(r => r.contributor_name))];

  const questionsWithResponses = questions
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(q => ({
      ...q,
      responses: responses.filter(r => r.question_id === q.id),
    }));

  const data: TributePageData = {
    celebration,
    employee: celebration.employee,
    questions: questionsWithResponses,
    contributors,
  };

  return <TributePage data={data} />;
}

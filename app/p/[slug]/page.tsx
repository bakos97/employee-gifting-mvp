import { getPageBySlug } from '@/app/lib/db';
import ClassicTemplate from '../templates/ClassicTemplate';
import { notFound } from 'next/navigation';

export default async function PublicPage({ params }: { params: { slug: string } }) {
    const page = await getPageBySlug(params.slug);

    if (!page) {
        notFound();
    }

    // Template Selector
    if (page.templateId === 'classic') {
        return <ClassicTemplate content={page.content} />;
    }

    // Default fallthrough
    return <ClassicTemplate content={page.content} />;
}

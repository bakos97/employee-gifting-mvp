import { getAppData } from '@/app/lib/db';
import { notFound } from 'next/navigation';
import { PenTool, MessageSquare, Send, Link as LinkIcon, Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';
import { CardSigningForm } from '@/app/components/CardSigningForm';
import { ShareButton } from '@/app/components/ShareButton';

export default async function CardPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const data = await getAppData();
    const card = data.cards.find(c => c.id === params.id);

    if (!card) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800 p-4 md:p-8 flex flex-col items-center">
            <div className="max-w-4xl w-full space-y-8">

                {/* Header Action */}
                <div className="text-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 drop-shadow-sm">
                            {card.title}
                        </h1>
                        <p className="text-gray-500 text-lg font-medium">Sign the card for <span className="text-gray-900 font-bold">{card.recipientName}</span></p>
                    </div>

                    <ShareButton />
                </div>

                {/* Card Visualization */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden perspective-1000 transform transition-all hover:scale-[1.01]">
                    {/* Card Cover Top (Visual only) */}
                    <div className="h-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                    <div className="p-8 md:p-12 bg-[#FDFDFD]">
                        {card.signatures.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {card.signatures.map((sig, idx) => (
                                    <div key={sig.id} className={cn(
                                        "p-6 rounded-2xl border backdrop-blur-sm relative shadow-sm hover:shadow-md transition-all hover:-translate-y-1 bg-white",
                                        "font-handwriting"
                                    )} style={{ transform: `rotate(${idx % 2 === 0 ? '-1deg' : '1deg'})` }}>
                                        <p className="text-xl italic mb-4 leading-relaxed text-gray-800" style={{ fontFamily: 'cursive' }}>"{sig.message}"</p>
                                        <p className="text-sm font-bold text-gray-500 text-right">- {sig.name}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <PenTool className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The card is empty!</h3>
                                <p className="text-gray-500">Be the first colleague to leave a message.</p>
                            </div>
                        )}
                    </div>
                    {/* Card Bottom (Visual only) */}
                    <div className="h-2 bg-gray-100 border-t border-gray-200" />
                </div>

                {/* Signing Form */}
                <div className="bg-white/80 backdrop-blur-xl border border-white p-6 md:p-8 rounded-3xl max-w-xl mx-auto w-full shadow-xl">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <PenTool className="w-5 h-5" />
                        </div>
                        Add your message
                    </h3>
                    <CardSigningForm cardId={card.id} />
                </div>

            </div>
        </div>
    );
}

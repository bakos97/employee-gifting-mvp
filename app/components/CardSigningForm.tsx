'use client';

import { signCard } from '../actions';
import { PenTool, Send } from 'lucide-react';
import { useFormStatus } from 'react-dom';

// We'll use a simple wrapper to handle the action.
// Since we want to keep it simple and avoid extensive 'useFormState' boilerplate types if not needed,
// we'll just use a client wrapper that calls the action.
// Actually, standard <form action={...}> works if the action returns void.
// But our action returns an object.
// We can wrap the action to return void or just not return anything relevant for the form prop.

export function CardSigningForm({ cardId }: { cardId: string }) {

    // We bind the ID here
    const actionWithId = async (formData: FormData) => {
        await signCard(cardId, formData);
    };

    return (
        <form action={actionWithId} className="space-y-5">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Your Name</label>
                <input required name="name" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400" placeholder="e.g. Jane from Accounting" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Message</label>
                <textarea required name="message" rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400" placeholder="Write something nice..." />
            </div>
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 transform hover:scale-[1.01] active:scale-[0.99]">
            <Send className="w-4 h-4" />
            {pending ? 'Signing...' : 'Sign Card'}
        </button>
    );
}

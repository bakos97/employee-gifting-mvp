'use client';

import { Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';

export function ShareButton() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-600 shadow-sm hover:shadow-md hover:text-blue-600 transition-all cursor-pointer"
        >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
            {copied ? 'Link Copied!' : 'Copy Link to Share'}
        </button>
    );
}

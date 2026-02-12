'use client';

import { Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
    url?: string;
}

export function ShareButton({ url }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const fullUrl = url
            ? `${window.location.origin}${url}`
            : window.location.href;
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium text-muted-foreground hover:text-amber-400 hover:border-amber-500/30 transition-all cursor-pointer flex-shrink-0"
        >
            {copied ? <Check className="w-4 h-4 text-amber-400" /> : <LinkIcon className="w-4 h-4" />}
            {copied ? 'Kopiert!' : 'Kopier'}
        </button>
    );
}

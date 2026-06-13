import { createInertiaApp } from '@inertiajs/react';
import SiteLayout from '@/components/site-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Medical Review Consultants';

createInertiaApp({
    title: (title) => (title ? `${title} — ${appName}` : appName),
    layout: () => SiteLayout,
    strictMode: true,
    progress: {
        color: '#2ec8b5',
    },
});

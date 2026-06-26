// design-sync shim for @inertiajs/react.
//
// The DS components (SiteHeader/SiteFooter/SiteLayout) import Inertia's
// Link/usePage/Head. claude.ai/design has no Inertia app context, so the real
// module would crash (usePage() destructure) or no-op oddly (Head). This shim
// is aliased in via .design-sync/tsconfig.ds.json `paths` and gives each a
// faithful STATIC equivalent for a design surface: Link → plain <a>, usePage →
// a fixed page object, Head → render nothing. Navigation/head-management aren't
// real in the design tool anyway, so this is the honest rendering.
import * as React from 'react';

type AnyProps = Record<string, unknown>;

// A stable fake page so usePage() destructures cleanly. url '/' makes the
// home nav item read as active in SiteHeader.
const PAGE = { component: 'home', url: '/', props: {}, version: '' };

export function usePage<T = typeof PAGE>(): T {
    return PAGE as unknown as T;
}

// Inertia-only props that must not leak onto the DOM <a>.
const INERTIA_LINK_PROPS = new Set([
    'method', 'as', 'data', 'headers', 'replace', 'preserveScroll',
    'preserveState', 'only', 'except', 'onCancelToken', 'onBefore', 'onStart',
    'onProgress', 'onFinish', 'onCancel', 'onSuccess', 'onError', 'prefetch',
    'cacheFor', 'async', 'queryStringArrayFormat', 'viewTransition',
]);

export const Link = React.forwardRef<HTMLAnchorElement, AnyProps>(
    function Link({ href, children, ...rest }, ref) {
        const domProps: AnyProps = {};
        for (const k of Object.keys(rest)) {
            if (!INERTIA_LINK_PROPS.has(k)) domProps[k] = rest[k];
        }
        return React.createElement(
            'a',
            { ref, href: typeof href === 'string' ? href : '#', ...domProps },
            children as React.ReactNode,
        );
    },
);

// Inertia's <Head> writes into document.<head>; in a static design preview
// there is nothing to manage, so render nothing.
export function Head(_props: AnyProps): null {
    return null;
}

export const router = {
    visit() {},
    get() {},
    post() {},
    reload() {},
};

const inertia = { Link, Head, usePage, router };
export default inertia;

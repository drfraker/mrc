<!DOCTYPE html>
@php
    $siteName = 'Medical Review Consultants';
    $siteUrl = rtrim((string) config('app.url', 'https://www.medreviewconsultants.com'), '/');
    $path = request()->path() === '/' ? '/' : '/' . request()->path();
    $meta = [
        '/' => [
            'title' => 'Medicare Compliance Consulting for Skilled Nursing Facilities',
            'description' => 'Medical Review Consultants helps SNFs, Critical Access Hospitals, and rural providers reduce Medicare compliance risk, protect reimbursement, and save staff time.',
            'image' => '/images/working.png',
        ],
        '/services' => [
            'title' => 'Medicare Utilization Review, Peer Review & RAC Appeals',
            'description' => 'Medicare Part A utilization review, physician peer review, RAC appeal assistance, and staff education for SNFs, Critical Access Hospitals, and rural providers.',
            'image' => '/images/svc-utilization.png',
        ],
        '/working-with-mrc' => [
            'title' => 'Medicare Review Support That Reduces Staff Burden',
            'description' => 'How MRC helps facilities save internal time, reduce Medicare compliance burden, and use predictable support for utilization review, education, and appeals.',
            'image' => '/images/working.png',
        ],
        '/resources' => [
            'title' => 'Medicare Compliance Resources for Skilled Nursing Facilities',
            'description' => 'Medicare and post-acute care resources for CMS regulations, SNF Consolidated Billing, code lookups, QIO appeals, and nursing facility education.',
            'image' => '/images/svc-education.png',
        ],
        '/contact' => [
            'title' => 'Contact Medicare Review Consultants in Bozeman, Montana',
            'description' => 'Contact MRC for Medicare utilization review, compliance consulting, physician peer review, RAC appeals, and staff education for rural healthcare facilities.',
            'image' => '/images/montana.png',
        ],
    ][$path] ?? [
        'title' => $siteName,
        'description' => 'Medical Review Consultants helps healthcare facilities reduce Medicare compliance risk, protect reimbursement, and save staff time.',
        'image' => '/images/working.png',
    ];
    $canonicalUrl = $siteUrl . $path;
    $imageUrl = $siteUrl . $meta['image'];
@endphp
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="{{ $meta['description'] }}">
        <meta name="robots" content="index, follow">
        <link rel="canonical" href="{{ $canonicalUrl }}">

        <meta property="og:type" content="website">
        <meta property="og:site_name" content="{{ $siteName }}">
        <meta property="og:title" content="{{ $meta['title'] }}">
        <meta property="og:description" content="{{ $meta['description'] }}">
        <meta property="og:url" content="{{ $canonicalUrl }}">
        <meta property="og:image" content="{{ $imageUrl }}">
        <meta property="og:locale" content="en_US">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $meta['title'] }}">
        <meta name="twitter:description" content="{{ $meta['description'] }}">
        <meta name="twitter:image" content="{{ $imageUrl }}">

        <style>
            html { background-color: #06101f; }
        </style>

        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="preload" href="/fonts/source-serif-4-latin.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ $meta['title'] }} — {{ $siteName }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>

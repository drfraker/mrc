<?php

namespace Tests\Feature;

use Tests\TestCase;

class SeoMetadataTest extends TestCase
{
    public function test_services_page_renders_search_metadata_in_initial_html()
    {
        config(['app.url' => 'https://www.medreviewconsultants.com']);

        $response = $this->get(route('services'));

        $response->assertOk();
        $response->assertSee(
            'Medicare Utilization Review, Peer Review &amp; RAC Appeals — Medical Review Consultants',
            false,
        );
        $response->assertSee(
            '<meta name="description" content="Medicare Part A utilization review, physician peer review, RAC appeal assistance, and staff education for SNFs, Critical Access Hospitals, and rural providers.">',
            false,
        );
        $response->assertSee(
            '<link rel="canonical" href="https://www.medreviewconsultants.com/services">',
            false,
        );
        $response->assertSee(
            '<meta property="og:title" content="Medicare Utilization Review, Peer Review &amp; RAC Appeals">',
            false,
        );
    }

    public function test_static_crawl_files_reference_the_public_sitemap()
    {
        $this->assertFileExists(public_path('sitemap.xml'));

        $robots = file_get_contents(public_path('robots.txt'));
        $sitemap = file_get_contents(public_path('sitemap.xml'));

        $this->assertStringContainsString(
            'Sitemap: https://www.medreviewconsultants.com/sitemap.xml',
            $robots,
        );
        $this->assertStringContainsString(
            '<loc>https://www.medreviewconsultants.com/services</loc>',
            $sitemap,
        );
    }
}

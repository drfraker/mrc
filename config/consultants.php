<?php

use App\Enums\TeamRole;

return [
    'team_name' => env('MRC_CONSULTANT_TEAM_NAME', 'Medical Review Consultants'),

    /*
    |--------------------------------------------------------------------------
    | Provisioned Consultants
    |--------------------------------------------------------------------------
    |
    | Consultants are provisioned by database seeders instead of public
    | registration. Set these environment variables per deployment, then use
    | password reset or the security settings page for password changes.
    |
    */
    'users' => [
        [
            'name' => env('MRC_CONSULTANT_NAME', 'MRC Consultant'),
            'email' => env('MRC_CONSULTANT_EMAIL', 'consultant@example.com'),
            'role' => TeamRole::Owner->value,
        ],
    ],

    'initial_password' => env('MRC_INITIAL_CONSULTANT_PASSWORD'),
];

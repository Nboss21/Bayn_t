<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\File;
use Tests\TestCase;

class PostgresCompatibleMigrationsTest extends TestCase
{
    public function test_migration_files_do_not_use_mysql_specific_after_column_placement(): void
    {
        $files = File::glob(database_path('migrations/*.php'));

        $this->assertNotEmpty($files, 'No migration files found.');

        foreach ($files as $file) {
            $content = File::get($file);

            $this->assertStringNotContainsString(
                '->after(',
                $content,
                'MySQL-specific column ordering was found in '.basename($file).'. PostgreSQL does not support ->after().'
            );
        }
    }
}

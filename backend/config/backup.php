<?php

return [
    'disk' => env('BACKUP_DISK', 'private_documents'),
    'directory' => env('BACKUP_DIRECTORY', 'backups'),
    'retention_days' => (int) env('BACKUP_RETENTION_DAYS', 30),
    'schedule' => env('BACKUP_SCHEDULE', 'daily'),
    'mysqldump_binary' => env('MYSQLDUMP_BINARY', 'mysqldump'),
    'mysql_binary' => env('MYSQL_BINARY', 'mysql'),
    'include_files' => env('BACKUP_INCLUDE_FILES', true),
];

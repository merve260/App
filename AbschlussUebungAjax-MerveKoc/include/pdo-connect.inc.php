<?php    
    define('DB_NAME', 'books');
    define('DB_HOST', 'localhost');
    define('DB_CHARSET', 'utf8');
    define('DB_USER', 'php_user');
    define('DB_PASSWORD', 'g5xA]SXITz@sPSO.');

    try {
        $pdo = new PDO('mysql:dbname=' . DB_NAME . ';host=' . DB_HOST . ';charset=' . DB_CHARSET . ';', DB_USER, DB_PASSWORD);
    } catch (PDOException $e) {
        die('ERROR:<br>' . $e->getMessage());
    }
?>
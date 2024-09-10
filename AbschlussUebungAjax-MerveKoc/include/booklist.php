<?php
require_once "pdo-connect.inc.php";

if (empty($_GET)) {
  header('Location: ../index.html');
}
if (empty($_GET['q'])) {
  echo null;
  exit;
} else {
  $strSearch = '%'.$_GET['q'].'%';
}

$arrOutput = array();

$sql = 'SELECT `id`, `isbn`, `title`, `author`, `publisher`, `image`  FROM `items` WHERE `title` LIKE :t';

try {
  if ($stmt = $pdo->prepare($sql)) {
    $stmt->bindParam( ':t', $strSearch);
    $stmt->execute();
    if( $stmt->rowCount() === 0 ) {
      $arrOutput = array(array('err' => '<p>Keine Datensätze gefunden.</p>'));
    } else {
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $arrOutput[] = $row;
        // array_push($arrOutput, $row);
      }
    }
  }
} catch (PDOException $e) {
  $arrOutput = array(
    array('err' => $e->getMessage())
  );
}

echo json_encode($arrOutput);
$stmt = NULL;
$pdo = NULL;
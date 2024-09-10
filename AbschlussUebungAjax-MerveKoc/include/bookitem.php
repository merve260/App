<?php
require_once "pdo-connect.inc.php";

if (empty($_GET)) {
  header('Location: ../index.html');
}
if (empty($_GET['q'])) {
  echo null;
  exit;
} else {
  $strSearch = (int)$_GET['q'];
}

$arrOutput = array();

$sql = 'SELECT *  FROM `items` WHERE `id` = :id';

try {
  if ($stmt = $pdo->prepare($sql)) {
    $stmt->bindParam( ':id', $strSearch);
    $stmt->execute();
    if( $stmt->rowCount() === 0 ) {
      $arrOutput = array(array('err' => '<p>Keine Datensätze gefunden.</p>'));
    } else {
      /* while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $arrOutput[] = $row;
        // array_push($arrOutput, $row);
      } */
     $arrOutput = $stmt->fetch(PDO::FETCH_ASSOC);
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
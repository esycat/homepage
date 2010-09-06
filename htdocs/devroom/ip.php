<?php
require_once 'SuperGlobals.php';

header('Content-Type: text/plain');

SuperGlobals::printServerVar(array(
	'REMOTE_ADDR',
	'REMOTE_HOST',
	'HTTP_VIA',
	'HTTP_X_FORWARDED_FOR'
	));

?>

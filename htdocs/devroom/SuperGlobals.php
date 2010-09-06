<?php

abstract class SuperGlobals {

	public static function printServerVar($vars) {
		foreach ((array) $vars as $name) {
			$name = strToUpper($name);
			if (isset($_SERVER[$name])) echo $name . ': ' . $_SERVER[$name] . "\n";
		}
	}

}

?>

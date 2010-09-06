<?php

class Solution4_Sniffs_PHP_ForbiddenFunctionsSniff 
    extends Generic_Sniffs_PHP_ForbiddenFunctionsSniff
    implements PHP_CodeSniffer_Sniff
{

    protected $forbiddenFunctions = array(
        // aliases
        'chop'          => 'rtrim',
        'dir'           => 'getdir',
        'diskfreespace' => 'disk_free_space',
        'doubleval'     => 'floatval',
        'fputs'         => 'fwrite',
        'ini_alter'     => 'ini_set',
        'is_double'     => 'is_float',
        'is_integer'    => 'is_int',
        'is_long'       => 'is_int',
        'is_real'       => 'is_float',
        'is_writeable'  => 'is_writable',
        'join'          => 'implode',
        'pos'           => 'current',
        'sizeof'        => 'count',
        'strchr'        => 'strstr',

        // deprecated functions
        'is_null'      => null,
        'floatval'     => null,
        'strval'       => null,
    );

}


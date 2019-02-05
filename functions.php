
<?php 

/**
 * My WP Starter theme
 */

/* 
	Code Ref: https://developer.wordpress.org/themes/advanced-topics/child-themes/#3-enqueue-stylesheet
*/
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
function my_theme_enqueue_styles() {
	
    $parent_style = 'parent-style'; 

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );
}

?>
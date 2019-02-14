<?php 

/**
 *
 */
require_once('scripts-and-styles.php');
require_once('MyTimberSite.php');


$timber = new \Timber\Timber();

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
	});

	add_filter('template_include', function( $template ) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}


/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;

$site = new MyTimberSite();


//add_action( 'enqueue_block_editor_assets', 'block_editor_enqueues');


function block_editor_enqueues() {
	//echo '<h1>'.get_stylesheet_directory_uri() . '/assets/js/block-customization.js</h1>';
	wp_enqueue_script('block-customization', get_stylesheet_directory_uri() . '/assets/js/block-customization.js', array('wp-blocks'));
}

// function add_to_context( $data ) {
//     $data['theme_images'] = get_stylesheet_directory_uri() . '/images/';
//     $data['url_slug'] = get_url_slug();
//     // $data['stuff'] = 'I am a value set in your functions.php file';
//     // $data['notes'] = 'These values are available everytime you call Timber::get_context();';
//     // $data['menu'] = new TimberMenu();
//     return $data;
// }
// add_filter( 'timber_context', 'add_to_context' );


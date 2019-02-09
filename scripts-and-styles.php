<?php


function site_scripts_and_styles() {

	if (!is_admin()) {

		/**
		  * jQuery
		**/

		wp_deregister_script('jquery');
		wp_enqueue_script('jquery', "//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", array(), false, true);

		/**
		  * modernizr
		**/

		// modernizr (without media query polyfill)
		//wp_enqueue_script( 'site-modernizr', get_stylesheet_directory_uri() . '/library/js/libs/modernizr.custom.min.js', array(), '2.5.3', false );



		/**
		  * Foundation
		**/
		wp_enqueue_style( 'foundation', get_stylesheet_directory_uri() . '/assets/foundation-custom.css', array(), 'v'.filemtime(get_stylesheet_directory() . '/assets/foundation-custom.css'), 'all' );

		/**
		  * Site.css
		**/

		$v = 'v'.filemtime(get_stylesheet_directory() . '/assets/site.css');
		wp_enqueue_style( 'site', get_stylesheet_directory_uri() . '/assets/site.css', array('foundation'),  $v);

		/**
		  * Styles.css
		**/
		//wp_enqueue_style( 'theme', get_stylesheet_directory_uri() . '/style.css', array('site'), filemtime(get_stylesheet_directory() . '/style.css'), 'all' );





		/**
		  *  ie-only style sheet
		**/
		wp_enqueue_style( 'ie-only', get_stylesheet_directory_uri() . '/assets/ie.css', array(), '' );



		if ( is_singular() AND comments_open() AND (get_option('thread_comments') == 1)) {
			wp_enqueue_script( 'comment-reply' );
		}



		//adding scripts file in the footer

		//wp_enqueue_script( 'site-js', get_stylesheet_directory_uri() . '/library/js/scripts.js', array( 'jquery' ), '', true );

		// enqueue styles and scripts

		//    wp_enqueue_script( 'site-modernizr' );

		//     wp_enqueue_style( 'foundation' );
		//     wp_enqueue_style( 'site' );

		// wp_enqueue_style( 'theme' );

		// 	wp_enqueue_style('ie-only');


		//wp_enqueue_script( 'jquery' );

		//wp_enqueue_script( 'site-js' );

	}

}

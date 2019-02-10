<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$cats = get_categories();


$recent_args = array(
	'paged' => $paged,
	'post_type' => 'post' 
);
$context['recent_posts'] = Timber::get_posts($recent_args);

$context['categories'] = $cats;


//print_r(get_categories());

$context['foo'] = 'bar';
$templates = array('home.twig', 'front-page.twig', 'index.twig' );

Timber::render( $templates, $context );

<?php

/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class MyTimberSite extends Timber\Site {
	/** Add timber support. */

	public function __construct() {

		// $this->url_slug = $this->get_url_slug();
		
		add_action( 'init', array($this, 'site_init'), 10 );
		//add_action('init', 'site_head_cleanup');
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		//add_action( 'init', array( $this, 'theme_init' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );

		add_action( 'template_redirect', array( $this, 'set_url_slug' ) );

		//add_filter('body_class', array($this, 'set_body_class'));

          add_action( 'wp_enqueue_scripts', 'site_scripts_and_styles' );
		parent::__construct();
	}

	public function site_init() {
		add_filter('the_content', array($this, 'filter_wp_gallery'), 5);
	}


	/** This is where you can register custom post types. */
	public function register_post_types() {

	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {

	}


	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		// $context['foo'] = 'bar';
		// $context['stuff'] = 'I am a value set in your functions.php file';
		// $context['notes'] = 'These values are available everytime you call Timber::get_context();';

		$context['menu'] = new Timber\Menu();
		$context['site'] = $this;
		$context['theme_images'] = get_stylesheet_directory_uri() . '/assets/images/';
		$context['url_slug'] = $this->url_slug;
		return $context;
	}

	public function set_url_slug() {
		global $post;
		$this->url_slug = '';
		if(is_page()) {
			$this->url_slug = 'page-'.$post->post_name;
		}
		else {
			$this->url_slug = 'unknown-slug';
		}

	}

	public function set_body_class($classes) {
		$classes[] = $this->url_slug;
		return $classes;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5', array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats', array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );

		add_theme_support('woocommerce');
	}


	

	/** This Would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig_Extension_StringLoader() );
		//$twig->addFilter( new Twig_SimpleFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		$twig->addFunction(new Timber\Twig_Function('get_excerpt', array($this, 'get_excerpt')));
		$twig->addFunction(new Timber\Twig_Function('get_category', array($this, 'get_category')));
		$twig->addFunction(new Timber\Twig_Function('get_tags', array($this, 'get_tags')));
		$twig->addFunction(new Timber\Twig_Function('get_cat_posts', array($this, 'get_cat_posts')));
		$twig->addFunction(new Timber\Twig_Function('get_category_links', array($this, 'get_category_links')));
		return $twig;
	}

	public function get_excerpt($post) {
		$c = apply_filters('the_excerpt', $post->post_content);
		$more = strpos($c, '<!--more');

		if($post->post_excerpt)
			return $post->post_excerpt;
		else if($more !== false) 
			return substr($c, 0, $more - 1);
		else {
			$m = preg_match('/([\S]+\s){20}/', $c, $matches);
			if($matches)
				return $matches[0];
			else
				return $c;
		}
		
	}

	public function get_category() {
		
	}

	public function get_tags() {

	}

	public function get_cat_posts($cat_id) {

		$posts = Timber::get_posts(array('category_name' => $cat_id));
		$twig_object = array(
			'total' => count($posts),
			'posts' => array_slice($posts, 0, 5)
		);
		//print_r($posts);
		return $twig_object;
	}

	public function get_category_links() {

		$cats = get_categories();
		Timber::render("partials/post-category-links.twig", array('categories'=> $cats ));
	}

	public function filter_wp_gallery($content) {

		$test = preg_match('/wp:gallery {"\w+":\[([\d+,]+)\]/', $content, $matches);
		if($test) { 
			$data = trim($matches[1]);
			$ids = explode(",", $data);
			$images = array();
			foreach($ids as $id) {
				array_push($images, new TimberImage($id));
			}
			ob_start();
			Timber::render('custom-wp-gallery.twig', array('images' => $images));
			$output = ob_get_contents();
			ob_end_clean();

			$content = preg_replace('/<\!-- wp:gallery.*\/wp:gallery.*-->/s', $output, $content);
			// echo '<!-- ';
			// print_r($parsed);
			// echo '-->';
		}
		return $content;
	}
	
     private function loadScripts() {
        
		//wp_enqueue_style( 'google-fonts', '//fonts.googleapis.com/css?family=Lato');



	} 


}
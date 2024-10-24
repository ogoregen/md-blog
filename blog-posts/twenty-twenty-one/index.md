---
title: "Improving Twenty twenty-one WordPress Theme"
date: "2021-02-28"
slug: "twenty-twenty-one"
description : "Twenty twenty-one is an amazing theme, but can be just a bit better."
---

Twenty twenty-one is an amazing theme, but can be just a bit better. For example, it can feel cramped at times with its narrow content area. If you think similarly, this simple guide can help. Alterations described can be simply applied on the theme editor and customization menus.

## Reducing -subjectively excessive- default bottom footer margin

```css
.site-footer{

	margin-top: 0px !important;
	padding-bottom: 0px !important;
}
```

## Reducing header top padding

```css
.site-header{

	padding-top: var(--global--spacing-vertical);
}
```

## Giving header-width to page and post content

If you are like me and think the default content width is *a bit* too narrow, you can give the same width as the header by replacing max-width property as done here.

```css
post-thumbnail,
.entry-content .wp-audio-shortcode,
.entry-content > *:not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.wp-block-separator):not(.woocommerce),
*[class*=inner-container] > *:not(.entry-content):not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.wp-block-separator):not(.woocommerce),
.default-max-width{

	/* max-width: var(--responsive--aligndefault-width); */
	max-width: var(--responsive--alignwide-width);
	/* ... */
}
```

## Removing post meta on post pages

We are only commenting out inside the footer block to keep the horizontal divider. Whole block can be deleted or commented out to get rid of the divider as well.

```php
<footer class="entry-footer default-max-width">
	<?php //twenty_twenty_one_entry_meta_footer(); ?>
</footer><!-- .entry-footer -->
```

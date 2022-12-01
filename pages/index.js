import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import get from 'lodash/get';
import parseHtml, { domToReact } from 'html-react-parser';

// Determines if URL is internal or external
function isUrlInternal(link){
	return !(!link ||
		link.indexOf(`https:`) === 0 ||
		link.indexOf(`#`) === 0 ||
		link.indexOf(`http`) === 0 ||
		link.indexOf(`://`) === 0);
}

// Replaces DOM nodes with React components
function replace(node){
	const attribs = node.attribs || {};
	const { style, ...props } = attribs;

	if(node.name === `a` && isUrlInternal(attribs.href)) {
		// Replace links with Next links
		if(props.class){
			props.className = props.class;
			delete props.class;
		}
		return (
			<Link href={attribs.href}>
				<a {...props} css={style ? style : null}>
					{!!node.children && !!node.children.length && domToReact(node.children, parseOptions)}
				</a>
			</Link>
		)
	}

	if(node.name === `script`){
		// Make Google Fonts scripts work
		let content = get(node, `children.0.data`, ``);
		if(content && content.trim().indexOf(`WebFont.load(`) === 0){
			content = `setTimeout(function(){${content}}, 1)`;
			return (
				<script {...attribs} dangerouslySetInnerHTML={{__html: content}}></script>
			)
		}
	}

	if(node.name === `form`) {
		// Make forms work, if action is not set
		if(props.class){
			props.className = props.class;
			delete props.class;
		}
		const formAction = attribs.action ? attribs.action : '/';
		return (
			<form {...props} action={formAction} css={style ? style : null}>
				{!!node.children && !!node.children.length && domToReact(node.children, parseOptions)}
			</form>
		);
	}

}
const parseOptions = { replace }

export default function Home(props) {
	return (
		<>
			<Head>
				{parseHtml(props.headContent, parseOptions)}
			</Head>
			{parseHtml(props.bodyContent, parseOptions)}
		</>
	)
}

export async function getStaticProps(ctx) {
	// Import modules in here that aren't needed in the component
	const cheerio = await import(`cheerio`);
	const axios = (await import(`axios`)).default;

	// Use path to determine Webflow path
	let url = get(ctx, `params.path`, []);
	url = url.join(`/`);
	url = url.charAt(0) !== `/` ? `/${url}` : url;
	const fetchUrl = process.env.WEBFLOW_URL + url;

	// Fetch HTML
	let res = await axios(fetchUrl).catch(err => console.error(err));
	const html = res.data;

	// Parse HTML with Cheerio
	const $ = cheerio.load(html);

	// Convert back to HTML strings
	const bodyContent = $(`body`).html();
	const headContent = $(`head`).html();

	// Send HTML to component via props
	return { props: { bodyContent, headContent }};
}

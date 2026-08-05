import { Icon } from '@iconify/css-react';
import { createElement } from 'react';
import './css/lpamcy.css';

const viewBox = {"width":48,"height":48};

interface Props {
	width?: string;
	height?: string;
};

function Component({width, height, ...props}: Props) {
	return createElement(Icon, {
		...props,
		width,
		height,
		viewBox,
		"content": `<path clip-rule="evenodd" class="lpamcy"/>`,
		"fallback": "icon-park-outline:drag",
	});
}

export default Component;

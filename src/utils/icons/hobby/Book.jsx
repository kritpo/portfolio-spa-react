import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

/* thanks to https://www.iconfinder.com/ for the SVG */

export default function Book(props) {
	return (
		<SvgIcon viewBox="0 0 128 128" {...props}>
			<path
				clipRule="evenodd"
				d="M116,16c-2.211,0-4-1.789-4-4s1.789-4,4-4s4-1.789,4-4    s-1.789-4-4-4H20C13.375,0,8,5.371,8,12v108c0,4.418,3.578,8,8,8h96c4.422,0,8-3.582,8-8V20C120,17.789,118.211,16,116,16z     M112,120H16V23.266C17.258,23.711,18.594,24,20,24h20v-8H20c-2.203,0-4-1.793-4-4s1.797-4,4-4h84.734    C104.289,9.258,104,10.59,104,12s0.289,2.742,0.734,4H56v8h56V120z"
				fill="#546E7A"
				fillRule="evenodd"
			/>
			<path
				d="M56,8v36.688l-8-8.002l-8,8.002V8H56 M64,0H32v64l16-16l16,16V0L64,0z"
				fill="#F44336"
			/>
		</SvgIcon>
	);
}

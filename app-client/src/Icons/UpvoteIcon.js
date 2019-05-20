import React from 'react';

const UpvoteIcon = ({ className }) => {
	return (
		<svg className={`upvote-icon ${className}`} version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
			<g transform="translate(0,-952.36218)">
				<path d="m 49.7812,980.36567 a 4.0004,4.0004 0 0 0 -3.25,1.9688 l -21,36.00003 A 4.0004,4.0004 0 0 0 29,1024.3657 l 42,0 a 4.0004,4.0004 0 0 0 3.4688,-6.0312 l -21,-36.00003 a 4.0004,4.0004 0 0 0 -3.6876,-1.9688 z m 0.2188,11.9375 14.0312,24.06253 -28.0624,0 L 50,992.30317 z" fill="#4f4e4d" fillOpacity="1" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"/>
			</g>
		</svg>
	);
}

export default UpvoteIcon;
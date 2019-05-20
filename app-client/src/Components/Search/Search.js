import React from 'react';
import './Search.scss';

import SearchIcon from '../../Icons/SearchIcon';

const Search = () => {
	return (
		<div className='search'>
			<SearchIcon className='search__icon'/>
			<input className='search__input' />
		</div>
	);
}

export default Search;
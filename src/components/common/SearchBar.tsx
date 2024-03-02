import React, { useState } from 'react';
import '../../css/searchBar.css'
import searchIcon from '../../assets/images/search.png';

interface SearchBarProps {
    placeholder: string,
    onChange: (keyword: string) => void;
    searchRestaurant: (keyword: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
    const [keyword, setKeyword] = useState<string>('');

    const handleChange = (e: any) => {
        const { value, name } = e.target;
        props.onChange(value);
    };

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') props.searchRestaurant(keyword)
    }

    const searchRestaurant = () => {
        props.searchRestaurant(keyword);
    }

    return (
        <>
            <input
                className='search_bar'
                type="text"
                placeholder={props.placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button className='btn_search' onClick={searchRestaurant}>
                <img src={searchIcon} alt='검색버튼'/>
            </button>
        </>
    )
}

export default SearchBar;
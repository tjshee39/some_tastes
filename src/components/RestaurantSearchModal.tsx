import React, { useState } from 'react';
import ReactDom from 'react-dom';
import '../css/modal.css';
import '../css/restaurantSearchModal.css';
import Card from './common/Card';
import SelectBox from './common/SelectBox';
import SearchBar from './common/SearchBar';
import Table from './common/Table';
import Button from './common/Button';
import sigunguList from '../assets/data/sigunguList.json';
import Axios from 'axios';

interface ModalInfo {
    onConfirm: () => void;
    handleRowOnClick: (data: RestaurantInfo) => void;
}

interface Sigungu {
    name: string;
    subArea: string[];
}

interface RestaurantInfo {
    title: string;
    roadAddress: string;
}

const RestaurantSearchModalOverlay = (props: ModalInfo) => {
    const areaList: string[] = sigunguList.reduce((list: string[], data: Sigungu) => {
        list.push(data.name)

        return list
    }, [])

    const [subAreaList, setSubAreaList] = useState<string[]>(sigunguList[0].subArea)

    const [selectedArea, setSelectedArea] = useState<string>('')
    const [selectedSubArea, setSelectedSubArea] = useState<string>('')

    const handleChangeArea = (value: string) => {
        setSelectedArea(value !== '전체' ? value : '')

        const subAreaList = sigunguList.find(area =>
            area.name === value
        ) ?.subArea || []

        setSubAreaList(subAreaList)
    }

    const handleChangeSubArea = (value: string) => {
        setSelectedSubArea(value !== '전체' ? value : '')
    }

    const [searchResultList, setSearchResultList] = useState<string[]>([])


    const header = [
        {
            accessor: 'title',
            Header: '식당명',
            Cell: (props: any) => <div className='header_title'>{props.value}</div>
        },
        {
            accessor: 'roadAddress',
            Header: '위치',
            Cell: (props: any) => <div className='header_road_address'>{props.value}</div>
        },
    ]


    const [keyword, setKeyword] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const setSearchKeyword = (searchKeyword: string) => {
        setKeyword(searchKeyword);
    }

    const handleChangePage = (page: number) => {
        setPage(page)
    }

    const handleRowOnClick = (data: RestaurantInfo) => {
        props.handleRowOnClick(data)
        props.onConfirm()
    }

    const replaceHtmlTag = (htmlString: string) => {
        const regex = /(<([^>]+)>)/gi;

        return htmlString.replace(regex, '')
    }

    const getSearchList = () => {
        Axios.get('/api/searchRestaurant', {
            params: {
                area: selectedArea,
                subArea: selectedSubArea,
                keyword: keyword,
                page: page
            }
        }).then((res) => {
            for (let i=0; i<res.data.length; i++) {
                res.data[i].title = replaceHtmlTag(res.data[i].title)
                res.data[i].roadAddress = replaceHtmlTag(res.data[i].roadAddress)
            }

            return res.data;
        })
        .then((data) => {
            setSearchResultList(data)
        });
    }

    return (
        <Card className="modal">
            <header className="modal-title">
                <p>식당 검색</p>
            </header>
            <div className="content">
                <div className="area_search_bar">
                    <SelectBox
                        selectList={areaList}
                        labelWidth='80px'
                        onChange={handleChangeArea}
                    />
                    <SelectBox
                        selectList={subAreaList}
                        labelWidth='80px'
                        onChange={handleChangeSubArea}
                    />
                    <SearchBar
                        onChange={setSearchKeyword}
                        searchRestaurant={getSearchList}
                        placeholder="식당명을 입력하세요."
                    />
                </div>

                <Table
                    columns={header}
                    data={searchResultList}
                    pageSize={2}
                    pageIndex={1}
                    totalCnt={searchResultList.length}
                    handlePageChange={handleChangePage}
                    handleRowOnClick={handleRowOnClick}
                />
            </div>
            <footer className="actions">
                <Button type="button" onClick={props.onConfirm}>
                    닫기
                </Button>
            </footer>
        </Card>
    )
}

const RestaurantSearchModal = (props: ModalInfo) => {
    const overlayRoot = document.getElementById('overlay-root') as HTMLElement;

    return (
        <>
            {ReactDom.createPortal(
                <RestaurantSearchModalOverlay
                    onConfirm={props.onConfirm}
                    handleRowOnClick={props.handleRowOnClick}
                />,
                overlayRoot,
            )}
        </>
    );
}

export default RestaurantSearchModal;
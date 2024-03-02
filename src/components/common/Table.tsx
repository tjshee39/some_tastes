import React, { useState } from 'react';
import { useTable } from 'react-table';
import Pagination from 'react-js-pagination';
import '../../css/table.css';
import '../../css/pagination.css';

interface Columns {
    Header: string;
    accessor: string;
}

interface TableData {
    columns: Columns[];
    data: any;
    pageSize: number;
    pageIndex: number;
    totalCnt: number;
    handlePageChange: (page :number) => void;
}

const Table = (props: TableData) => {
    const columns = props.columns;
    const data = props.data;
    const [page, setPage] = useState<number>(props.pageIndex);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });

    const handlePageChange = (page: number) => {
        setPage(page);
        props.handlePageChange(page);
    }

    return (
        <>
            <table className='table' {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.length === 0 && (
                    <tr>
                        <td colSpan={2} className='table_no_data'>
                            검색결과 없음
                        </td>
                    </tr>
                )}
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {/*<Pagination*/}
            {/*    activePage={page}*/}
            {/*    itemsCountPerPage={props.pageSize}*/}
            {/*    totalItemsCount={props.totalCnt}*/}
            {/*    pageRangeDisplayed={5}*/}
            {/*    prevPageText={"<"}*/}
            {/*    nextPageText={">"}*/}
            {/*    onChange={handlePageChange}*/}
            {/*/>*/}
        </>
    )
}

export default Table;
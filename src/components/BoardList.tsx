//import { render } from '@testing-library/react';
import React from 'react';
import { Component } from 'react';
import Table from 'react-bootstrap/Table';
import '../css/boardContent.css';

/**
 * boardList class
 */
class BoardList extends Component {
    /**
     * @return { Component } Component
     */
    render() {
        return (
            <Table className="content_table">
                <thead></thead>
                <tbody>
                    <tr>
                        <td>
                            <BoardContent />
                        </td>
                        <td>
                            <BoardContent />
                        </td>
                        <td>
                            <BoardContent />
                        </td>
                        <td>
                            <BoardContent />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <BoardContent />
                        </td>
                        <td>
                            <BoardContent />
                        </td>
                        <td>
                            <BoardContent />
                        </td>
                        <td>
                            <BoardContent />
                        </td>
                    </tr>
                </tbody>
                <tfoot></tfoot>
            </Table>
        );
    }
}

class BoardContent extends Component {
    /**
     * @return { Component } Component
     */
    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <td className="content_img">사진</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="restaurant">로우앤슬로우</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td className="content_review_rating">★ 4.7</td>
                    </tr>
                </tfoot>
            </Table>
        );
    }
}

export default BoardList;

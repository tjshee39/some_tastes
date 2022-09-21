//import { render } from '@testing-library/react';
import { Component } from 'react';
import '../css/boardContent.css';
import Table from 'react-bootstrap/Table';

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
                <tr>
                    <td className="content_img">사진</td>
                </tr>
                <tr>
                    <td>로우앤슬로우</td>
                </tr>
                <tr>
                    <td className="content_review_rating">★ 4.7</td>
                </tr>
            </Table>
        );
    }
}

export default BoardList;

import { Table, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setType } from '../store/store';
import axios from 'axios';
import { useEffect } from 'react'
import { boardPatternType } from '../store/storeType';
//만드는 방식
//우선 하나의 게시판 종류를 완성 후, 추가적으로 게시판 종류를 늘릴 예정
//1.게시판 테이블에서 게시판 유형 및 게시판 코드를 가져온다. axios (get)
//2.해당하는 게시판 코드로 해당하는 게시판의 게시글을 가져온다. axios (get)
//3.가져온 후 해당하는 게시판 유형에 맞게 글을 보여준다.
//-> 해당하는 유형에 맞는 포맷을 작성한다 1) 일반적인 글 게시판 2) 이미지 게시판 3) 피드형 게시판 등
//4.정렬관련해서는 차후에 설정하도록 한다.
//5.검색 시 게시판에 해당하는 유형 및 코드는 가지고 있으므로 바로 게시판 코드에 해당하는 게시글 안에서 검색을 시도하도록 한다.
function Board() {

    //게시판 유형 및 게시글리스트
    let boardType = useSelector((state: RootState) => { return state.boardPattern })
    let postList = useSelector((state: RootState) => { return state.postList })
    let dispatch = useDispatch()

    useEffect(()=>{
        axios.get('http://localhost:8080/board')
        .then((res) => {
            dispatch(setType({ id: 1, type: 'nomal', code: 'k12' }))
        })
    },[])


    if (boardType.type === 'nomal') {
        return (<NormalBoardList />
        );
    }else {
        return(<div></div>);
    }


}

function NormalBoardList() {

    return (<Table striped bordered hover variant="dark">
        <thead>
            <tr>
                <th>#</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>처음 글을 작성하였습니다.</td>
                <td>강도경</td>
                <td>2023-09-12</td>
            </tr>
        </tbody>
    </Table>);
}

export default Board
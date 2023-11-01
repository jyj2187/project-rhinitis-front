import { Table, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setPageInfo, setPattern, setPostList } from '../store/store';
import axios from 'axios';
import { useEffect } from 'react'
import { boardPatternType, pageInfoType, postListType } from '../store/storeType';
//만드는 방식
//우선 하나의 게시판 종류를 완성 후, 추가적으로 게시판 종류를 늘릴 예정
//1.게시판 테이블에서 게시판 유형 및 게시판 코드를 가져온다. axios (get)
//2.해당하는 게시판 코드로 해당하는 게시판의 게시글을 가져온다. axios (get)
//3.가져온 후 해당하는 게시판 유형에 맞게 글을 보여준다.
//-> 해당하는 유형에 맞는 포맷을 작성한다 1) 일반적인 글 게시판 2) 이미지 게시판 3) 피드형 게시판 등
//4.정렬관련해서는 차후에 설정하도록 한다.
//5.검색 시 게시판에 해당하는 유형 및 코드는 가지고 있으므로 바로 게시판 코드에 해당하는 게시글 안에서 검색을 시도하도록 한다.
let Board = () => {

    //게시판 유형 및 게시글리스트
    let boardPattern = useSelector((state: RootState) => { return state.boardPattern })
    let postList = useSelector((state: RootState) => { return state.postList })
    let pageInfo = useSelector((state: RootState) => { return state.pageInfo })
    let dispatch = useDispatch()
    // const infinity = useInfiniteQuery(
    //     ['infinity'],
    //     ({ pageParam=0})=>getPostList({pag})
    // )


    useEffect(()=>{

        axios.get('/api/post')
        .then((res) => {
            console.log(res.data)
            dispatch(setPostList(res.data))
        })


    },[])

    //한 번에 받아서 처리하도록 설정
    // useEffect(()=>{
    //     axios.get('http://rhinitis-alb-834058862.ap-northeast-2.elb.amazonaws.com/board')
    //     .then((res) => {
    //         dispatch(setPattern(res.data.boardPattern))
    //         dispatch(setPostList(res.data.postList))
    //         dispatch(setPageInfo(res.data.pageInfo))
    //     })
    // },[])

    //thumbnail은 없으면 none, 있으면 url을 받아오는 것으로

    //타입에 따라서 불러오는 response도 다르게 불러오는게 좋을 듯 하다.

    //페이징이면 postList를 받아온 response로 교체하여 진행
    //무한스크롤이면 기존 postList에 추가하면 자동적으로 게시글이 생성되도록 진행
    //페이징이면 페이지 컴포넌트 사용
    //무한스크롤 사용 시 마지막 observer를 사용햐는 태그를 지정



    if (boardPattern.type === 'list') {
        console.log("리스트 진입")
        return (<ListBoard  />
        );
    } else if (boardPattern.type === 'FIRSTGRID') {
        return (<FirstGridBoard postList={postList} pageInfo={pageInfo} />);
    } else if (boardPattern.type === 'SECONDGRID') {
        return (<SecondGridBoard />);
    } else {
        return (<></>)
    }


}

function ListBoard() {
    let postList = useSelector((state: RootState) => { return state.postList })
    console.log('진입')
    return (
        <><Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
            </thead>
            {/*tbody 안의 tr이 하나의 게시글*/}
            <tbody>
            {
                postList.map((a, i) => {
                    return (
                        
                            <tr>
                                <td>{i+1}</td>
                                <td>{a.title}</td>
                                <td>{a.content}</td>
                                <td>{a.date}</td>
                            </tr>
                        
                    )
                })
            }
            </tbody>
        </Table>
            {/*페이징or무한스크롤 들어갈 자리*/}
        </>
    );
}

function FirstGridBoard(props: { pageInfo: pageInfoType, postList: postListType[] }) {
    return (
        <>
            <Container>
                {/*하나의 Row가 게시글 하나 */}
                {props.postList.map((post, i) => {
                    return (
                        <Row>
                            <Col>{post.thumbnail}</Col>
                            <Col>{post.id}</Col>
                            <Col>{post.title}</Col>
                            <Col>{post.content}</Col>
                        </Row>
                    )
                })}


            </Container>
            {/*페이징or 무한 스크롤 들어갈 자리 */}
        </>
    )
}

function SecondGridBoard() {
    return (<>
        <Container>
            {/*하나의 Row가 게시글 하나 */}
            <Row>
                <Col>1 of 2</Col>
                <Col>2 of 2</Col>
            </Row>
            <Row>
                <Col>1 of 3</Col>
                <Col>2 of 3</Col>
            </Row>
        </Container>
        {/*페이징or 무한 스크롤 들어갈 자리 */}
    </>)
}

function getPostList() {
    // axios.get('http://rhinitis-alb-834058862.ap-northeast-2.elb.amazonaws.com/board')
    //     .then((res) => {
    //         dispatch(setPattern(res.data.boardPattern))
    //         dispatch(setPostList(res.data.postList))
    //         dispatch(setPageInfo(res.data.pageInfo))
    //     })
}

function Paging() {

}

function InfinityScroll() {

}


export default Board
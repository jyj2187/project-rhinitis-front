import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {postListType, boardPatternType,pageInfoType,getListType} from "./storeType";

//사용할 state 보관 장소 //만약 feature 별로 store을 나눌 시 변경해야함. (트리 구조 변경 시)
let dumpBoardPattern1 : boardPatternType = { id: 0, type: 'list', code: 'k1', paging: 'page' };
let dumpBoardPattern2 : boardPatternType = { id: 0, type: 'list', code: 'k1', paging: 'infinity' };
let dumpBoardPattern3 : boardPatternType = { id: 0, type: 'FIRSTGRID', code: 'k1', paging: 'page' };
let dumpBoardPattern4 : boardPatternType = { id: 0, type: 'FIRSTGRID', code: 'k1', paging: 'INFINITY' };
let dumpBoardPattern5 : boardPatternType = { id: 0, type: 'SECONDGRID', code: 'k1', paging: 'INFINITY' };
let boardPattern = createSlice({
    name: 'boardPattern',
    initialState: dumpBoardPattern1,
    reducers: {
        setPattern(state, action){
            state.type = action.payload
        }
    }
})

let dumpPostList : postListType[]  = [{id:1, thumbnail : 'http://~', title : 'title', content: 'content', date : '2023-09-12'},{id:0, thumbnail : 'http://~', title : 'title2', content: 'content2', date : '2023-09-12'},{id:0, thumbnail : 'http://~', title : 'title3', content: 'content3', date : '2023-09-12'},{id:0, thumbnail : 'http://~', title : 'title4', content: 'content4', date : '2023-09-12'},{id:0, thumbnail : 'http://~', title : 'title5', content: 'content5', date : '2023-09-12'}]
let postList = createSlice({
    name : 'postList',
    initialState : dumpPostList,
    reducers : {
        setPostList(state,action){

           
            // response Dto 와 타입을 맞출 경우 바로 return 할 수 있음
            let getPostList:postListType[] = [];
            action.payload.data.map((a:getListType,i:number)=>{
                let getPost:postListType = {id:0, thumbnail:'empty', title : '', content: '', date: ''}
                getPost.id=a.postId
                getPost.title = a.title
                getPost.content = a.content
                getPost.date = a.createdAt
                console.log(i)
                getPostList.push(getPost)
            })
            state = [...getPostList]

            return getPostList
        }
    }
})
let dumpPageInfo : pageInfoType = {page:1, size:5, totalElements:5, totalPages:20}
let pageInfo = createSlice({
    name : 'pageInfo',
    initialState : dumpPageInfo,
    reducers : {
        setPageInfo(state,action){
            state=action.payload
        }
    }
})

let store = configureStore({
    reducer:{
        boardPattern : boardPattern.reducer,
        postList : postList.reducer,
        pageInfo : pageInfo.reducer
    }
})

export let {setPageInfo} = pageInfo.actions
export let {setPattern} = boardPattern.actions
export let {setPostList} = postList.actions
export type RootState = ReturnType<typeof store.getState>



//Redux 초기 셋팅
export default store

import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {postListType, boardPatternType} from "./storeType";

//사용할 state 보관 장소 //만약 feature 별로 store을 나눌 시 변경해야함. (트리 구조 변경 시)
let dumpBoardPattern : boardPatternType = { id: 0, type: 'nomal', code: 'k1' };
let boardPattern = createSlice({
    name: 'boardPattern',
    initialState: { id: 0, type: 'nomal', code: 'k1' },
    reducers: {
        setType(state, action){
            state.type = action.payload
        }
    }
})

let dumpPostList : postListType[]  = [{id:0, title : 'title', content: 'content', date : '2023-09-12'}]
let postList = createSlice({
    name : 'postList',
    initialState : dumpPostList,
    reducers : {
        setPostList(state,action:PayloadAction<postListType[]>){
            state=action.payload
        }
    }
})

let store = configureStore({
    reducer:{
        boardPattern : boardPattern.reducer,
        postList : postList.reducer
    }
})

export let {setType} = boardPattern.actions
export let {setPostList} = postList.actions
export type RootState = ReturnType<typeof store.getState>



//Redux 초기 셋팅
export default store

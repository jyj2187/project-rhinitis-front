import { useInfiniteQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useIntersectionObserver } from "./observer";

fuction InfiniteScroll(/*요청하는 주소, 게시판 종류를 받아야함 */){
    
    function getPostList({pageParam = 0}) {
        const result = axios.get('http://rhinitis-alb-834058862.ap-northeast-2.elb.amazonaws.com/board',
        {params:{
            page : pageParam
        }})   
        return result
    }
    
    const {data, fetchNextPage, hasNextPage} = useInfiniteQuery(
        {queryKey : ['infinite'],
        queryFn : getPostList,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.data.length === 0 ? undefined : nextPage;
        },
        
    }
    )
    
    const {setTarget} = useIntersectionObserver ({
        hasNextPage, fetchNextPage
    })

    return /*하나의 div만 해야할 지 아니면 리스트를 계속 가지고 있어야 할 지
 */
}





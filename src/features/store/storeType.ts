type postListType = {id:number, thumbnail: String, title : String, content: String, date : String}
type boardPatternType = { id: number, type: String, code: String, paging : String}
type pageInfoType = {page:number, size:number, totalElements:number, totalPages:number}
type getListType = {postId:number,title:String,content:String,createdAt:String,modifiedAt:null|String,postStatus:String}
export  {postListType, boardPatternType,pageInfoType,getListType}
import http from './http'
function listreleaseApi(){
    return http.get('app/databank/listrelease')
}
function applistpagedatainforeleaseApi(databank_id,upload_pic,keywords,parmas){
    return http.get('app/datainfo/applistpagedatainforelease?databank_id='+databank_id+'&upload_pic='+upload_pic+'&keywords='+keywords,parmas)
}
function getreleaseApi(id){
    return http.get('app/datainfo/getrelease/'+id)
}
function linkManageApi(linkType){
    return http.get('app/release/link-manage/list?linkName='+'&linkType='+linkType)
}
export {
    listreleaseApi,
    applistpagedatainforeleaseApi,
    getreleaseApi,
    linkManageApi
}
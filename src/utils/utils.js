function htmlUnEscape(html){
    return html.replace(/&lt;|&gt;|&quot;|&amp;/g,(res)=>{
        switch (res){
            case '&lt;':
                return '<'
            case '&gt;':
                return '>'
            case '&quot;':
                return '"'
            case '&amp;':
                return '&'
        }
    })
}

function lineFeed(list,nums,idName){
    let dataList = []
    let tabData = []
    let num = 0
    let tabNum = 0
    for(let i in list){
        if(num === (nums-1)){
            tabData[num] = list[i]
            dataList[tabNum] = tabData
            num = 0
            tabData = []
            tabNum++
        }else {
            tabData[num] = list[i]
            num++
        }
        if(String(i) === String(list.length-1) && num !== 0){
            for(let n=tabData.length;n<nums;n++){
                tabData[n] = {[idName]:null}
            }
            dataList[tabNum] = tabData
            tabNum = 0
            num = 0
            tabData = []
        }
    }

    return dataList;
}


module.exports={
    htmlUnEscape,
    lineFeed,
}
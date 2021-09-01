import httpRequest from './request';

export default {
    // home页面请求后台数据
    getPage(currentPage) {
        return httpRequest.request({
            url: '/product/pagination', 
            method: 'get', 
            params: { page:currentPage, size: 10 }
        })
    }
    
}
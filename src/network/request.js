import axios from 'axios';
// 引入toast
import { Toast } from 'vant';
let loading = '';
// 获取用户唯一标识
let token = sessionStorage.getItem('token')
export default {

    request(obj) {
        const request = axios.create({
            timeout:5000,
            baseURL:'api/v4',
            // 设置请求头token
            headers: {'accessToken': token}
        })

        // 设置请求拦截 发送前可以查看发送的数据是否合理
        request.interceptors.request.use(config => {

            loading = Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner',
                duration : 0
            });
            return config
        })

        // 响应拦截，可以处理接收的数据
        request.interceptors.response.use(res => {
            Toast.clear()
            return res
        })

        return request(obj)
    }
}
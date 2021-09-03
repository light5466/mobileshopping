const filters = {
    // 过滤价格
    priceFilter(price){
        return `￥${parseInt(price).toFixed(2)}`
    }
}
export default filters

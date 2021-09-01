const filters = {
    // 过滤价格
    priceFilter(price){
        return `￥${price.toFixed(2)}`
    }
}
export default filters

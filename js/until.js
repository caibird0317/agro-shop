// 关闭产品介绍弹出层
mui("body").on("tap",".modal-box",function(){
	var proIntroModal = document.getElementById("proIntroModal");
	document.body.removeChild(proIntroModal);
	document.body.classList.remove("over-hide");
})
// 关闭
mui("body").on("tap",".mask-search-box",function(){
	this.classList.add("hide");
	document.getElementById("proCartBar").classList.remove("hide")
	document.getElementById("serchContainer").classList.add("hide");
})

mui("body").on("change",".mui-numbox-input",function(){
	var goodsId = this.getAttribute('data-goodsId');
	mui.toast("点击了  商品id:"+goodsId+"当前数量： "+this.value);
});
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

// 数字加
mui("body").on("tap",".mui-numbox-btn-plus",function(){
	var goodsId = this.getAttribute('data-goodsId');
	mui.toast("点击了加  商品id:"+goodsId);
});
// 数字减
mui("body").on("tap",".mui-numbox-btn-minus",function(){
	var goodsId = this.getAttribute('data-goodsId');
	mui.toast("点击了减  商品id:"+goodsId);
})
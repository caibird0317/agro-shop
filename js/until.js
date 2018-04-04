// 关闭产品介绍弹出层
mui("body").on("tap",".modal-box",function(){
	var proIntroModal = document.getElementById("proIntroModal");
	document.body.removeChild(proIntroModal);
})

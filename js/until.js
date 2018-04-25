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
	var totalChose = document.getElementById("totalChose");
	var tatalNumber = totalChose.innerText;
	var dataNUmber = Number(this.getAttribute("data-number"));
	var currentNumber = Number(this.value);
	if(currentNumber>dataNUmber){
		tatalNumber++
		totalChose.innerText = tatalNumber;
//		console.log("加");
	}else if(currentNumber<dataNUmber){
		tatalNumber--
		totalChose.innerText = tatalNumber;
//		console.log("减");
	}else{
		console.log("数据达到限制，没有变化")
	}
	this.setAttribute("data-number",currentNumber)
});
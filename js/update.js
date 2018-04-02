var serverUrl = "getLastedVersion";
var keyAbort = "updateAbort";//忽略版本键名
/**
 * checkUpdate 检测是否要更新
 */
function checkUpdate(auto) {
	// 在流应用模式下不需要检测升级操作
	if(navigator.userAgent.indexOf('StreamApp')>=0){
		return;
	}
	// 判断是否存在忽略版本号;
	if(auto == "auto"){
		if (localStorage.getItem(keyAbort)) {
		
			return;
		}		
	}
	//正式环境开这个
	getUpdateData(plus.os.name,auto);
}

/**
 * 获取服务端的数据
 */
function getUpdateData(phoneType,auto) {
	COM.biz.loader("show","版本检测中...");
	COM.post(serverUrl,{
		data:{
			machineType: phoneType
		},
		success: function(res){
			checkUpdateData(res,auto);
			setTimeout(function(){
				COM.biz.loader("hide");
			},200)
		}
	});
};

/**
 * 根据服务端穿回来的数据检测是否要升级checkUpdateData
 * @param {Object} 服务端获取的数据
 */
function checkUpdateData( data, auto){
	var curVer="";
	plus.runtime.getProperty(plus.runtime.appid,function(info){
        curVer=info.version;
        console.log("当前版本 : "+curVer+"    服务器版本："+data.version);
		if ( data ){
			var srvVer = data.version;
		
			// 判断是否需要升级
			if ( compareVersion(curVer,srvVer)) {
				// 提示用户是否升级
				plus.nativeUI.confirm( data.note, function(i){
					if ( 0==i.index ) {
						if(mui.os.ios) {
							plus.runtime.openURL( data.url );						
						}else {
							androidInstallApk(data.url);
						}
					} else if ( 1==i.index ) {
//						localStorage.setItem( keyAbort, srvVer );
					}
					
				}, data.title, ["立即更新"]);
			}else{
				if(auto != "auto"){					
//					mui.toast("已是当前最新版本")
				}
			}
		}
   });
   

}

/**
 * compareVersion版本比较
 * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
 * @param {String} ov
 * @param {String} nv
 * @return {Boolean} 
 */
function compareVersion( ov, nv ){
	if ( !ov || !nv || ov=="" || nv=="" ){
		return false;
	}
	var b=false,
	ova = ov.split(".",4),
	nva = nv.split(".",4);
	for ( var i=0; i<ova.length&&i<nva.length; i++ ) {
		var so=ova[i],no=parseInt(so),sn=nva[i],nn=parseInt(sn);
		if ( nn>no || sn.length>so.length  ) {
			return true;
		} else if ( nn<no ) {
			return false;
		}
	}
	if ( nva.length>ova.length && 0==nv.indexOf(ov) ) {
		return true;
	}
}

/**
 * androidInstallApk 安卓下载程序后自动安装
 * @param {Object} url
 */
function androidInstallApk (url) {
	var mask = mui.createMask();
	var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
        if (status == 200) {
        	console.log(d.filename)
            plus.runtime.install(d.filename); // 安装下载的apk文件
        } else {
            mui.toast("文件下载失败");
    	}
	});
	var bodyBar= mui('body');
	var downStation = plus.nativeUI.showWaiting("正在下载，请稍后");
	dtask.addEventListener("statechanged", function (download, status) {
		
        switch (download.state) {
            case 2:
				mask.show();//显示遮罩
				bodyBar.progressbar({
					progress: 0
				}).show();
                break;
            case 3:
                var percent = parseInt(download.downloadedSize / download.totalSize * 100);
				bodyBar.progressbar().setProgress(percent);
				// TODO 减轻手机压力,后续看有没有更好的方式解决。 
//				if (percent%10 == 0) {
//					downStation.setTitle("已下载："+percent + "%");
//				}
                break;
            case 4:
                bodyBar.progressbar().hide();
                downStation.close();
				mask.close();//关闭遮罩
                break;
        };
        
//		mui.back = function(event) {
//			mui.toast("正在下载APP，请稍后再操作.");
//		};
    });
    dtask.start();
}
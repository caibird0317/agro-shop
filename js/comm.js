/**
 * 目前拥有的模块及方法如下 ：
 * 	COM.Const（常量类，只有属性，没有方法）
 * 	COM.date
 * 		COM.date.format
 * 		COM.date.diffDate
 * 	COM.string
 * 		COM.string.createRepeatChar
 * 		COM.string.removeInsideSpace
 * 		COM.string.initial
 * 		COM.string.breakLineToArray
 * 		COM.string.createRepeatChar
 *  COM.number
 * 		COM.number.lessTenFixZero
 * 		COM.number.toFixed
 * 		COM.number.getInt
 * 		COM.number.getDecimals
 * 		COM.number.random
 * 	COM.data
 * 		COM.data.toDestLevel
 * 		COM.data.handleDate
 * 	COM.biz
 * 		COM.biz.encodeHtmlTag
 * 		COM.biz.createCountDown
 * 		COM.biz.priceFormat
 * 		COM.biz.mUppercase
 * 		COM.biz.setImmersed
 * 		COM.biz.appBack
 * 		COM.biz.print
 * 		COM.biz.closeWebView
 * 		COM.biz.loader
 * 		COM.biz.debouce
 * 		COM.biz.throttle
 * 	COM.validater
 * 		COM.validater.notNull
 * 		COM.validater.isPhone
 * 		COM.validater.isIdCard
 * 		COM.validater.isURL
 * 		COM.validater.isEmail
 * 		COM.validater.isPostal
 * 		COM.validater.isNumber
 * 		COM.validater.isSafePwd
 * 		COM.validater.isString
 * 		COM.validater.isArray
 * 		COM.validater.isObject
 * 		COM.validater.isFunction
 *  COM.post
 */
window.COM = window.COM || {};

// 常量集合
COM.Const = (function() {

	return {
		// API接口地址预留
		SERVER_SRC: "http://xfd.zzlsnet.cn/xfd/app/",
		// 图片服务器地址预留
		IMG_SERVER_SRC: "http://xfd.zzlsnet.cn",
		// websocket地址预留
		WEBSOCKET_SRC: "ws://xfd.zzlsnet.cn:9001",
		//是否显示调试日志
		IS_DEVELOP_ENVIRONMENT: true,
		DATE_NORMAL_FORMAT: "yyyy年MM月dd日 HH:mm:ss",
		NO_DATA_TIPS: "~暂无数据~",
		AJAX_ERROR_TIPS: "您的网络有些问题",
		LOADING_TIPS: "数据加载中...",
		DEFAULT_BUSY_TEXT: "服务器繁忙，请稍后重试！"
	}
})();
// 时间模块
COM.date = (function() {
	/**
	 * @method format 日期格式化
	 * @param {String=} type 日期显示的格式可自定义格式 默认为：yyyy-MM-dd HH:mm:ss
	 * yyyy表示年份 MM表示月份 M表示月份不足10不补0  dd表示日 HH表示小时  mm表示分钟  ss表示秒  
	 * @param {Date=} date 传入的时间格式为 new Date()
	 * @example 举些栗子
	 *  COM.date.format() ==》 “2017-05-26 15:44:20”  
	 *  COM.date.format("yyyy年MM月dd日 HH:mm:ss") ==》 “2017年05月26日 15：44：20” 
	 *  COM.date.format("HH:mm:ss yyyy-MM-dd") ==》 “15:44:20 2017-05-26 ”  
	 *  COM.date.format("",new Date("2016-11-12")) ==》 “2016-11-12日 00：00：00”  
	 */
	var format = function(type, date) {
		type = type || COM.Const.DATE_NORMAL_FORMAT;
		date = date ? new Date(date) : new Date();
		var fullYear = date.getFullYear();
		var Month = date.getMonth() + 1;
		var currentDate = date.getDate();
		var hours = date.getHours();
		var min = date.getMinutes();
		var second = date.getSeconds();
		var destDate = "";
		destDate = type.replace("yyyy", fullYear)
			.replace("MM", COM.number.lessTenFixZero(Month))
			.replace("M", Month)
			.replace("dd", COM.number.lessTenFixZero(currentDate))
			.replace("d", currentDate)
			.replace("HH", COM.number.lessTenFixZero(hours))
			.replace("H", hours)
			.replace("mm", COM.number.lessTenFixZero(min))
			.replace("m", min)
			.replace("ss", COM.number.lessTenFixZero(second))
			.replace("s", second);

		return destDate;
	};

	/**
	 * @description 距离现在多久
	 * @param {DateTime|Date} dateTime
	 *
	 */
	var diffDate = function(dateTime) {
		var dest = "刚刚";
		var dateArr = [
			31536000000, // "年前" 365*24*60*60*1000
			2592000000, // "月前"   30*24*60*60*1000 
			604800000, // "周前"    7*24*60*60*1000  
			86400000, // "天前"     24*60*60*1000  
			3600000, // "小时前"    60*60*1000       
			60000, // "分钟前"      60*1000
			1000, // "刚刚"        1000
		];
		var dateStringArr = [
			"年前",
			"月前",
			"周前",
			"天前",
			"小时前",
			"分钟前",
			"刚刚"
		];
		var currentDate = new Date().getTime();
		var difTimes = currentDate - dateTime;
		// 类型转换
		if(!COM.validater.isNumber(dateTime)) {
			dateTime = dateTime.getTime();
		}

		for(var i = 0; i < dateArr.length; i++) {
			if(i == (dateArr.length - 1)) {
				break;
			} else if(Math.floor(difTimes / dateArr[i]) >= 1) {
				dest = Math.floor(difTimes / dateArr[i]) + dateStringArr[i];
				break;
			}
		}

		return dest;
	}

	return {
		// 时间格式化
		format: format,
		// 距离现在多久
		diffDate: diffDate
	}
})();
//字符串模块
COM.string = (function() {
	/**
	 * @method createRepeatChar 生成指定长度的重复字符
	 * @param charFlag {string} 重复的字符
	 * @param length {string|number} 需要重复的字符串长度
	 * @return {string} 返回重复字符的字符串
	 *
	 * @example 举些栗子
	    COM.string.createRepeatChar("0", 6); 	// "000000"
		COM.string.createRepeatChar("a"); 	// ""  效果等同于 COM.string.createRepeatChar("a", 0);
		COM.string.createRepeatChar("abc", "3"); // "abcabcabc"
	 */
	var createRepeatChar = function(charFlag, length) {
		length = (Number(length) + 1) || 0;

		return new Array(length).join(charFlag);
	}
	/**
	 * @method removeInsideSpace 删除字符串内部的空格
	 * @param string {string} 需要处理的字符串
	 * @return {string} 删除内部的空格之后的字符串
	 *
	 * @example 举个栗子
	 * COM.string.removeInsideSpace("a, b, c "); // "a,b,c"
	 */
	var removeInsideSpace = function(string) {
		return String(string || "").replace(/\s+/g, "");
	}
	/**
	 * @method initial 将字符串的第一个字母转成大写
	 * @param string {string} 需要处理的字符串
	 * @return {string} 第一个字母转成大写 的字符串
	 *
	 * @example 举个栗子
	 * COM.string.initial("hello"); // "Hello"
	 */
	var initial = function(string) {
		string = String(string || "");

		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	/**
	 * @method breakLineToArray 根据换行符 将字符串 切割为数组（兼容Windows、Linux、Unix、Mac）
	 * @param string {string} 需要处理的字符串
	 * @return {Array<string>} 切割后 的字符串数组
	 *
	 * @example 举些栗子
	 * COM.string.breakLineToArray("Hello\r\nWorld!"); // ["Hello", "World!"]
	 * COM.string.breakLineToArray("Hello\nWorld!"); // ["Hello", "World!"]
	 * COM.string.breakLineToArray("Hello, World!"); // ["Hello, World!"]
	 */
	var breakLineToArray = function(string) {
		string = String(string || "");

		// Windows下的换行符为 \r\n ，而Linux、Unix、Mac下的换行符为 \n
		return string.split(/\r?\n/g);
	}
	return {
		//创建重复的字符串
		createRepeatChar: createRepeatChar,
		// 删除字符内部的空格
		removeInsideSpace: removeInsideSpace,
		// 将第一个字母转成大写
		initial: initial,
		// 将字符串中的换行符做标识切割成数组
		breakLineToArray: breakLineToArray
	}
})();
// 数字模块
COM.number = (function() {
	/**
	 * @method lessTenFixZero 不足十前面补字符, 该方法是针对数值不足1o的补位显示，如 传入9则显示 “09”
	 * @param {number=} number 传入的数值
	 * @param {String="0"} chart 传入的补位的标志，不传参数则默认为“0”
	 * @example 举些栗子
	 *  COM.number.lessTenFixZero(9) ==》 “09”  COM.number.lessTenFixZero(9，“X”) ==》 “X9”
	 *  COM.number.lessTenFixZero(19)  =》 “19”
	 */
	var lessTenFixZero = function(number, chart) {
		number = Number(number);
		chart = chart || "0";
		return number < 10 ? (chart + number) : number;
	};

	/**
	 * @method toFixed 数字小数部分展示几位, 该方法是针对数值小数部分显示几位来进行展示
	 * @param {number=} number 传入的数值
	 * @param {number=2} b 显示几位小数，不传值时默认显示2位小数
	 * @example 举些栗子
	 *  COM.number.toFixed(9) ==》 “9.00”  COM.number.toFixed(9，“1”) ==》 “9.0”
	 *  COM.number.toFixed(19.99)  =》 “19.99” COM.number.toFixed(19.9999)  =》 “20.00”
	 */
	var toFixed = function(number, b) {
		var destString = "";
		if(number == "-") {
			destString = "-"
		} else {
			destString = Number(number).toFixed(b || 2);
		}
		return destString;
	};

	/**
	 * @method getInt 取数字整数部分的值
	 * @param {number=} number 传入的数值
	 * @example 举些栗子
	 *  COM.number.getInt(9) ==》 “9”  
	 *  COM.number.getInt(19.99)  =》 “19”
	 */
	var getInt = function(number) {
		return parseInt(number);
	};

	/**
	 * @method getDecimals 取数字小数部分
	 * @param {number=number} number 传入的数值
	 * @param {Number=2} b 需要保留的位数,默认显示2为
	 * @example 举些栗子
	 *  COM.number.getDecimals(9) ==》 “.00”  
	 *  COM.number.getDecimals(19.99)  =》 “.99”
	 *  COM.number.getDecimals(19.99999999991,3)  =》 “.000” (注意：这里因为位数超出了设定值所以四舍五入了)
	 */
	var getDecimals = function(number, b) {
		b = b || 2;
		return this.toFixed(number, b).slice(-(b + 1));
	}

	/**
	 * @method取2个数中间的随机数
	 * @param {Number} min 较小数
	 * @param {Number} max 较大数
	 */
	var random = function(min, max) {
		var random = Math.floor(Math.random() * (max - min + 1) + min);
		return random;
	}

	return {
		// 不足十前面补0
		lessTenFixZero: lessTenFixZero,
		toFixed: toFixed,
		getInt: getInt,
		getDecimals: getDecimals,
		random: random
	}
})();
// 数据清洗模块
COM.data = (function() {
	// 单位转换
	var toDestLevel = function(number, options) {
		var option = $.extend({
			dw: 1000,
			b: 2,
			unitArr: ["KWh", "MWh", "GWh"]
		}, options);
		var destSrting = "";
		var b = option.b;
		var dw = Number(option.dw);
		if(!number || number == "-") {
			return "-" + option.orginunit;
		}
		var unitArr = option.unitArr;

		for(var i = unitArr.length; i > 0; i--) {
			var temp = number / Math.pow(dw, i - 1);
			if(temp > 10) {
				destSrting = COM.number.toFixed(temp, b) + unitArr[i - 1];
				break;
			}
		}
		if(number <= 10) {
			destSrting = COM.number.toFixed(number) + unitArr[0];
		}

		return destSrting;
	}
	// asp时间处理
	var handleDate = function(strTime,type){
		var type = type || "yyyy.MM.dd"
		var destTime = 0;
		if (!String(strTime).length || !strTime){
			
			return "";
		}
		if(String(strTime).indexOf("/Date(") != -1){
			// 格林威治时间+时区时间
			destTime = parseInt(strTime.replace("/Date(", "").replace(")/", ""), 10);
		}else{
			destTime = Number(strTime);
		}
		
		return COM.date.format(type,destTime);
	}
	return {
		toDestLevel: toDestLevel,
		handleDate: handleDate
	}
})();
COM.biz = (function() {
	/**
	 * @method encodeHtmlTag 将字符串中的html标签转义（目前只转义尖括号，即"<"和">"）
	 * @param content {string|Object} 参数支持字符串和对象。如果参数是字符串，则直接替换并返回；如果参数是对象，则返回一个 包含这个对象所有属性并且值已经被转义的对象。
	 * 							提示：对于Object类型的参数，目前仅支持一级属性的值转义，不支持多级嵌套属性转义
	 * @return {string|Object} 根据参数类型，返回 字符串或对象
	 * 
	 * @example 举些栗子
	 * // js调用
		// 参数为 普通字符串 的情况
		COM.biz.encodeHtmlTag("<div><span>hello</span></div>");  // "&lt;div&gt;&lt;span&gt;hello&lt;/span&gt;&lt;/div&gt;"
		// 参数为 对象类型 的情况
		COM.biz.encodeHtmlTag({scriptContent:"haha<script>1111;</script>xixi", otherHtml:"<div><span>hello</span></div>"});
		// Object {scriptContent: "haha&lt;script&gt;1111;&lt;/script&gt;xixi", otherHtml: "&lt;div&gt;&lt;span&gt;hello&lt;/span&gt;&lt;/div&gt;"}
	 */
	var encodeHtmlTag = function(content) {
		if(!content) {
			return content;
		}

		var replaceString = function(string) {
			return string.replace(/</mg, "&lt;").replace(/>/mg, "&gt;");
		};

		var encodeResult = null;
		if(typeof content == "string") {
			encodeResult = replaceString(content);
		} else {
			encodeResult = {};
			$.each(content, function(name, value) {
				// 转义字符串形式的值
				if(typeof value == "string") {
					encodeResult[name] = replaceString(value);
				}
				// 非字符串形式的值不处理。
				else {
					encodeResult[name] = value;
				}
			});
		}

		return encodeResult;
	};
	/**
	* @method createCountDown 实现了禁用倒计时的效果。支持一个及多个对象同时进行倒计时。
	* @param btn {string|HTMLElement|jQueryObject} 按钮或其它DOM元素（支持input、button、a、span等）
	* @param options {Object=} 配置项
	* @param options.time {number=60} 倒计时秒数
	* @param options.waitingText {string="{%t}秒后重新获取"} 倒计时过程中 按钮文本显示的内容。其中，{%t} 会被倒计时秒数替换
	* @param options.finalContent {string="点击再次发送"} 倒计时结束后 按钮文本显示的内容，如果该值为空字符串，则默认显示原始文本
	* @param options.disabledClassName {string="disabled"} 倒计时过程中，默认会给按钮添加 "disabled" 样式类，通过该值可以设置指定的禁用样式类
	* @param options.intervalSecond {number=1} 倒计时的时间间隔，默认为1秒
	* @param options.callback {function(options)=$.noop} 倒计时完成后的回调函数。回调中，参数是当前的设置项，this指向 包裹按钮DOM对象 的jQuery对象
	* 
	* @example 举个栗子
	* <!-- html 结构 -->
	   <input type="button" id="BtnId" value="确认">
	   <input type="button" id="BtnId1" value="确认aaa">
	   
	   // js调用
	   $("#BtnId").click(function () {
		   COM.biz.createCountDown("input", {
			   time: 10, 
			   waitingText: "{%t}", 
			   finalContent: "",
			   callback: timeCallback
		   });
	   });
	   // 回调函数
	   function timeCallback (options) {
		   console.log(this);  //指向传入的 input
		   console.log("我是回调函数" , options);
	   }
   */
	var createCountDown = function(btn, options) {
		var $btns = $(btn);
		var settings = $.extend({
			time: 60,
			waitingText: "{%t}秒后重新获取",
			finalContent: "点击再次发送",
			disabledClassName: "disabled",
			intervalSecond: 1,
			callback: $.noop
		}, options);
		var finalContent = settings.finalContent;
		var disabledClassName = settings.disabledClassName;
		var intervalSecond = settings.intervalSecond;
		var replaceTime = function(time) {
			return settings.waitingText.replace("{%t}", time);
		};

		$btns.each(function(i) {
			var $btn = $(this);
			// 根据 不同类型的DOM元素，采用不同的jQuery方法 读取/设置 文本
			var btnText = function(text) {
				var btnText = "";
				if($btn.prop("nodeName").toUpperCase() == "INPUT") {
					btnText = $btn.val(text).val();
				} else {
					btnText = $btn.html(text).html();
				}

				return btnText;
			};

			var time = settings.time;
			var btnValue = btnText();
			var init = function() {
				btnText(replaceTime(time));
				$btn.prop("disabled", true);
				$btn.addClass(disabledClassName);
			};
			var timeFlag = setInterval(function() {
				if(time > 1) {
					time--;
					init();
				} else {
					btnText(finalContent || btnValue);
					$btn.prop("disabled", false);
					$btn.removeClass(disabledClassName);
					clearInterval(timeFlag);
					settings.callback.call($btn, settings);
				}
			}, intervalSecond * 1000);

			//初始化
			init();
		});
	}

	/**
	 * @method priceFormat 价格格式化方法，为每3位数字 添加逗号分隔，支持带小数点的数值
	 * @param value {string|number} 需要转换的值（数字或数值型字符串）
	 * @return {string} 返回格式化后的字符串
	 * 
	 * @example 举些栗子
	 * COM.number.priceFormat(12345678);	// "135,185"
		COM.number.priceFormat("12345678");	// "135,185"
		COM.number.priceFormat(12345678.05);	// "12,345,678.05"
		COM.number.priceFormat("12345678.05");	// "12,345,678.05"
	 */
	var priceFormat = function(value) {
		var originString = String(parseInt(value));
		var destString = "";
		var originStringLength = originString.length;
		var i = 0;
		//业务逻辑处理
		while(i < originStringLength) {
			var text;
			if(i == 0) {
				//截取传入值整数部分的最后三个数
				text = originString.slice(-i - 3);
			} else {
				//截取传入值整数部分从后往前的三位数，并用“，”拼接起来
				text = originString.slice(-i - 3, -i) + ",";
			}
			destString = text + destString;
			i += 3;
		}
		//小数部分的拼接
		var valueString = String(value);
		var destPoint = "";
		if(valueString.indexOf(".") !== -1) {
			destPoint = "." + valueString.split(".")[1];
		}

		return destString + destPoint;
	}
	/**
	 * @description 金额转阿拉伯大写
	 * @param {Object} num
	 */
	var mUppercase = function(num) {

		num = String(Number(num));
		var dest = "";
		// 整数   
		var intData = num.split(".")[0] || "";
		// 小数
		var decimal = num.split(".")[1] || "";

		var fraction = ['角', '分', '厘'];
		var digit = [
			'零', '壹', '贰', '叁', '肆',
			'伍', '陆', '柒', '捌', '玖'
		];
		var unitMap = {
			0: "",
			1: "拾",
			2: "佰",
			3: "仟",
			4: "万",
			5: "拾",
			6: "佰",
			7: "仟",
			8: "亿",
			9: "拾",
			10: "佰",
			11: "仟"
		};
		var nLength = intData.length;

		if(nLength > 12) {

			return "超出统计的长度，我也很绝望"
		}
		for(var i = 0; i < nLength; i++) {
			dest += digit[intData.charAt(i)];
		}

		dest = dest.split('').reverse();

		for(var j = 0; j < dest.length; j++) {
			dest[j] = dest[j] + unitMap[j]
		}
		dest = dest.reverse().join("");
		dest = dest
			.replace(/零拾/g, "零")
			.replace(/零佰/g, "零")
			.replace(/零仟/g, "零")
			.replace(/零{4}万/g, "零")
			.replace(/零+万/g, "万")
			.replace(/零+亿/g, "亿")
			.replace(/零+/g, "零")
			.replace(/零+$/g, "");

		// 开始处理小数
		var tempDecimal = "";
		if(decimal.length) {

			for(var m = 0; m < decimal.length; m++) {
				tempDecimal += digit[decimal.charAt(m)];
			}
			tempDecimal = tempDecimal.split("")
			for(var k = 0; k < decimal.length; k++) {
				tempDecimal[k] = tempDecimal[k] + fraction[k];
			}
			tempDecimal = tempDecimal.join("")
				.replace(/零角/g, "")
				.replace(/零分/g, "")
				.replace(/零厘/g, "");
			dest += ("元" + tempDecimal);

		} else {
			dest += "元整";
		}

		return dest;
	}
	/**
	 * @description 设置沉浸式导航，此方法必须放在plusReady中。
	 * @param {String} header 标题id
	 * @param {String} content 内容ID
	 */
	var setImmersed = function(header, content) {
		var topoffset = 0;
		header = header || "header";
		content = content || "muiContent";
		var headerContainer = document.getElementById(header);
		var contentContainer = document.getElementById(content);
		if(plus.navigator.isImmersedStatusbar()) { //兼容immersed状态栏模式
			//获取状态栏高度并根据业务需求，这里重新计算了子窗口的偏移位置
			topoffset = (Math.round(plus.navigator.getStatusbarHeight()) + 45);

			if(headerContainer != null && contentContainer != null) {
				headerContainer.style.height = topoffset + 'px';
				headerContainer.style.paddingTop = (topoffset - 45) + 'px';
				contentContainer.style.paddingTop = topoffset + 'px';
			} else if(headerContainer == null && contentContainer != null) {
				contentContainer.style.paddingTop = (topoffset - 45) + 'px';
			} else {
				console.log("你可能忽略了body的 id值")
			}
		}
	}

	/**
	 * @description 返回键的重写，一秒内连续按2次返回退出app ，此方法必须放在plusReady中,并依赖mui.toast。
	 */
	var appBack = function() {
		var first = null;
		mui.back = function() {
			if(!first) { //首次按键，提示‘再按一次退出应用’
				first = (new Date()).getTime();
				mui.toast('再按一次退出应用');
				setTimeout(function() {
					first = null;
				}, 1000);
			} else {
				if((new Date()).getTime() - first < 1000) {
					plus.runtime.quit();
				}
			}
		};
	}

	/**
	 * @description 打印信息的统一控制;
	 * @param {Object} str
	 */
	var print = function(str) {
		// 是否是开发环境
		if(!COM.Const.IS_DEVELOP_ENVIRONMENT) {
			return;
		}
		var args = arguments,
			flag = true,
			dest = ""
		i = 1;
		if(COM.validater.isString(str)) {
			str = str.replace(/%s/g, function() {
				var arg = args[i++];
				if(typeof arg === 'undefined') {
					flag = false;
					return '';
				}
				return arg;
			});
		}
		dest = flag ? str : '参数错误';
		console.log(dest);
	};

	/**
	 * @description 关闭所有的webview除了当前的该方法必须放在 plusReady中
	 */
	var closeWebView = function (thisid) {
		var all = plus.webview.all();
		var current = plus.webview.currentWebview().id; 
		for(var i=0,len=all.length;i<len;i++){ 
		    if(all[i].id!=thisid && all[i].id!=current){ 
		        all[i].close(); 
		    } 
		}
	}
	var loader = function(status, tips) {
		var tips = tips || COM.Const.LOADING_TIPS;
		var loaderContainer = document.getElementById("loading");
		if(status=="show"){			
			if(!mui(loaderContainer).length) {
				var div = document.createElement('div');
				div.id = "loading";
				div.innerHTML = [
					'<div class="loader-animation">',
					'<div>',
					'<div>',
					'</div>',
					'</div>',
					'</div>',
					'<span>', tips, '</span>'
				].join("");
				document.body.appendChild(div);
			}
			try{				
				loaderContainer.style.display = "block";
			}catch(e){
			}
		}
		if(status == "hide") {
			try{				
				loaderContainer.style.display = "none";
			}catch(e){
			}
		}
	}
	
	/**
	 * @description 防抖函数  
	 * @param {Object} func  触发的函数
	 * @param {Number} delay  延迟执行的时间
	 * @param {Object} immediate 是否立即执行
	 */
	var debouce = function(func,delay,immediate){
	    var timer = null;
	    immediate = immediate || true; 
	    return function(){
	        var context = this;
	        var args = arguments;
	        if(timer) clearTimeout(time);
	        if(immediate){
	            //根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
	            var doNow = !timer;
	            //每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
	            timer = setTimeout(function(){
	                timer = null;
	            },delay);
	            //立即执行
	            if(doNow){
	                func.apply(context,args);
	            }
	        }else{
	            timer = setTimeout(function(){
	                func.apply(context,args);
	            },delay);
	        }
	    }()
	}

	
	/**
	 * @description 节流函数   在节流函数内部使用开始时间、当前时间与delay来计算remaining，当remaining<=0时表示该执行函数了，如果还没到时间的话就设定在remaining时间后再触发
	 * @param {Object} func 需要触发的方法
	 * @param {Object} delay  延迟的时间
	 */
	var throttle = function(func,delay){
	    var timer = null;
	    var startTime = Date.now();
	
	    return function(){
	        var curTime = Date.now();
	        var remaining = delay-(curTime-startTime);
	        var context = this;
	        var args = arguments;
	
	        clearTimeout(timer);
	        if(remaining<=0){
	            func.apply(context,args);
	            startTime = Date.now();
	        }else{
	            timer = setTimeout(func,remaining);
	        }
	    }()
	}
	
	var noDataHtml = function(text,options){
		var option = mui.extend({
			top: "0"
		},options);
		text = text || COM.Const.NO_DATA_TIPS;
		var top = (Number(option.top) + 20)+"px";
		return [
			'<div class="mui-text-center no-data-tips" style="padding-top:',top,'">',
				'<img src="../images/nodata.png" width="180">',
				'<div style="margin-top:30px;">',text,'</div>',
			'</div>'
		].join("")
	};
	var creatProIntro = function (options){
		var setting = mui.extend({
			"url":"",
			"title":"",
			"text":""
		},options);
		var div = document.createElement('div');
		div.className = "modal-box";
		div.id = "proIntroModal";
		div.innerHTML = [
			'<div class="modal-container">',
				'<div class="modal-img">',
				'<img src="',setting.url,'"/>',
			'</div>',
			'<div class="modal-title">',setting.title,'</div>',
			'<div class="modal-content">',
				setting.text,
			'</div>',
		'</div>'
		].join("");
		document.body.appendChild(div);
	}
	
	return {
		// html输入编码
		encodeHtmlTag: encodeHtmlTag,
		// 倒计时
		createCountDown: createCountDown,
		// 价格格式化
		priceFormat: priceFormat,
		// 金额转阿拉伯大写
		mUppercase: mUppercase,
		// 设置沉浸式导航
		setImmersed: setImmersed,
		// APP返回物理键监听
		appBack: appBack,
		// 打印信息统一控制
		print: print,
		//关闭所有的webview
		closeWebView:closeWebView,
		// 遮罩渲染
		loader: loader,
		// 函数防抖
		debouce:debouce,
		//函数节流
		throttle:throttle,
		// 没有数据
		noDataHtml:noDataHtml,
		// 创建产品介绍层的对象
		creatProIntro:creatProIntro
	}
})();

// 数据验证模块
COM.validater = (function() {
	/**
	 * @method validater 验证的辅助方法，如为空验证，URL，邮箱，身份证等验证
	 * 
	 */
	var notNull = function(data) {
		return Boolean(data);
	}
	// 验证是否为手机号
	var isPhone = function(data) {
		// 考虑有13 14 15 17 18字段的号码
		var reg = /^(13|14|15|17|18)[0-9]{9}$/;

		return reg.test(data);
	}
	// 身份证验证
	var isIdCard = function(data) {
		// 考虑有X字段的的身份证与无X字段的身份证
		var reg = /^\d{17}[\d|x]|\d{15}$/;

		return reg.test(data);
	}
	// URL验证
	var isURL = function(data) {
		// mms协议是 微软媒体服务器协议
		var reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/;

		return reg.test(data)
	}
	// 邮箱的判定
	var isEmail = function(data) {
		var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;

		return reg.test(data)
	}
	// 邮编验证
	var isPostal = function(data) {
		var reg = /^\d{6}$/;

		return reg.test(data);
	}
	// 是否是数字验证
	var isNumber = function(data) {
		var reg = /^\d+(\.\d+)?$/;

		return reg.test(data);
	}
	// 是否是中文
	var isChinese = function(data) {
		var reg = /^[\u4E00-\u9FA5]{1,}$/;

		return reg.test(data);
	}
	// 密码强度验证
	var isSafePwd = function(data) {
		//数字字母的22组合，长度 6 - 12位
		var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;

		return reg.test(data);
	}
	// 判断是否是字符串
	var isString = function(str) {

		return(typeof str == 'string') && str.constructor == String;
	}
	// 是否是数组
	var isArray = function(obj) {

		return(typeof obj == 'object') && obj.constructor == Array;
	}
	//是否是对象
	var isObject = function(obj) {

		return(typeof obj == 'object') && obj.constructor == Object;
	}
	//是否为空对象
	var isNullObject = function(obj) {
		for(var o in obj){
			return false
		}
		return true;
	}
	// 是否是函数
	var isFunction = function(obj) {

		return(typeof obj == 'function') && obj.constructor == Function;
	}

	return {
		notNull: notNull,
		isPhone: isPhone,
		isIdCard: isIdCard,
		isURL: isURL,
		isEmail: isEmail,
		isPostal: isPostal,
		isNumber: isNumber,
		isChinese:isChinese,
		isSafePwd: isSafePwd,
		isString: isString,
		isArray: isArray,
		isObject: isObject,
		isNullObject:isNullObject,
		isFunction: isFunction
	}
})()
// 异步请求的二次封装 依赖于md5库 和mui.min.js
COM.post = function(url, options) {
	var setting = mui.extend({
		loader:1,//0 hide 1 show
		data: {},
		success: function() {},
		error: function() {},
		timeout: 10
	}, options);
	if(setting.loader){		
		COM.biz.loader("show");
	}
	var headerData = {};
	headerData["token"] = localStorage.getItem("userId");
	headerData["Content-Type"] = "application/json";
	url = COM.Const.SERVER_SRC + url;

	COM.biz.print("请求的url: " + url);
	COM.biz.print("请求的参数: " + JSON.stringify(setting.data))
	mui.ajax(url, {
		headers: headerData,
		data: setting.data,
		dataType: 'json',
		type: 'post',
		timeout: setting.timeout * 1000,
		success: function(res) {
			COM.biz.print(action + " 异步请求已经成功发送，并接收到返回。" + JSON.stringify(res));
			if(res.code === 0) {
				setting.success(res.data,res)
				//考虑到页面初始化会连续发送几条异步请求，所以此处不隐藏动画，需要每条异步请求后手动关闭
				// COM.biz.loader("hide");
			} else {
				setting.error(res);
				mui.toast(res.message);
				COM.biz.loader("hide");
			}
		},
		error: function(xhr, type, error) {
			COM.biz.print(xhr.status);
			var statusMap = {
				"0": COM.Const.AJAX_ERROR_TIPS, //"无法访问，请先查看网络是否连接",
				"403": COM.Const.AJAX_ERROR_TIPS, //"没有相关权限，请重新登录",
				"404": COM.Const.AJAX_ERROR_TIPS //"接口不存在"
			};
			mui.toast(statusMap[xhr.status]);
			COM.biz.loader("hide");
			setting.error(error);
		}
	});
};
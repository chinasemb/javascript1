(function(){
	
	//自适应宽高
	var section = document.querySelector('#section');
	var head = document.querySelector('#head');
	function resize(){
		var clientH = document.documentElement.clientHeight;
		section.style.height = clientH - head.offsetHeight+'px';
	}
	window.onresize = resize;
	resize();
	//-----------------------------渲染各个区域--------------------------------------
	
	let d = data.files;  // 数组

	// 1. 菜单区域

	let treeMenu = document.querySelector('.tree-menu');

		// 拿数据生成菜单区域
		// 拿到一个id之后，找这个id的子级



	function createTreeHtml(id){
		// 找到指定id的所有的子级
		let arr = []
		for( var i = 0; i < d.length; i++ ){
			if(d[i].pid === id){
				arr.push(d[i])
			}
		}

		let treeHtml = '<ul>'
		arr.forEach(function (item){

			treeHtml += `<li>
					<div class="tree-title tree-ico close">
						<span><i></i>${item.title}</span>
					</div>
				</li>`	
		})

		treeHtml += '</ul>';

		return treeHtml;

	}

	

	treeMenu.innerHTML = createTreeHtml(-1);



	// 2. 导航区

	// 3. 文件区域

})();




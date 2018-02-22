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

	// -------------------------封装操作数据的方法---------------------

	// 通过指定的id，找到这个id下所有的子级
	function getChildsById(d,id){
		let arr = []
		for( var i = 0; i < d.length; i++ ){
			if(d[i].pid === id){
				arr.push(d[i])
			}
		}	
		return arr;
	}

	//-----------------------------渲染各个区域--------------------------------------
	
	let d = data.files;  // 数组

	// 1. 菜单区域

	let treeMenu = document.querySelector('.tree-menu');

		// 拿数据生成菜单区域
		// 拿到一个id之后，找这个id的子级

	let leavl = -1; //默认是没有级

	// 函数作用就是指定一个id，获取id下面的所有的子级，然后根据自己生成html结构
	function createTreeHtml(id,leavl){
		// 找到指定id的所有的子级

		let arr = getChildsById(d,id)
		

		leavl++

		// 判断一下有没有下一级
		let treeHtml = '';
		if(arr.length){
			treeHtml = '<ul>'
			arr.forEach(function (item){
				// 如果没有下一级，这个函数返回值空字符串
				let nextHtml = createTreeHtml(item.id,leavl)
				let cls = nextHtml !== '' ? 'tree-ico' : '';
				treeHtml += `<li>
						<div style="padding-left: ${leavl*30}px" 
							class="tree-title ${cls}">
							<span><i></i>${item.title}</span>
						</div>
						${nextHtml}
					</li>`	
			})

			treeHtml += '</ul>';
		}


		return treeHtml;

	}

	

	treeMenu.innerHTML = createTreeHtml(-1,leavl);



	// 2. 导航区



	// 3. 文件区域

	let folders = document.querySelector('.folders')

	// 给定一个id，找到这个id下所有的子级，然后渲染文件区域

	let fileInitId = 0; // 文件区区域初始渲染的id

	function createFileHtml(id){
		let childs = getChildsById(d,id);
		let filesHtml = '';
		if(childs.length){
			childs.forEach(function (item){
				filesHtml += `<div class="file-item">
								<img src="img/folder-b.png" alt="" />
								<span class="folder-name">${item.title}</span>
								<input type="text" class="editor"/>
								<i class=""></i>
							</div> `	
			})
		}
		return filesHtml

	}

	folders.innerHTML = createFileHtml(0);


})();




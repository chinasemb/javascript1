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
	function getSelfById(d,id){
		for( var i = 0; i < d.length; i++ ){
			if(d[i].id === id){
				return d[i]
			}
		}

		return null
	}
	// 给定一个id，找到这个id的所有的父级
	function getParentsById(d,id){
		let self = getSelfById(d,id)
		let arr = [];

		arr.push(self)

		for( var i = 0; i < d.length; i++ ){
			if(d[i].id === self.pid){
				arr = arr.concat(getParentsById(d,d[i].id))
				break;
			}
		}

		return arr;
	}

	//-----------------------------渲染各个区域--------------------------------------
	
	let d = data.files;  // 数组

	// 1. 菜单区域

	let treeMenu = document.querySelector('.tree-menu');

	let leavl = -1; 

	function createTreeHtml(id,leavl){
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
						<div data-id="${item.id}" style="padding-left: ${leavl*30}px" 
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
	let breadNav = document.querySelector('.bread-nav')
	

	function createNavHtml(id){
		let parents = getParentsById(d,id).reverse(); // 指定id所有的父级
		
		let navHtml = '';
		for( var i = 0; i < parents.length-1; i++ ){
			navHtml += `<a href="javascript">${parents[i].title}</a>`
		}

		navHtml += `<span>${parents[parents.length-1].title}</span>`;

		return navHtml	
	}

	breadNav.innerHTML = createNavHtml(0);

	// 3. 文件区域

	let folders = document.querySelector('.folders')

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

	// ------------------三个区域的交互-----------------------

	// 用来给菜单区域指定的id添加class的

	// 可以利用querySelector(div[data-id="id"])
	function addClassPositionById(id){
		let hasActiveElement = treeMenu.querySelector('.active');
		if(hasActiveElement){
			hasActiveElement.classList.remove('active')
		}
		let positionTree = treeMenu.querySelector(`div[data-id="${id}"]`)
		positionTree.classList.add('active')
	}

	addClassPositionById(0)

	// 显示为空的元素
	let fEmpty = document.querySelector('.f-empty')

	// 1. 菜单区域

	treeMenu.onclick = function (ev){
		let target = ev.target;
		let t = null;
		if(target.nodeName === "LI"){
			t = target.children[0]
		}else if(target.nodeName === "SPAN") {
			t = target.parentNode;
		}else if(target.nodeName === "I") {
			t = target.parentNode.parentNode;
		}

		if(t){
			let treeId = parseInt(t.dataset.id);
			addClassPositionById(treeId)

			// 渲染文件区域
			folders.innerHTML = createFileHtml(treeId);
			breadNav.innerHTML = createNavHtml(treeId);
			if(getChildsById(d,treeId).length === 0){
				fEmpty.style.display = 'block'
			}else{
				console.log(1111);
				fEmpty.style.display = 'none'
			}

		}


	}


})();




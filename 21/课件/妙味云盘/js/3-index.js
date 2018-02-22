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
			navHtml += `<a data-id = "${parents[i].id}" href="javascript:;">${parents[i].title}</a>`
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
				filesHtml += `<div data-id="${item.id}" class="file-item">
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

	// 根据传过来的id，渲染三个区域
	function renderTree(id){
		id = parseInt(id)
		addClassPositionById(id)

		// 渲染文件区域
		folders.innerHTML = createFileHtml(id);
		breadNav.innerHTML = createNavHtml(id);
		if(getChildsById(d,id).length === 0){
			fEmpty.style.display = 'block'
		}else{
			fEmpty.style.display = 'none'
		}	

		// 点击了三个区域任何一个区域。全选就不被勾选

		checkedAll.classList.remove('checked')
	}

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
			renderTree(t.dataset.id)
		}
	}

	// 导航区域

	breadNav.onclick = function (ev){
		if(ev.target.nodeName === "A"){
			renderTree(ev.target.dataset.id)
		}	
	}

	// 文件区域

	// 获取文件区域所有的i标签
	let singles = folders.getElementsByTagName('i')

	folders.onclick = function (ev){
		let target = ev.target;
		if( target.classList.contains('folders')){
			return;
		}
		// 点击单选 // 单选
		if(target.nodeName === 'I'){

			target.classList.toggle('checked')
			target.parentNode.classList.toggle('active')

			// 当所有的单选都选中了，全选

			if(whoSelect().length === singles.length){
				checkedAll.classList.add('checked')
			}else{
				checkedAll.classList.remove('checked')
			}

			return;
		}

		let t = null;
		if(target.nodeName === 'IMG' 
			|| target.nodeName === 'SPAN'
			 || target.nodeName === 'INPUT'
		){
			t = target.parentNode
		}
		if(t){
			renderTree(t.dataset.id)
		}
	}

	// 来获取那些选中的元素
	function whoSelect(){
		return Array.from(singles).filter(function (item){
			return item.classList.contains('checked')
		})
	}

	// 全选

	let checkedAll = document.querySelector('.checkedAll')

	checkedAll.onclick = function (){
		let hasAddClass = this.classList.toggle('checked')	

		Array.from(singles).forEach(function (item){
			if(hasAddClass){
				item.classList.add('checked')
				item.parentNode.classList.add('active')
			}else{
				item.classList.remove('checked')
				item.parentNode.classList.remove('active')
			}
		})
	}

	// 框选的功能

	function getRect(element){
		return element.getBoundingClientRect()
	}

	function collision(obj1,obj2){
		let dragRect = getRect(obj1)
		let boxRect = getRect(obj2)

		if(dragRect.right < boxRect.left || dragRect.bottom < boxRect.top || dragRect.left > boxRect.right || dragRect.top > boxRect.bottom){
			return false
		}else{
			return true
		}	
	}

	//动态
	// 获取到文件区域下所有的文件
	let  fileItem = folders.getElementsByClassName('file-item')

	// 生成框框

	folders.onmousedown = function (ev){
		// 事件源是不是文件区域
		if(!ev.target.classList.contains('folders')){
			return
		}

		let newDiv = document.createElement('div');
		newDiv.className = 'kuang';
		document.body.appendChild(newDiv);

		let disX = ev.clientX
		let disY = ev.clientY

		newDiv.style.left = disX + 'px';
		newDiv.style.top = disY + 'px';

		document.onmousemove = function (ev){
			newDiv.style.width = Math.abs(ev.clientX - disX) + 'px';
			newDiv.style.height = Math.abs(ev.clientY - disY) + 'px';
			newDiv.style.left = Math.min(ev.clientX, disX) + 'px';
			newDiv.style.top = Math.min(ev.clientY, disY) + 'px';

			// 和所有的box进行碰撞检测
			for( var i = 0; i < fileItem.length; i++ ){
				if(collision(newDiv,fileItem[i])){
					fileItem[i].classList.add('active')

					singles[i].classList.add('checked')
				}else{
					fileItem[i].classList.remove('active')
					singles[i].classList.remove('checked')
				}
			}

			// 那些选中了

			if(whoSelect().length === singles.length){
				checkedAll.classList.add('checked')
			}else{
				checkedAll.classList.remove('checked')
			}

		}

		document.onmouseup = function (){
			document.onmousemove = 	document.onmouseup = null;

			newDiv.remove();
		}

		ev.preventDefault();

	}

})();




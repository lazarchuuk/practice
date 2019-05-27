class View {
	constructor() {
		this.page = 0;
		this.filterConfig = {};
		this.album = document.querySelector(".album");
		this.listOfPosts = new ListOfPosts();
	} 

	logout = () => {
		localStorage.removeItem("username");
		location.reload();
	}
	isAuthorized = () => localStorage.getItem("username");

	displayAuthPopup = () => {
		const popup = document.createElement("div");
		popup.innerHTML = `
		<form id="login-form">
		<h3>username</h3>
		<input name = "username" class = "control" type = "text">
		<h3>password</h3>					
		<input name = "password" class = "control" type = "password">

		<img src="icons/devider.png" class = "divider">

		<button type="submit" class="button" id = "load">
		<h3>Authorize</h3>
		</button>
		</form>	
		`;
		popup.classList.add("auth-popup");
		document.body.insertBefore(popup, document.body.firstChild);

		const onSubmit = (e) => {
			const name = this.loginForm.username.value;
			const password = this.loginForm.password.value;
			if((name === 'vika')&&(password === '1234')){
				localStorage.setItem('username', 'vika');
				location.replace('index.html');
			}
			e.preventDefault();
		} 

		this.loginForm = document.querySelector("#login-form");
		this.loginForm.addEventListener('submit', onSubmit);

		const shadow = document.createElement("div");
		shadow.classList.add("shadow");
		document.body.insertBefore(shadow, document.body.firstChild);
		shadow.addEventListener("click", () => {
			
		})
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = '16px';
		const onClose = () => {
			popup.remove();
			shadow.remove();
			document.body.style.overflow = 'auto';
			document.body.style.paddingRight = '';
		}

		shadow.addEventListener('click', onClose);
	}

	displaySearchPopup = () => {
		const spopup = document.createElement("div");
		spopup.innerHTML = `
		<form id="search-form">
			<div class="description search-name">Enter username:
				<input class="textarea search-name" name = "search"></input>
			</div>
			<div class="description search-name">Choose date (from-to):  
					<p><input type="date" class = "textarea" name="fromDate"></p>
					<p><input type="date" class = "textarea" name="toDate"></p>
			</div>	
			<button class="button" id = "search" name = "submit">Search!</button>				
		</form>	`

		spopup.classList.add("search-popup");
		document.body.insertBefore(spopup, document.body.firstChild);

		const onClose = () => {
			spopup.remove();
			shadow.remove();
			document.body.style.overflow = 'auto';
			document.body.style.paddingRight = '';
		}

		const onSubmit = (e) => {
			e.preventDefault();
			const author = this.searchForm.search[0].value;
			const fromDate = new Date(this.searchForm.fromDate.value);
			const toDate = new Date(this.searchForm.toDate.value);
			this.filterConfig = { author, fromDate, toDate };
			this.removePosts();
			this.page = 0;
			this.displayPosts(this.listOfPosts.getPage(0, 5, this.filterConfig));
			onClose();
		} 

		this.searchForm = document.querySelector("#search-form");
		this.searchForm.addEventListener('submit', onSubmit);

		const shadow = document.createElement("div");
		shadow.classList.add("shadow");
		document.body.insertBefore(shadow, document.body.firstChild);
		shadow.addEventListener("click", onClose);

		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = '16px';
	}

	displayTags = (tags) => {
		return tags.map(tag => `<span>${tag}</span>`).join('');
	}

	displayEditPopup = (id) => {
		const post = this.listOfPosts.get(id);
		const epopup = document.createElement("div");
		epopup.innerHTML = `
		<form id="edit-form">
			<label>
				<input type="file" name = "inp">
				<img src="${post.photoLink}" class = "addphoto">
			</label>

			<div class="description">
				<p id="name">username</p>
				<p display="inline" id="date">10.02.2019 / 15:40</p>
				<textarea class="textarea" rows="8" maxlength="200" name = "description">${post.description}</textarea>
				<div>
					<input class = "tagInp textarea" name = "addTag"></input>
					<button class = "addtag" name = "tagBut">+</button>
				</div>
				<p id = "tags">${this.displayTags(post.tags)}</p>
			</div>

			<img src="icons/devider.png" class = "divider">

			<button class="button" id = "load" name = "submit">
				Save and Publish
			</button>
		</form>	`

		epopup.classList.add("edit-popup");
		document.body.insertBefore(epopup, document.body.firstChild);
		this.editForm = document.querySelector("#edit-form");
		const onClose = () => {
			epopup.remove();
			shadow.remove();
			document.body.style.overflow = 'auto';
			document.body.style.paddingRight = '';
		}


		const chooseFile = () => {
			const photo = document.querySelector(".addphoto");
			const file = this.editForm.inp.files[0];
			const fileReader = new FileReader();
			fileReader.onloadend = () => photo.src = fileReader.result;
			fileReader.readAsDataURL(file);
		}

		const onSubmit = (e) => {
			e.preventDefault();
			const photo = document.querySelector(".addphoto");
			const description = this.editForm.description.value;
			//tags here
			this.listOfPosts.edit(post.id, {
				description,
				photoLink: photo.src,
			})
			location.reload();
		}

		const tagInp = this.editForm.addTag;
		const tagBut = this.editForm.tagBut;
		const addP = document.getElementById("tags");
		const addTag = (event) => {
			event.preventDefault();
			const tag = tagInp.value;
			tagInp.value = "";
			const tagElem = document.createElement("span");
			addP.insertBefore(tagElem, addP.firstChild);
			tagElem.innerHTML = tag;
		}
		tagBut.addEventListener('click', addTag);

		this.editForm.inp.addEventListener('input', chooseFile);
		this.editForm.addEventListener('submit', onSubmit);	

		const shadow = document.createElement("div");
		shadow.classList.add("shadow");
		document.body.insertBefore(shadow, document.body.firstChild);
		shadow.addEventListener("click", onClose);

		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = '16px';
	}


	displayAddPopup = () => {
		const apopup = document.createElement("div");
		apopup.innerHTML = `
		<form id="edit-form">
			<label>
				<input type="file" name = "inp">
				<img src="icons/frame.png" class = "addphoto">
			</label>

			<div class="description">
				<p id="name">username</p>
				<p display="inline" id="date">dd.mm.yyyy / hh:mm</p>
				<textarea class="textarea" rows="8" maxlength="200" name = "description"></textarea>
				<div>
					<input class = "tagInp textarea" name = "addTag"></input>
					<button class = "addtag" name = "tagBut">+</button>
				</div>
				<p id = "tags"></p>
			</div>

			<img src="icons/devider.png" class = "divider">

			<button class="button" id = "load" name = "submit">
				Save and Publish
			</button>
		</form>	`
		apopup.classList.add("add-popup");
		document.body.insertBefore(apopup, document.body.firstChild);
		const onClose = () => {
			apopup.remove();
			shadow.remove();
			document.body.style.overflow = 'auto';
			document.body.style.paddingRight = '';
		}

		this.editForm = document.querySelector("#edit-form");


		const chooseFile = () => {
			const photo = document.querySelector(".addphoto");
			const file = this.editForm.inp.files[0];
			const fileReader = new FileReader();
			fileReader.onloadend = () => photo.src = fileReader.result;
			fileReader.readAsDataURL(file);
		}

		const tagInp = this.editForm.addTag;
		const tagBut = this.editForm.tagBut;
		const addP = document.getElementById("tags");
		const addTag = (event) => {
			event.preventDefault();
			const tag = tagInp.value;
			tagInp.value = "";
			const tagElem = document.createElement("span");
			addP.insertBefore(tagElem, addP.firstChild);
			tagElem.innerHTML = tag;
		}
		tagBut.addEventListener('click', addTag);
		const onSubmit = (e) => {
			e.preventDefault();
			const photo = document.querySelector(".addphoto");
			const description = this.editForm.description.value;
			const tagElems = document.getElementById("tags").children;
			const tags = tagElems ? [].map.apply(tagElems, [(tag) => tag.textContent]) : [];
			this.listOfPosts.add({
				id: Math.random(),
				description,
				photoLink: photo.src,
				createdAt: Date.now(),
				tags : tags,
			    author: localStorage.getItem('username'),
			    likes: 0,
			})

			location.reload();
		}

		this.editForm.inp.addEventListener('input', chooseFile);
		this.editForm.addEventListener('submit', onSubmit);	

		const shadow = document.createElement("div");
		shadow.classList.add("shadow");
		shadow.addEventListener('click', onClose)
		document.body.insertBefore(shadow, document.body.firstChild);

		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = '16px';
	}

	displayHeader = () => {
		const header = document.createElement("header");
		header.innerHTML = `
		<nav class="nav-container">
		<a href="index.html" class = "logo">
		<h1>Photo Album</h1></a>
		<ul class="menu right-pos">
		<li>
		<img src="icons/search.png" id = "searching" alt="search icon" class="icon" align="middle"> 
		</li>
		${this.isAuthorized() ? `
			<li>
			<img src="icons/user.png" id = "edit" alt="User icon" class ="icon" align="middle">
			</li>
			<li>
			<img src="icons/logout.png" id="logout" alt="Logout" class ="icon" align="middle">
			</li>
			` : `
			<li>
			<button type = "submit" class="button" id = "login">
			<h3>Log in</h3>
			</button>
			</li>
			`}

			</ul>
			</nav>
			`;
			document.body.insertBefore(header, document.body.firstChild);
			const logoutBtn = document.getElementById("logout");
			logoutBtn && logoutBtn.addEventListener("click", this.logout);
			const loginBtn = document.getElementById("login");
			loginBtn && loginBtn.addEventListener("click", this.displayAuthPopup);
			const editBtn = document.getElementById("edit");
			editBtn && editBtn.addEventListener("click", this.displayAddPopup);
			const searchBtn = document.getElementById("searching");
			searchBtn && searchBtn.addEventListener("click", this.displaySearchPopup);

			return this;
		}

		createPostElement = (post) => {
			const article = document.createElement('article');
			article.innerHTML = `
			<img src="${post.photoLink}" class="picture">
			<div class="description">
			<p id="name">${post.author}</p>
			<p id="date">${this.formatDate(post.createdAt)}</p>
			<p class="textfield">${post.description}</p>
			</div>
			${this.getTagList(post.tags)}

			<div class="photo-but">
				<p class = "like">
					<img src="icons/like.png" class="icon iconinbox heart">
					<span class="count">${post.likes}</span>
				</p>
				${this.isAuthorized() ? `
					<p class = "edit"><img src="icons/edit.png" class="icon iconinbox icon-edit" name = "add"></p>
					<p class = "delete"><img src="icons/delete.png" class="icon iconinbox icon-delete"></p>
				` : `` }
			</div>
			<img src="icons/devider.png" class="dev">
			`;

				[].forEach.apply(article.getElementsByClassName('tag'), [(tagElem) => {
					tagElem.addEventListener('click', () => {
						const tag = tagElem.textContent.slice(1);
						this.page = 0;
						this.removePosts();
						this.displayPosts(this.listOfPosts.getPage(0, 5, { tag }));
					})
				}])
				const heart = article.getElementsByClassName('heart')[0];
				heart.addEventListener('click', () => {
					this.listOfPosts.like(post.id);
					const count = article.getElementsByClassName('count')[0];
					const like = article.getElementsByClassName('like')[0];
					count.textContent = post.likes;
					like.removeChild(count);
					like.appendChild(count);
				})
				article.setAttribute("data-id", post.id);
				return article;

			}

			formatDate = (date) => {
				date = new Date(date);
				return `${date.getDay()}.${date.getMonth()+1}.${date.getFullYear()} / ${date.getHours()}:${date.getMinutes()}`;
			} 

			getTagList = (tags) => {
				const list = tags.reduce((s, tag) => s += `<li class="tag">#${tag}</li>`, '');
				return `<ul class = "hastag">${list}</ul>`;
			}

			removePosts = () => {
				const album = document.getElementsByClassName('album')[0];
				album.innerHTML = "";
			}

			displayPosts = (posts) => {
				posts.forEach(post => {
					const el = this.createPostElement(post);
					this.album.appendChild(el);
				});

				[].forEach.apply(document.getElementsByClassName('icon-delete'), [(element) => {
					const id = element.closest("article").dataset.id;
					element.addEventListener("click", () => {
						if (confirm("are you sure ????")) {
							Post.removePhotoPost(id);
							location.reload();
						}
					});
				}]);

				[].forEach.apply(document.getElementsByClassName('icon-edit'), [(element) => {
					const id = element.closest("article").dataset.id;
					element.addEventListener("click", () => this.displayEditPopup(id));
				}]);

				scrollTo(0, 0);
				return this;
			}
			initLoadMore = () => {
				const load = document.getElementById('load');
				load.addEventListener('click', () => {
					this.page++;
					this.displayPosts(this.listOfPosts.getPage(this.page, 5, this.filterConfig));
				})
			}

			init = () => {
				this.displayHeader();
				this.displayPosts(this.listOfPosts.getPage(this.page, 5));
				this.initLoadMore();
			}
		}
		(new View().init());

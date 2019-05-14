class View {
	constructor(){
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
			// ... remove popup
			// ... remove shadow
			shadow.classList.remove("shadow");
			
		})
		document.body.style.overflow = 'hidden';
	}

	displaySearchPopup = () => {
		const spopup = document.createElement("div");
		spopup.innerHTML = `
		<form id="search-form">
			<div class="description search-name">Enter username:
				<textarea class="textarea search-name" rows="1" maxlength="30" name = "searchname"></textarea>
			</div>
			<div class="description search-name">Choose date (from-to):  
					<p><input type="date" class = "textarea" name="calendar"></p>
					<p><input type="date" class = "textarea" name="calendar"></p>
			</div>	
			<button class="button" id = "search" name = "submit">Search!</button>				
		</form>	`

		spopup.classList.add("search-popup");
		document.body.insertBefore(spopup, document.body.firstChild);

		const onSubmit = (e) => {
			const username = this.searchname.value;
			localStorage.getItem(username);
			this.getPage(' ', ' ', username)
			e.preventDefault();
		} 

		const shadow = document.createElement("div");
		shadow.classList.add("shadow");
		document.body.insertBefore(shadow, document.body.firstChild);
		shadow.addEventListener("click", () => {
			// ... remove popup
			// ... remove shadow
			shadow.classList.remove("shadow");
			spopup.classList.remove("search-popup");		
		})

		document.body.style.overflow = 'hidden';
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
			</div>

			<img src="icons/devider.png" class = "divider">

			<button class="button" id = "load" name = "submit">
				Save and Publish
			</button>
		</form>	`
		epopup.classList.add("edit-popup");
		document.body.insertBefore(epopup, document.body.firstChild);


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

		this.editForm = document.querySelector("#edit-form");
		this.editForm.inp.addEventListener('input', chooseFile);
		this.editForm.addEventListener('submit', onSubmit);	

		const shadow = document.createElement("div");
		shadow.classList.add("shadow");
		document.body.insertBefore(shadow, document.body.firstChild);

		document.body.style.overflow = 'hidden';
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
				<p display="inline" id="date">10.02.2019 / 15:40</p>
				<textarea class="textarea" rows="8" maxlength="200" name = "description"></textarea>
			</div>

			<img src="icons/devider.png" class = "divider">

			<button class="button" id = "load" name = "submit">
				Save and Publish
			</button>
		</form>	`
		apopup.classList.add("add-popup");
		document.body.insertBefore(apopup, document.body.firstChild);


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
			this.listOfPosts.add({
				id: Math.random(),
				description,
				photoLink: photo.src,
				createdAt: Date.now(),
				tags: ['kek', 'omg'],
			    author: localStorage.getItem('username'),
			})
			location.reload();
		}

		this.editForm = document.querySelector("#edit-form");
		this.editForm.inp.addEventListener('input', chooseFile);
		this.editForm.addEventListener('submit', onSubmit);	

		const shadow = document.createElement("div");
		shadow.classList.add("shadow");
		document.body.insertBefore(shadow, document.body.firstChild);

		document.body.style.overflow = 'hidden';
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
			editBtn && editBtn.addEventListener("click", this.displayEditPopup);
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

			${this.isAuthorized() ? `
				<div class="photo-but">
				<p class = "like"><img src="icons/like.png" class="icon iconinbox"></p>
				<p class = "edit"><img src="icons/edit.png" class="icon iconinbox icon-edit" name = "add"></p>
				<p class = "delete"><img src="icons/delete.png" class="icon iconinbox icon-delete"></p>
				</div>
				` : `
				<div class="photo-but">
				<p class = "like"><img src="icons/like.png" class="icon iconinbox"></p>
				</div>
				`}


				<img src="icons/devider.png" class="dev">
				`;

				article.setAttribute("data-id", post.id);
				return article;

			}

			formatDate = (date) => {
				date = new Date(date);
				return `${date.getDay()}.${date.getMonth()+1}.${date.getFullYear()} / ${date.getHours()}:${date.getMinutes()}`;
			} 

			getTagList = (tags) => {
				const list = tags.reduce((s, tag) => s += `<li><a href="index.html">#${tag}</a></li>`, '');
				return `<ul class = "hastag">${list}</ul>`;
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

				return this;
			}
		}
		(new View().displayHeader().displayPosts(JSON.parse(localStorage.getItem('photoPosts'))));
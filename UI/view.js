class View {
	constructor(){
		this.album = document.querySelector(".album");
	} 

	isAuthorized = () => false; 

	displayHeader = () => {
		const header = document.createElement('header');
		header.innerHTML = `
			<nav class="nav-container">
				<a href="index.html" class = "logo">
					<h1>Photo Album</h1>
				</a>
				<ul class="menu right-pos">
					<li>
						<img src="icons/search.png" alt="search icon" class="icon" align="middle"> 
					</li>
					${this.isAuthorized() ? `
						<li>
							<a href="index.html"><img src="icons/user.png" alt="User icon" class ="icon" align="middle"></a>
						</li>
						<li>
							<a href="index.html"><img src="icons/logout.png" alt="Logout" class ="icon" align="middle"></a>
						</li>
					` : `
						<li>
							<form action = "authorize.html">
							<button type = "submit" class="button" id = "login">
								<h3>Log in</h3>
							</button>
							</form>
						</li>
					`}
					
				</ul>
			</nav>
		`;
		document.body.insertBefore(header, document.body.firstChild);
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
				<p class = "like"><img src="icons/like.png" class="icon" id="iconinbox"></p>
				<p class = "edit"><a href = "edit.html"><img src="icons/edit.png" class="icon" id="iconinbox"></p></a>
				<p class = "edit"><img src="icons/delete.png" class="icon" id="iconinbox"></p>
			</div>
			<img src="icons/devider.png" class="dev">
  		`;
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
		return this;
	}
}
(new View().displayHeader().displayPosts(JSON.parse(localStorage.getItem('photoPosts'))));
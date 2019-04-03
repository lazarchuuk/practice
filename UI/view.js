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
						<a href="index.html"><img src="icons/search.png" alt="search icon" class="icon" align="middle"></a> 
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
							<button class="button" id = "login">
								<h3>Log in</h3>
							</button>
						</li>
					`}
					
				</ul>
			</nav>
		`;
		document.body.insertBefore(header, document.body.firstChild);
		return this;
	}

	createPostElement = (post, isLast) => {
  		const article = document.createElement('article');
  		article.innerHTML = `
			<img src="${post.photoLink}" class="picture">
			<div class="left-description">
				<p class="description" id="name">${post.author}</p>
				<p display="inline" id="date">${this.formatDate(post.createdAt)}</p>
				${this.getTagList(post.tags)}
			</div>
			<div class="textfield">
				<p>${post.description}</p>
			</div>
			<div class="left">
				<a href="index.html"><img src="icons/like.png" class="icon" id="iconinbox"></a>
			</div>
			<div class="right">
				<a href="index.html"><img src="icons/edit.png" class="icon" id="iconinbox"></a>
				<a href="index.html"><img src="icons/delete.png" class="icon" id="iconinbox"></a>
			</div>
			<img src="icons/devider.png" class="dev">
  		`;
  		return article;
	}

	formatDate = (date) => {
		return `${date.getDay()}.${date.getMonth()+1}.${date.getFullYear()} / ${date.getHours()}:${date.getMinutes()}`;
	} 

	getTagList = (tags) => {
		const list = tags.reduce((s, tag) => s += `<li><a href="index.html">#${tag}</a></li>`, '');
		return `<ul class = "hastag">${list}</ul>`;
	}

	displayPosts = (posts, index) => {
		posts.forEach(post => {
			const el = this.createPostElement(post, index);
			this.album.appendChild(el);
		});
		return this;
	}


}
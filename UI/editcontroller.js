class EditController{
	constructor(){
		this.editForm = document.querySelector("#edit-form");
		this.editForm.inp.addEventListener('input',this.chooseFile);
		this.editForm.addEventListener('submit', this.onSubmit);	
	} 
	chooseFile = () => {
		const photo = document.querySelector(".addphoto");
		const file = this.editForm.inp.files[0];
		const fileReader = new FileReader();
		fileReader.onloadend = () => photo.src = fileReader.result;
		fileReader.readAsDataURL(file);
	}
	onSubmit = (e) =>{
		e.preventDefault();
		const photo = document.querySelector(".addphoto");
		const description = this.editForm.description.value;
		//tags here
		if (localStorage.getItem('editablePostId')) {
			
		} else {
			(new PhotoList()).add({
				id: Math.random(),
				description,
				photoLink: photo.src,
				createdAt: Date.now(),
				author: 'viktoriya',
				tags: [],
				//author: localStorage.getItem('username'),
			})
		}
		console.log(JSON.parse(localStorage.getItem('photoPosts')));
	}

}

new EditController();
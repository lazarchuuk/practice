class LoginController{
	constructor(){
		this.loginForm = document.querySelector("#login-form");
		this.loginForm.addEventListener('submit', this.onSubmit);	
	} 

	getName = () => {
		
		//console.log(name, password);
	}
	onSubmit = (e) => {
		const name = this.loginForm.username.value;
		const password = this.loginForm.password.value;
		if((name !== 'vika')||(password !== '1234')){
			e.preventDefault();
		}
		else localStorage.setItem('username', 'vika');
		
	} 
}

new LoginController();
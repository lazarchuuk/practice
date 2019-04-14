class LoginController{
	constructor(){	
	} 

	getName = () => {
		
		//console.log(name, password);
	}
	onSubmit = (e) => {
		const name = this.loginForm.username.value;
		const password = this.loginForm.password.value;
		if((name === 'vika')&&(password === '1234')){
			localStorage.setItem('username', 'vika');
			location.replace('index.html');
		}
		e.preventDefault();
	} 
}

new LoginController();
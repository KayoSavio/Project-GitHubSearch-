import api from './api';


class App{
    constructor(){
        this.repositories = [];
        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.getElementById('in');
        this.listEl = document.getElementById('repo-list');
        this.registerHandlers();
    }
    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }
    setLoading(loading = true){
        if(loading===true){
            let loadingEl = document.createElement('strong');
            loadingEl.appendChild(document.createTextNode('Loading'));
            loadingEl.setAttribute('id','loading');

            this.formEl.appendChild(loadingEl);
        }else{
            document.getElementById('loading').remove();
        }
    }
     async addRepository(event){
        event.preventDefault();
        const repoInput = this.inputEl.value;
        this.setLoading()

        try {
            const response = await api.get(`/users/${repoInput}`);
            const {name,bio,avatar_url,html_url} = response.data;
            this.repositories.push({
                name,
                bio,
                avatar_url,
                html_url
            });
            this.render();
            if(name==='Kayo Sávio'){
                this.isAdmin();
            }
        }
        catch(err){
            alert('O repositório não existe!');
        }
        this.inputEl.value='';
        this.setLoading(false);
    }
    render(){
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo =>{
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src',repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.bio));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target','_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        }); 
    }
    isAdmin(){
        alert('Bem Vindo Admin');
        const admin = document.createElement('strong');
        admin.appendChild(document.createTextNode('Administrador'));
        this.listEl.appendChild(admin);
    }
}
new App();



    /*

import axios from 'axios';

const buscaUsuario = async user => {
    try{
    const response = await axios.get(`https://api.github.com/users/${user}`)
    console.log(response.data);
    }
    catch (err){
    console.log('Usuário não existe');
    }
   }
   buscaUsuario('diego3g');*/
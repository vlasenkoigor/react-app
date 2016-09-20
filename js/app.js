import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchString : ""}
    }

    onSearch( string ){
        this.setState({searchString : string})
    }

    render(){
        return (
            <div>
                <Watches/>
                <br/>
                <Search onSearch={this.onSearch.bind(this)}/>
                <List items={this.props.users} needle={this.state.searchString} />
            </div>
        )
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchString : ""}
    }

    changeHandler(e) {
        this.setState({searchString : e.target.value});
        this.props.onSearch(e.target.value);
    }

    componentWillReceiveProps(props){
        this.state.name = props.name;
    }

    render(){
        return (
            <div>
                <input type="text" value={this.state.searchString} onChange={this.changeHandler.bind(this)} placeholder="Type here" />
            </div>
        );
    }
}


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items : this.props.items, needle : this.props.needle}
    }


    componentWillReceiveProps(props){
        this.setState({needle : props.needle})
        console.log(props.needle)
    }

    render(){
        var reg =  new RegExp(this.state.needle, "i");
        return <ul>
            {this.state.items.filter(i => reg.test(i.first_name) || reg.test(i.last_name) || reg.test(i.email))
                             .map(i => <li key={i.id}> {i.first_name} {i.last_name} {i.email} </li> )}
        </ul>
    }
}

class Watches extends React.Component{
    constructor(props){
        super(props);
    }

    tick(){
        this.setState({date : this.getDate()});
    }

    getDate(){
        return new Date();
    }

    componentWillMount(){
        this.tick();
        setInterval(this.tick.bind(this), 1000);
    }

    render(){
        return <div>{this.state.date.toString()}</div>
    }
}

// START APP
(function () {

})();
// 1. Создаём новый объект XMLHttpRequest
let  xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
xhr.open('GET', 'MOCK_DATA.json', true);

// 3. Отсылаем запрос
xhr.send();

xhr.onreadystatechange = ()=> { // (3)
    if (xhr.readyState != 4) return;
    if (xhr.status == 200) {
        start(JSON.parse(xhr.responseText));
    }
};

function start(data) {
    console.log(data);
    ReactDOM.render(<App users={data}/>, document.getElementById("main"));
}







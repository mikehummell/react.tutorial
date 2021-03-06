##
Start:
npm start
##Init Fastway

npm init
npm install react, react-dom --save
npm install webpack  webpack-dev-server  @babel/core  babel-loader @babel/preset-es2015 @babel/preset-react, @babel/preset-stage-2  @babel/preset-env --save-dev 

FolderStructer
src\index.html (html skelton with <script src="/app/bundle.js"></script>  )
src\app\index.js
src\app\components
webpack.config.js (with code)

package.json anpassen


## Why React
- Split Webpage in component and reusable
- Include html and js code
- MVC (React = View)
- Library for create user Interface (vs Angular Singe User Page with router)
- Not whole page but for signle page (e.G combine with Laravel)
## Install
- NodeJS
- Visual Studio code

## Setup React

### Initial Project

- Create new folder
```
mkdir myproject
cd mymproject
npm init 
```
Create a package.json <- Manageing dependency

### Dependency
#### Production Dependency
```
npm install react --save
npm install react-dom --save
``` 
--save includes in into package.json, but is not nessesary any more after node5
#### Development Dependency (not for deployment)
Why: Boundle js, css into one page (and transform it. e.g ea6 -> ea5)
``` 
npm install webpack --save-dev 
npm install webpack-dev-server --save-dev // Server for html protocoll
npm install @babel/core --save-dev //New version
npm install babel-loader --save-dev // Transpaling ES6-ES5 in Webpack (darum loader)
npm install @babel/preset-es2015 @babel/preset-react, @babel/preset-stage-2 --save-dev //which es6 logic
npm install --save-dev @babel/preset-env
``` 
### Crating File Structur
``` 
mkdir src
cd src
index.html
mkdir app
cd app
index.js
``` 

### Writing Code
open index.js
Write some code (e.g Console.log("It workds!"))
open index.html
Create a html Skelleton (in VSC: html5 Enter)
between body: <script src="/app/bundle.js"></script>   




### Config Webpack
Create wepack.config.js //inside root


```
var webpack = require("webpack");
var path = require("path");
```
Includes
Default NodeJS Lib (global). Resolve Path of app

```
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
```
Directory to server the app. Creates automaticly a dist-folder
src. Where the code is for webpackag


Webpack export this JS Object named config
entry: First entry point and webpack goes to all dependency
filename: one file bundled
publicPath: for the productive environement, where to put all item in

```javascript
    module: {
        loaders: [
            {
                test: "/\.js?" ,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react","es2015","stage-2"] //old
                    presets: ["@babel/preset-env"] //new
                }
            }
        ]
    }
```

module: Everything would be boundelt, but no ES6->ES5 would happe
loader: only babel. test mean which file should be consider (everything therefore regex)

### Config package.json

```javascript
...
  "scripts": {
    "start": "npm run build",
    "build": "webpack -d && copy src/index.html dist/index.html && webpack-dev-server --content-base src/ --inline --hot",
             "webpack -d && copy src\\index.html dist\\index.html && webpack-dev-server --content-base src\\ --inline --hot", //Windows
    "build:prod": "webpack -p && copy src/index.html dist/index.html"
                  "webpack -p && copy src\\index.html dist\\index.html" //Windows
  },
...
```

Delete the test section in the script part
start: define what to start. With npm start it start the build
build: Dev Build. 
Run webpack Find automaticly the webpack.config.js and run it developmentmodle 
and copy aswell the index to the dist folder
starts an webserver
build:prod: the same bout with -p

#Working with React
## Lection 3
- Create component as class extend from React.Component with a render() function and a return. JSX
- Create a div element to put it in html
- render it to the div element

## Lection 4
two component: Main and header

## Lection 5 Prop (pass something from outside to inside)
### From one component to another (included)
via Props you can send data. Always in {} for sending and receiving
```javascript
{this.props.age}
{this.props.user.hobbies.map(((hobbie,i)=> <li key={i}>{hobbie}</li>))}
```

Proptype = Typdefinition of properties:
```javascript
Home.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    user: PropTypes.object
}
```
ChildrenProp is also possible between the component
```html
<myComponent>myChildren</myComponent>
```

## Lection 6 Events
Internal Variable build with a constructor
Props comes form outside an is asigned to age (internal)
```javascript
    constructor(props){
        super();
        this.age = props.age;
    }
```
A Function to change the (internal) age
```javascript
    onMakeOlder() {
        this.age +=3;
        console.log(this.age);
    }
```
An the event (start with on)
After onMakeOlder there is no () because otherwise JS would execute it imediatly
to bind it because otherwise this.OnMakeOlder would reference to the Button itself instead of the Class
```html
<button onClick={this.onMakeOlder.bind(this)} >MyButton</button>
```

## Lection 7 State (What happen inside and is triggerd from inised)
Use the react property state to put in an javascript object
```javascript
    constructor(props){
        super();
        this.state = {
            age: props.initalAge,
            status: 0
        }
    }
```

Set the stage via setState
```javascript
    onMakeOlder() {
        this.setState({
            age: this.state.age + 3
        });  
    }
```
## Lection 9:
React has a virtual DOM. When samething changes it compares two virutal DOM with eachother and then put the difference to the real DOM. 

## Lection 10: Stateless Component
Component without State (But still have props)
If possible, this should be used. Reason: Faster und predictible. 
State Component are ticki with redux.
From
```javascript
export class Header extends React.Component {
    render() {
        return(
```
to
```javascript
export const Header = (props) =>  {
        return(
```

## Lection 11: Child -> Parent Communication
From Parent to Child use props
From Child to Parent it not possible. But you can send a reference of a function from parent to child and the call the function from child

```javascript
 onGreet() {
        alert("Hallo!");
 }
render() {
    return (
        <Home greet={this.onGreet} />
```
and  on the Component
```javascript
<button onClick={this.props.greet}>Greet</button>
```



## Lection 13: Two Way Binding
With events. Very complicated. -> Therefore Redux

## Lection 14: Lifecycle

- componentWillMount -> Immediatly before inital rendering
- componentDidMount -> Immediatly after inital rendering
- componentWillReceiveProps -> When component receives new props
- shouldComponentUpdate -> Before rendering, after receiving new props or state
        return false to prevent rendering
- componentWillUpdate -> Before rendering, after receiving new props or state
- componentDidDupate -> After component update are flushed to the DOM
- componentWillUnmount -> Immediatly before removing component from the DOM

## Lection 15: Routing
Single Page App
Handle change, URL imput, changes by link should be handel by react (Path). 
Load Page from url. Basic navigation

To create a navigation
To load it into Root component
```javascript
            <BrowserRouter>
                <div>
                    <Root >
                        <Route exact path="/" component={Home}/>
                        <Route path="/user" component={User}/>
                        <Route path="/home" component={Home}/>
                    </Root>
                </div>
            </BrowserRouter>
```

With this.props.children it takes the passed component
```javascript
export class Root extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <Header />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
```
## Lection 16: 
Link to other component

```javascript
                        <li><NavLink to={"/home"} activeStyle={{color:"red"}} activeClassName={"active"}>Home</NavLink></li>
                        <li><NavLink to={"/user"} activeStyle={{color:"red"}} activeClassName={"active"}>User</NavLink></li>
```
or via function (from a button)
```javascript
    onNavigateHome() {
        this.props.history.push("/home");
    }
```


### Parameter passing
```javascript
<Route path="/user/:id" component={User}/>
...
<p>User ID: {this.props.match.params.id}</p>
```
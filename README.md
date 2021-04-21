# General Information
This project was created and maintained by [Mirik999](https://github.com/mirik999)  
Package manager (preferable to use ```yarn```)

```yarn``` installation packages  
```yarn start``` start

## Styling
Some common components and layers styled with
[styled-components](https://styled-components.com/) and for rest used
[rsuite ui components](https://rsuitejs.com/)

## Folder structure
```html
|-src  
&nbsp;&nbsp;|--assets (static files, images ...)  
  |--components  
&nbsp;&nbsp;|----common ( reusable components )  
&nbsp;&nbsp;|----hoc ( layers and wrappers )  
&nbsp;&nbsp;|--config  
&nbsp;&nbsp;|--hooks  
&nbsp;&nbsp;|--pages  
&nbsp;&nbsp;|----each folder one exact route with own components 
&nbsp;&nbsp;|----except Rest, this folder contains rest routes  
&nbsp;&nbsp;|--redux  
&nbsp;&nbsp;|----requests (graphql schemas)  
&nbsp;&nbsp;|----slices ( redux actions and reducers )  
&nbsp;&nbsp;|----types  
&nbsp;&nbsp;|----store.ts ( redux global store )  
  |--utils ( contains all third party helpers )
  |--App.tsx ( entry component )
  |--index.tsx ( entry file )
  |--index.css ( for some common rewrite rules )
|-.editorconfig ( for single coding rule )
|-.prettierrc ( for single coding rule / must have )
```



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

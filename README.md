# Bootstrap
This project was created and maintained by [Mirik999](https://github.com/mirik999)  
Package manager (preferable to use ```yarn```)

```yarn``` installation packages  
```yarn start``` start

## Styling
Some common components and layers styled with
[styled-components](https://styled-components.com/) and for rest used
[rsuite ui components](https://rsuitejs.com/)

## Folder structure
```angular2html
|-src  
|--assets (static files, images ...)  
|--components  
|----common ( reusable components )  
|----hoc ( layers and wrappers )  
|--config  
|--hooks  
|--pages  
|----each folder one exact route with own components 
|----except Rest, this folder contains rest routes  
|--redux  
|----requests (graphql schemas)  
|----slices ( redux actions and reducers )  
|----types
|----store.ts ( redux global store )  
|--utils ( contains all third party helpers )
|--App.tsx ( entry component )
|--SubCategory.tsx ( entry file )
|--index.css ( for some common rewrite rules )
|-.editorconfig ( for single coding rule )
|-.prettierrc ( for single coding rule / must have )
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

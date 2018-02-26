# redux-enhancer
redux-enhancer包含store的增强器。

## addAndDeleteReducer
`addAndDeleteReducer`表示的添加或删除指定的reducer。\
场景：对于复杂的后台开发来说。单独一个后台管理就是一个SPA页面，一个SPA页面只有一个store。但是后台管理里面各个模块互相不干涉，比如：用户管理模块，文章管理模块。如果按照最初来说，将会定义如下：
```
const reducers = {
  user: userReducer,
  post: postReducer
};
const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer, initState);
```
这样做的缺点在于，当后台管理处在用户模块的时候，初次加载，他同时也会执行文章模块的初始化。这种不相干的操作，应该尽量避免。

因此，利用`addAndDeleteReducer`可解决这样的问题。如：如果在用户页面：
```
class UserPage extends Component {
  componentWillMount() {
    this.context.store.addReducer('user', userReducer);
  }
  componentWillUnmount() {
    this.context.store.deleteReducer('user');
  }
}
```
这样，当处于User页面的时候，store就会为当前模块增加User的reducer和state。

使用方式：
```
// 增强方式
const reducers = {
    common: commonReducer
};
const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer, initState, addAndDeleteReducer(reducers));

// 调用方式
class UserPage extends Component {
  componentWillMount() {
    this.context.store.addReducer('user', userReducer);
  }
  componentWillUnmount() {
    this.context.store.deleteReducer('user');
  }
}
class PostPage extends Component {
  componentWillMount() {
    this.context.store.addReducer('post', postReducer);
  }
  componentWillUnmount() {
    this.context.store.deleteReducer('post');
  }
}
```

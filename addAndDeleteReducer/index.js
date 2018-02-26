le 增加、删除reducer
 * @author xurudan01
 */

import {combineReducers} from 'redux-immutable';

const ActionTypes = {
  INIT: '@@redux/INIT_REDUCER',
  DEL: '@@redux/DEL_REDUCER',
}
export default baseReduers => createStore => (reducers, action, enhancer) => {
    if (
        !baseReduers
        || JSON.stringify(baseReduers) === '{}'
        || typeof baseReduers !== 'object'
    ) {
        return throw new Error('baseReduers必须是{key: reducer}结构');
    }
    const store = createStore(reducers, action, enhancer);

    let newReducers = baseReduers;

    const addReducer = (key, addReducer) => {
        if (newReducers[key]) {
            return;
        }
        const tmpReducers = Object(newReducers);
        tmpReducers[key] = addReducer;

        store.replaceReducer(combineReducers(tmpReducers));

        store.dispatch({type: ActionTypes.INIT});
    };

    const deleteReducer = key => {
        if (newReducers[key]) {
            delete newReducers[key];

            store.replaceReducer(combineReducers(newReducers));

            store.dispatch({type: ActionTypes.DEL});
        }
    };

    return {
        ...store,
        addReducer,
        deleteReducer
    };
}

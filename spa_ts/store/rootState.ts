//root state is the default global state object for vuex store
//it can contains any data or just an empty class
//when using moduless, module's state will union the root state
//
export interface RootState {
    //dummy state field
    version: string;
}
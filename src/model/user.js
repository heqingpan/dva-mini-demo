export default {
    namespace: 'user',
    state: {
        name:"",
        status:"INIT",
    },
    reducers: {
      login(state) { 
          return {...state,status:"LOGIN"}
      },
      logout(state) { 
          return {...state,status:"LOGOUT"}
      },
    },
    effects: {
    }
}
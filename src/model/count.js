export default {
    namespace: 'count',
    state: 0,
    reducers: {
      add  (count,{payload}) { 
          console.log("reducers add",count)
          if(payload){
              return count+payload
          }
          return count + 1 
      },
      minus(count) { 
          console.log("reducers minus",count)
          return count - 1 
      },
    },
    effects: {
        *add_effect({payload,type},{put,select}) {
            console.log("add_effect",payload);
            var state = yield select();
            console.log("add_effect select state",state)
            //yield put({"type":"count/add",payload});
            yield put({"type":"add",payload});
            yield put({"type":"monitor/logEvent",payload:{type:"add",time:new Date().toLocaleString(),msg:""+state.count+"+"+payload}});
        },

        *minus_effect({payload,type},{put,select}) {
            var state = yield select();
            if(payload===undefined){
                payload=1;
            }
            yield put({"type":"minus",payload});
            yield put({"type":"monitor/logEvent",payload:{type:"minus",time:new Date().toLocaleString(),msg:""+state.count+"-"+payload}});
        }
    }
}
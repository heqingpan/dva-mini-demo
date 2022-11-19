export default {
    namespace: 'monitor',
    state: {
        lastEvents:[],
        lastId:0,
    },
    reducers: {
        logEvent(state,{payload:{type,time,msg}}) { 
            if(type===undefined || time===undefined || msg===undefined){
                return state;
            }
            let {lastEvents,lastId}=state;
            lastId+=1;
            //var newEvents = [...lastEvents,{id:lastId,type,time,msg}];
            var newEvents = [{id:lastId,type,time,msg},...lastEvents];
            //lastEvents.push({id:lastId,type,time,msg})
            if(newEvents.length>10){
                //newEvents.shift()
                newEvents.pop()
            }
            return {lastEvents:newEvents,lastId}
        },
    },
    effects: {
    }
}